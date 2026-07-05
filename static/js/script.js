document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================================================
       1. SCROLL REVEAL ANIMATION (AOS / FADE-UP INTEGRATION)
       ========================================================================== */
    // Mendukung kelas .hidden bawaan atau elemen pengurus/sejarah baru
    const elements = document.querySelectorAll(".hidden, [data-aos='fade-up'], [data-aos='zoom-in']");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Memicu animasi masuk premium
                entry.target.classList.add("show");
                if(entry.target.dataset.aos) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) scale(1)";
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10 });

    elements.forEach(el => {
        // Berikan style dasar jika elemen menggunakan data-aos dari HTML baru
        if(el.dataset.aos === "fade-up") {
            el.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        observer.observe(el);
    });


    /* ==============================================================================
       2. ACTIVE NAVIGATION LINK & SMOOTH SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let currentSection = "";
        const scrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            // Menangani kecocokan ID jangkar menu navbar
            const href = link.getAttribute("href");
            if (href === "#" + currentSection || href === "/" + "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    // Smooth Scroll untuk navigasi lokal berlambang petualang
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 90,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* ==============================================================================
       3. NAVBAR SCROLL EFFECT & COMPASS BUTTON
       ========================================================================== */
    const navbar = document.querySelector(".navbar");
    
    // Membuat Tombol Kompas "Kembali Ke Atas" Dinamis secara otomatis
    const createBackToTopBtn = () => {
        const btn = document.createElement("button");
        btn.id = "backToTop";
        btn.innerHTML = '<i class="bi bi-compass"></i>';
        btn.setAttribute("title", "Kembali ke Puncak");
        // Gaya Premium Tombol Kompas Pecinta Alam
        Object.assign(btn.style, {
            position: "fixed",
            bottom: "30px",
            right: "-60px",
            zIndex: "99",
            border: "none",
            outline: "none",
            backgroundColor: "#198754",
            color: "white",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            fontSize: "24px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        });
        document.body.appendChild(btn);

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        
        // Efek putar jarum kompas saat kursor di atasnya (Estetik)
        btn.addEventListener("mouseenter", () => {
            btn.querySelector("i").style.transform = "rotate(360deg)";
            btn.querySelector("i").style.transition = "transform 0.6s ease";
        });
        btn.addEventListener("mouseleave", () => {
            btn.querySelector("i").style.transform = "rotate(0deg)";
        });
    };
    
    createBackToTopBtn();
    const backToTopBtn = document.getElementById("backToTop");

    function handleScrollEffects() {
        const scrollPos = window.scrollY;

        // Efek Transparansi Navbar Premium
        if (navbar) {
            if (scrollPos > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Efek Muncul/Sembunyi Tombol Kompas
        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.style.right = "30px";
            } else {
                backToTopBtn.style.right = "-60px";
            }
        }
    }


    /* ==============================================================================
       4. GLOBAL SCROLL & PROGRESS BAR UTILITY
       ========================================================================== */
    window.addEventListener("scroll", () => {
        setActiveLink();
        handleScrollEffects();

        /* Penghitung Progress Bar Atas */
        const bar = document.getElementById("progress-bar");
        if (bar) {
            const scrollTop = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / height) * 100;
            bar.style.width = scrolled + "%";
        }
    });


    /* INITIATE ON LOAD */
    setActiveLink();
    handleScrollEffects();

});


