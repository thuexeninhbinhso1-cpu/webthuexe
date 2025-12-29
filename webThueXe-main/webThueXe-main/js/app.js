// 1. DỮ LIỆU XE
const vehiclesData = {
    ga: [
        { src: 'anh/Vision.png', name: 'Honda Vision (Đời Mới)', price: '130.000đ' },
        { src: 'anh/air_blade.jpg', name: 'Honda Air Blade', price: '130.000đ' },
        { src: 'anh/Lead.jpg', name: 'Honda Lead (Cốp Rộng)', price: '130.000đ' },
        { src: 'anh/Lead2.jpg', name: 'Honda Lead (Màu Mới)', price: '130.000đ' }
    ],
    so: [
        { src: 'anh/Wave_alpha.jpg', name: 'Honda Wave Alpha', price: '100.000đ' },
        { src: 'anh/Wave_RSX.jpg', name: 'Honda Wave RSX', price: '100.000đ' }
    ]
};

// Hàm preload ảnh để cache trước
function preloadImages(categories) {
    Object.values(categories).forEach(list => {
        list.forEach(item => {
            const img = new Image();
            img.src = item.src;
        });
    });
}

// Hàm sinh thời gian ngẫu nhiên từ 7s - 10s
function getRandomTime() {
    return Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000;
}

// 2. HÀM KHỞI TẠO CAROUSEL
function setupCarousel(suffix, dataList) {
    let currentIndex = 0;
    let timerId;

    // Lấy các phần tử HTML
    const els = {
        img: document.getElementById(`img-${suffix}`),
        name: document.getElementById(`name-${suffix}`),
        price: document.getElementById(`price-${suffix}`),
        progress: document.getElementById(`progress-${suffix}`),
        nextBtn: document.getElementById(`next-btn-${suffix}`),
        prevBtn: document.getElementById(`prev-btn-${suffix}`),
    };

    const loadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            if (img.complete) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Luôn resolve để không chặn flow nếu lỗi
            }
        });
    };

    async function updateView() {
        const item = dataList[currentIndex];

        // === BƯỚC 1: BẮT ĐẦU HIỆU ỨNG ẨN ẢNH CŨ ===
        // Reset thanh thời gian
        if (els.progress) {
            els.progress.style.transition = 'none';
            els.progress.style.width = '0%';
        }

        // Thêm class 'changing' để kích hoạt CSS (FadeOut + Blur)
        if (els.img) els.img.classList.add('changing');

        // === BƯỚC 2: ĐỢI ẢNH MỚI TẢI XONG & HIỆU ỨNG KẾT THÚC ===
        // Chúng ta đợi ít nhất 600ms cho transition CSS, 
        // ĐỒNG THỜI đợi ảnh mới tải xong.
        const transitionTime = 600;
        const waitTransition = new Promise(r => setTimeout(r, transitionTime));

        // Song song: vừa chạy timer transition, vừa tải ảnh
        await Promise.all([waitTransition, loadImage(item.src)]);

        // === BƯỚC 3: CẬP NHẬT DỮ LIỆU & HIỆN ẢNH MỚI ===
        if (els.img) els.img.src = item.src;
        if (els.name) els.name.textContent = item.name;
        if (els.price) els.price.textContent = item.price;

        // Xóa class 'changing' -> Ảnh mới hiện dần ra (FadeIn + Focus)
        // Cần requestAnimationFrame để đảm bảo browser đã render src mới trước khi remove class
        requestAnimationFrame(() => {
            if (els.img) els.img.classList.remove('changing');
        });

        // Chạy thanh thời gian (Progress Bar)
        const currentDuration = getRandomTime();
        if (els.progress) {
            setTimeout(() => {
                els.progress.style.transition = `width ${currentDuration}ms linear`;
                els.progress.style.width = '100%';
            }, 50);
        }

        // === BƯỚC 4: HẸN GIỜ LẦN TIẾP THEO ===
        clearTimeout(timerId);
        timerId = setTimeout(next, currentDuration + 600); // 600 là thời gian transition out lần sau
    }

    function next() {
        currentIndex = (currentIndex + 1) % dataList.length;
        updateView();
    }

    function prev() {
        currentIndex = (currentIndex - 1 + dataList.length) % dataList.length;
        updateView();
    }

    // Xử lý nút bấm
    if (els.nextBtn) {
        els.nextBtn.addEventListener('click', () => {
            clearTimeout(timerId);
            next();
        });
    }
    if (els.prevBtn) {
        els.prevBtn.addEventListener('click', () => {
            clearTimeout(timerId);
            prev();
        });
    }

    // Bắt đầu chạy
    updateView();
}

// 3. KHỞI CHẠY
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Kích hoạt Preload ngay khi vào trang
    preloadImages(vehiclesData);

    setupCarousel('ga', vehiclesData.ga);
    setupCarousel('so', vehiclesData.so);

    // Animation cuộn trang
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.reveal, .stagger-container').forEach(el => observer.observe(el));
});
