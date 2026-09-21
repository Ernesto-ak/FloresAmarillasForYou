/* ==========================================
   FLORES AMARILLAS - LÓGICA DE INTERACCIÓN
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. PETALS CANVAS ANIMATION
    // ==========================================
    const canvas = document.getElementById('petalsCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const numPetals = 45;

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.rotation = Math.random() * 360;
            this.rotSpeed = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.color = Math.random() > 0.4 ? '#ffb703' : '#ffd166';
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y / 30) + this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            // Draw petal shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, this.size / 2, 0, this.size);
            ctx.bezierCurveTo(this.size / 2, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }

    function animatePetals() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animatePetals);
    }
    animatePetals();

    // Trigger extra particle shower function
    function triggerPetalShower() {
        for (let i = 0; i < 50; i++) {
            const extra = new Petal();
            extra.y = Math.random() * -100;
            petals.push(extra);
        }
    }
    document.getElementById('btn-shower')?.addEventListener('click', () => {
        triggerPetalShower();
    });

    // ==========================================
    // 1. NAVEGACIÓN POR PESTAÑAS (TABS)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(btn.dataset.tab);
            if (targetTab) targetTab.classList.add('active');
        });
    });

    // ==========================================
    // EXPERIENCIA 1: RAMO VIRTUAL
    // ==========================================
    const bouquetDisplay = document.getElementById('bouquet-display');
    const addFlowerBtns = document.querySelectorAll('.add-flower-btn');
    const btnResetBouquet = document.getElementById('btn-reset-bouquet');
    let bouquetCount = 0;

    const flowerSVGs = {
        girasol: `
            <svg width="70" height="140" viewBox="0 0 70 140">
                <path d="M35,60 Q35,100 35,140" stroke="#52b788" stroke-width="6" fill="none"/>
                <path d="M35,90 Q15,80 10,95 Q25,105 35,95" fill="#52b788"/>
                <circle cx="35" cy="40" r="14" fill="#3d2600"/>
                <!-- Petals -->
                <g fill="#ffb703">
                    <ellipse cx="35" cy="14" rx="5" ry="12"/>
                    <ellipse cx="35" cy="66" rx="5" ry="12"/>
                    <ellipse cx="9" cy="40" rx="12" ry="5"/>
                    <ellipse cx="61" cy="40" rx="12" ry="5"/>
                    <ellipse cx="17" cy="22" rx="6" ry="12" transform="rotate(-45 17 22)"/>
                    <ellipse cx="53" cy="58" rx="6" ry="12" transform="rotate(-45 53 58)"/>
                    <ellipse cx="53" cy="22" rx="6" ry="12" transform="rotate(45 53 22)"/>
                    <ellipse cx="17" cy="58" rx="6" ry="12" transform="rotate(45 17 58)"/>
                </g>
            </svg>`,
        tulipan: `
            <svg width="60" height="130" viewBox="0 0 60 130">
                <path d="M30,50 Q30,90 30,130" stroke="#52b788" stroke-width="5" fill="none"/>
                <path d="M30,80 Q45,70 50,85 Q35,95 30,85" fill="#52b788"/>
                <path d="M15,45 Q10,15 30,20 Q50,15 45,45 Q30,60 15,45 Z" fill="#ffd166"/>
                <path d="M22,45 Q30,25 38,45 Q30,55 22,45 Z" fill="#ffb703"/>
            </svg>`,
        margarita: `
            <svg width="60" height="120" viewBox="0 0 60 120">
                <path d="M30,50 Q30,85 30,120" stroke="#52b788" stroke-width="4" fill="none"/>
                <circle cx="30" cy="35" r="9" fill="#fb8500"/>
                <g fill="#fffdf0" stroke="#ffb703" stroke-width="1">
                    <circle cx="30" cy="18" r="7"/>
                    <circle cx="30" cy="52" r="7"/>
                    <circle cx="13" cy="35" r="7"/>
                    <circle cx="47" cy="35" r="7"/>
                    <circle cx="18" cy="23" r="7"/>
                    <circle cx="42" cy="47" r="7"/>
                    <circle cx="42" cy="23" r="7"/>
                    <circle cx="18" cy="47" r="7"/>
                </g>
            </svg>`,
        rosa: `
            <svg width="65" height="135" viewBox="0 0 65 135">
                <path d="M32,55 Q32,95 32,135" stroke="#52b788" stroke-width="5" fill="none"/>
                <circle cx="32" cy="35" r="18" fill="#ffb703"/>
                <path d="M20,30 Q32,18 44,30 Q32,50 20,30 Z" fill="#fb8500"/>
                <path d="M25,25 Q32,35 39,25" stroke="#fff3b0" stroke-width="3" fill="none"/>
            </svg>`
    };

    function addFlower(type) {
        if (bouquetCount >= 12) return;
        bouquetCount++;

        const wrapper = document.createElement('div');
        wrapper.className = 'flower-item-svg';
        wrapper.innerHTML = flowerSVGs[type] || flowerSVGs['girasol'];

        // Random offset and tilt for a realistic bouquet look
        const offsetX = (Math.random() - 0.5) * 160;
        const tilt = (Math.random() - 0.5) * 35;
        const scale = 0.85 + Math.random() * 0.3;

        wrapper.style.left = `calc(50% - 30px + ${offsetX}px)`;
        wrapper.style.transform = `rotate(${tilt}deg) scale(${scale})`;
        wrapper.style.zIndex = Math.floor(Math.random() * 10);

        bouquetDisplay.appendChild(wrapper);
    }

    // Add initial flowers
    addFlower('girasol');
    addFlower('tulipan');
    addFlower('margarita');

    addFlowerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addFlower(btn.dataset.type);
        });
    });

    btnResetBouquet?.addEventListener('click', () => {
        bouquetDisplay.innerHTML = '';
        bouquetCount = 0;
    });

    // ==========================================
    // CARTA Y MODAL
    // ==========================================
    const cardModal = document.getElementById('card-modal');
    const btnOpenCard = document.getElementById('btn-open-card');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const typedTextEl = document.getElementById('typed-text');
    const customCardInput = document.getElementById('custom-card-input');
    const btnSaveMessage = document.getElementById('btn-save-message');

    let currentMessage = customCardInput.value;

    function typeWriter(text) {
        typedTextEl.textContent = '';
        let index = 0;
        const speed = 25;

        function type() {
            if (index < text.length) {
                typedTextEl.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    btnOpenCard?.addEventListener('click', () => {
        cardModal.classList.remove('hidden');
        typeWriter(currentMessage);
    });

    modalCloseBtn?.addEventListener('click', () => {
        cardModal.classList.add('hidden');
    });

    btnSaveMessage?.addEventListener('click', () => {
        currentMessage = customCardInput.value;
        typeWriter(currentMessage);
    });

    // ==========================================
    // EXPERIENCIA 2: JARDÍN DE RAZONES
    // ==========================================
    const gardenGrid = document.getElementById('garden-grid');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const gardenFinalMsg = document.getElementById('garden-final-msg');

    const reasons = [
        "Por la luz que le das a mis días con tu energía única.",
        "Por tus abrazos sinceros que hacen que todo esté bien.",
        "Por compartir tus risas y momentos inolvidables.",
        "Por tu bondad y la paciencia hermosa que siempre tienes.",
        "Por motivarme a ser una mejor versión cada día.",
        "¡Simplemente por existir y ser exactamente quien eres!"
    ];

    let bloomedCount = 0;

    reasons.forEach((reason, idx) => {
        const card = document.createElement('div');
        card.className = 'garden-card';
        card.innerHTML = `
            <div class="flower-bud">🌱</div>
            <p class="reason-text">${reason}</p>
        `;

        card.addEventListener('click', () => {
            if (!card.classList.contains('bloomed')) {
                card.classList.add('bloomed');
                card.querySelector('.flower-bud').textContent = '🌻';
                bloomedCount++;

                const pct = (bloomedCount / reasons.length) * 100;
                progressBarFill.style.width = `${pct}%`;
                progressText.textContent = `Flores descubiertas: ${bloomedCount} de ${reasons.length}`;

                if (bloomedCount === reasons.length) {
                    gardenFinalMsg.classList.remove('hidden');
                    triggerPetalShower();
                }
            }
        });

        gardenGrid.appendChild(card);
    });

    // ==========================================
    // EXPERIENCIA 3: MÚSICA & FOTOS POLAROID (YouTube Player Integration)
    // ==========================================
    const btnPlayMusic = document.getElementById('btn-play-music');
    const vinylDisc = document.getElementById('vinyl-disc');
    const ytFrame = document.getElementById('yt-player-frame');
    const localAudio = document.getElementById('local-audio');
    let isPlaying = false;

    function startMusic() {
        if (!isPlaying) {
            isPlaying = true;
            vinylDisc?.classList.add('playing');
            if (btnPlayMusic) btnPlayMusic.textContent = '⏸️ Pausar "Flores Amarillas"';
            if (ytFrame && ytFrame.contentWindow) {
                ytFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
            if (localAudio) {
                localAudio.play().catch(() => {});
            }
        }
    }

    function pauseMusic() {
        if (isPlaying) {
            isPlaying = false;
            vinylDisc?.classList.remove('playing');
            if (btnPlayMusic) btnPlayMusic.textContent = '▶️ Reproducir "Flores Amarillas"';
            if (ytFrame && ytFrame.contentWindow) {
                ytFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
            if (localAudio) {
                localAudio.pause();
            }
        }
    }

    btnPlayMusic?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseMusic();
        } else {
            startMusic();
        }
    });

    // Welcome Modal Popup Handler
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeStartBtn = document.getElementById('welcome-start-btn');

    welcomeStartBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        welcomeModal?.classList.add('fade-out');
        startMusic();
        triggerPetalShower();
    });

    // Fallback auto-play music on first click anywhere
    const autoPlayOnFirstClick = () => {
        startMusic();
        document.removeEventListener('click', autoPlayOnFirstClick);
    };
    document.addEventListener('click', autoPlayOnFirstClick);

    // Polaroid card flip
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    polaroidCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ==========================================
    // EXPERIENCIA 4: CONTADOR DE TIEMPO
    // ==========================================
    const startDateInput = document.getElementById('start-date-input');
    const timerDays = document.getElementById('timer-days');
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

    function updateTimer() {
        const startDate = new Date(startDateInput.value + 'T00:00:00');
        const now = new Date();
        const diff = now - startDate;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            timerDays.textContent = days;
            timerHours.textContent = hours;
            timerMinutes.textContent = minutes;
            timerSeconds.textContent = seconds;
        } else {
            timerDays.textContent = 0;
            timerHours.textContent = 0;
            timerMinutes.textContent = 0;
            timerSeconds.textContent = 0;
        }
    }

    startDateInput?.addEventListener('change', updateTimer);
    setInterval(updateTimer, 1000);
    updateTimer();


});
