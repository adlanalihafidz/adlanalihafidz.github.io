/* ==================================== */
/* =========== KONFIGURASI ============ */
/* ==================================== */
const ASIDE_WIDTH = 270; // Lebar aside (sesuai CSS Anda)
const SCROLL_OFFSET = 80; // Offset piksel saat scroll agar menu aktif sebelum bagian mencapai tepi atas (header height)

/* ==================================== */
/* ======== TYPING ANIMATION ======== */
/* ==================================== */
const typed = new Typed(".typing", {
    strings: ["Graphic Designer", "Illustrator", "Web Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
});

/* ==================================== */
/* ======= NAVIGASI & SCROLL SYNC ======= */
/* ==================================== */
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");


/**
 * Fungsi untuk memperbarui status 'active' di navigasi berdasarkan ID Section.
 * Dipanggil oleh event scroll.
 * @param {string} activeId - ID dari section yang sedang aktif (misalnya 'home', 'about').
 */
function updateNavByScroll(activeId) {
    navList.forEach(li => {
        const a = li.querySelector("a");
        const navTarget = a.getAttribute("href").split("#")[1];
        
        a.classList.remove("active");
        
        if (navTarget === activeId) {
            a.classList.add("active");
        }
    });
}

/**
 * Event Listener Scroll: Mendeteksi section yang sedang aktif.
 */
window.addEventListener("scroll", () => {
    let currentSectionId = ''; 
    const scrollPosition = window.pageYOffset;

    allSection.forEach(section => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET; 
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        // Cek apakah posisi scroll berada di dalam rentang section ini
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });

    // Perbarui menu navigasi
    if (currentSectionId) {
        updateNavByScroll(currentSectionId);
    }
});


/**
 * Event Listener untuk Klik Navigasi (Aside Menu).
 * Menggunakan scrollIntoView untuk transisi yang mulus.
 */
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function (e) {
        e.preventDefault(); 
        
        // Hapus kelas 'active' dari semua link nav dan tambahkan ke link yang diklik
        navList.forEach(li => li.querySelector("a").classList.remove("active"));
        this.classList.add("active");
        
        const targetSelector = this.getAttribute("href");
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            // Gulir secara mulus ke elemen target
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Tutup aside jika di layar kecil
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}


/* ==================================== */
/* ======== ASIDE TOGGLE (MOBILE) ======= */
/* ==================================== */

/**
 * Fungsi untuk toggle aside (sidebar) dan nav-toggler.
 * Tidak lagi mengubah kelas .open pada .section untuk menghindari pergeseran konten.
 */
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    // HANYA aside dan toggler yang di-toggle, bukan allSection
}

// Event listener untuk tombol Toggle Nav (Burger Menu)
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});


/* ==================================== */
/* ========= TOMBOL "HIRE ME" ========= */
/* ==================================== */

// Menangani tombol "Hire Me" yang biasanya ada di Home/About
document.querySelector(".hire-me").addEventListener("click", function(event) {
    event.preventDefault();
    
    // Cari elemen navigasi yang mengarah ke Contact Section
    const targetElement = document.querySelector('a[href="#contact"]');
    
    if (targetElement) {
        // Simulasikan klik navigasi untuk memicu scroll
        targetElement.click(); 
    }
});

// Event listener untuk tombol "Contact Me" di Home (jika ada)
// Asumsi elemen memiliki ID #contact-me-btn dan mengarah ke #contact
const contactMeBtn = document.querySelector("#contact-me-btn");
if (contactMeBtn) {
    contactMeBtn.addEventListener("click", function(event) {
        event.preventDefault();
        
        const targetElement = document.querySelector('a[href="#contact"]');
        if (targetElement) {
            // Simulasikan klik navigasi untuk memicu scroll
            targetElement.click(); 
        }
    });
}

/* ==================================== */
/* =========== LIGHTBOX GALLERY ======= */
/* ==================================== */

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-container img');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// Dapatkan semua elemen portfolio item
const portfolioItems = document.querySelectorAll('.portfolio-item-inner');
const allImages = []; // Array untuk menyimpan path semua gambar

let currentIndex = 0; // Indeks gambar yang sedang ditampilkan
// 1. Inisialisasi: Ambil semua path gambar dari HTML
portfolioItems.forEach(item => {
    const imgSrc = item.querySelector('img').getAttribute('src');
    allImages.push(imgSrc);
    // 2. Event Listener untuk Membuka Lightbox
    item.addEventListener('click', () => {
        const clickedSrc = imgSrc;
        
        // Cari indeks gambar yang diklik
        currentIndex = allImages.findIndex(src => src === clickedSrc);
        
        showLightbox(clickedSrc);
    });
});
// Fungsi untuk menampilkan lightbox
function showLightbox(src) {
    lightboxImg.setAttribute('src', src);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Mencegah scroll pada body
}
// Fungsi untuk menutup lightbox
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto'; // Mengembalikan scroll body
}
// 3. Kontrol Slide
function changeImage(direction) {
    currentIndex += direction;
    
    // Logika Looping: Kembali ke awal atau akhir saat mencapai batas
    if (currentIndex >= allImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = allImages.length - 1;
    }
    
    lightboxImg.setAttribute('src', allImages[currentIndex]);
}
// Event Listener untuk Tombol Tutup
lightboxClose.addEventListener('click', closeLightbox);
// Event Listener untuk Tombol Sebelumnya
lightboxPrev.addEventListener('click', () => changeImage(-1));
// Event Listener untuk Tombol Selanjutnya
lightboxNext.addEventListener('click', () => changeImage(1));
// Event Listener untuk Menutup dengan Klik Background atau Tombol ESC
lightbox.addEventListener('click', (e) => {
    // Tutup jika mengklik lightbox itu sendiri (bukan gambar atau kontrol)
    if (e.target.classList.contains('lightbox')) {
        closeLightbox();
    }
});
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        }
    }
});