/* ==============================================================================
   5. LOADER EXPERT FIX (Pasti Halus Hilang)
   ========================================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.transition = "opacity 0.5s ease-out";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);

        }, 600); // Durasi tunggu dioptimalkan agar tidak terlalu lama kosong
    }
/* ==============================================================================
       6. PREMIUM LEAF CLICK EFFECT (Efek Daun Jatuh Dioptimalkan untuk HP)
       ========================================================================== */
    const leafTemplates = ['🍁', '🍃', '🍂', '🌱'];

    document.addEventListener("click", (e) => {
        // Abaikan efek klik jika menekan tombol, menu navbar, atau link
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.navbar')) {
            return;
        }

        // Kurangi jumlah partikel di HP (max 2) agar performa tidak drop
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 2 : 3;

        for (let i = 0; i < particleCount; i++) {
            const leaf = document.createElement("span");
            leaf.innerText = leafTemplates[Math.floor(Math.random() * leafTemplates.length)];
            
            const randomX = (Math.random() - 0.5) * 40; 
            const randomScale = isMobile ? (0.5 + Math.random() * 0.4) : (0.6 + Math.random() * 0.8); 
            const randomDuration = 1 + Math.random() * 1.2; 

            // PENGAMAN HP: Mencegah daun muncul terlalu mepet ke ujung kanan layar
            const maxSafeLeft = window.innerWidth - 40;
            const safePageX = Math.min(e.pageX, maxSafeLeft);

            Object.assign(leaf.style, {
                position: "absolute",
                top: `${e.pageY}px`,
                left: `${safePageX}px`,
                pointerEvents: "none", 
                fontSize: isMobile ? "16px" : "20px",
                zIndex: "9999",
                transform: `scale(${randomScale})`,
                transition: `transform ${randomDuration}s cubic-bezier(0.1, 0.25, 0.1, 1), 
                             opacity ${randomDuration}s ease-out, 
                             top ${randomDuration}s cubic-bezier(0.1, 0.25, 0.1, 1), 
                             left ${randomDuration}s ease-out`,
                opacity: "1"
            });

            document.body.appendChild(leaf);

            requestAnimationFrame(() => {
                leaf.style.top = `${e.pageY + 100 + Math.random() * 30}px`;
                // PENGAMAN HP: Batasi geseran horizontal daun agar tidak menjebol pembatas layar
                const finalLeft = safePageX + randomX;
                leaf.style.left = `${Math.max(10, Math.min(finalLeft, window.innerWidth - 30))}px`;
                leaf.style.transform = `scale(${randomScale}) rotate(${Math.random() * 180}deg)`;
                leaf.style.opacity = "0";
            });

            setTimeout(() => {
                leaf.remove();
            }, randomDuration * 1000);
        }
    });
    /* ==============================================================================
       7. PREMIUM WILDLIFE ANIMATION (Kawanan Burung Realistis Murni CSS-SVG)
       ========================================================================== */
    function spawnBirdFlock() {
        // Menentukan arah terbang kawanan (true = kiri ke kanan, false = kanan ke kiri)
        const flyFromLeft = Math.random() > 0.5;
        const basePercentY = 15 + Math.random() * 35; // Ketinggian dasar kawanan (15% - 50% tinggi layar)
        const flockSize = 3 + Math.floor(Math.random() * 3); // Jumlah burung dalam 1 kelompok (3 - 5 ekor)
        const baseDuration = 14 + Math.random() * 6; // Kecepatan dasar terbang melintasi layar

        // Mengeluarkan burung satu per satu dalam jeda waktu singkat untuk membentuk formasi
        for (let i = 0; i < flockSize; i++) {
            setTimeout(() => {
                const bird = document.createElement("div");
                
                // Memberikan variasi posisi di dalam formasi kelompok agar terlihat natural
                const offsetTop = (i * 25) + (Math.random() - 0.5) * 20; // Jarak vertikal antar burung
                const offsetLeft = i * -35; // Burung berjejer ke belakang membentuk pola serang/V
                
                const scale = 0.35 + (Math.random() * 0.25) - (i * 0.03); // Burung di belakang terlihat lebih kecil (efek 3D)
                const individualDuration = baseDuration + (Math.random() - 0.5) * 2; // Kecepatan sedikit bervariasi

                Object.assign(bird.style, {
                    position: "fixed",
                    top: `calc(${basePercentY}vh + ${offsetTop}px)`,
                    left: flyFromLeft ? `${offsetLeft - 80}px` : `calc(100vw - ${offsetLeft}px + 80px)`,
                    zIndex: "1", // Terbang anggun di belakang teks konten
                    pointerEvents: "none",
                    transform: `scale(${scale}) ${flyFromLeft ? '' : 'scaleX(-1)'}`,
                    transition: `left ${individualDuration}s linear, top ${individualDuration}s ease-in-out`,
                    opacity: "0.55"
                });

                // Menggunakan bentuk kepakan siluet sayap burung asli via SVG Path
                bird.innerHTML = `
                    <div class="real-bird">
                        <svg viewBox="0 0 40 40" width="50" height="50">
                            <path class="bird-wing" d="M 0,20 Q 10,0 20,15 Q 30,0 40,20 Q 30,12 20,17 Q 10,12 0,20 Z" fill="#2d3748"/>
                        </svg>
                    </div>
                `;

                document.body.appendChild(bird);

                // CSS Keyframes untuk kepakan sayap meliuk realistis (Hanya diinjeksi 1x ke dokumen)
                if (!document.getElementById("real-bird-styles")) {
                    const styleSheet = document.createElement("style");
                    styleSheet.id = "real-bird-styles";
                    styleSheet.innerText = `
                        .bird-wing {
                            transform-origin: 20px 16px;
                            animation: realFlap 0.5s ease-in-out infinite alternate;
                        }
                        @keyframes realFlap {
                            0% {
                                transform: scaleY(0.3) translateY(4px);
                            }
                            100% {
                                transform: scaleY(1.1) translateY(-2px);
                            }
                        }
                    `;
                    document.head.appendChild(styleSheet);
                }

                // Perintahkan kawanan burung lepas landas menyeberangi layar komputer
                setTimeout(() => {
                    bird.style.left = flyFromLeft ? `calc(100vw + 150px)` : `-150px`;
                    // Burung sedikit mengubah ketinggian secara dinamis saat terbang agar bergelombang alami
                    bird.style.top = `calc(${basePercentY + 5}% + ${offsetTop + (Math.random() - 0.5) * 40}px)`;
                }, 100);

                // Hancurkan elemen burung dari memori RAM setelah melewati batas ujung layar
                setTimeout(() => {
                    bird.remove();
                }, individualDuration * 1000);

            }, i * 450); // Jeda waktu kemunculan milidetik antar burung di dalam satu kawanan
        }
    }

    // Kemunculan perdana kawanan burung 3 detik setelah website terbuka
    setTimeout(spawnBirdFlock, 3000);

    // Kirim kawanan burung baru secara berkala setiap 18 hingga 25 detik
    setInterval(spawnBirdFlock, 22000);
});