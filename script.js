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
            <svg width="80" height="200" viewBox="0 0 80 200">
                <path d="M40,40 Q38,120 40,195" stroke="#3a7d44" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M40,110 Q28,95 22,112 Q32,125 40,118" fill="#2d6a4f"/>
                <path d="M40,140 Q52,125 58,142 Q48,155 40,148" fill="#2d6a4f"/>
                <path d="M40,40 L10,20 Q5,40 25,50 Z" fill="#2d6a4f"/>
                <path d="M40,40 L70,20 Q75,40 55,50 Z" fill="#2d6a4f"/>
                <g fill="#ffd166">
                    <ellipse cx="40" cy="14" rx="6" ry="14"/>
                    <ellipse cx="40" cy="66" rx="6" ry="14"/>
                    <ellipse cx="14" cy="40" rx="14" ry="6"/>
                    <ellipse cx="66" cy="40" rx="14" ry="6"/>
                    <ellipse cx="21" cy="21" rx="7" ry="14" transform="rotate(-45 21 21)"/>
                    <ellipse cx="59" cy="59" rx="7" ry="14" transform="rotate(-45 59 59)"/>
                    <ellipse cx="59" cy="21" rx="7" ry="14" transform="rotate(45 59 21)"/>
                    <ellipse cx="21" cy="59" rx="7" ry="14" transform="rotate(45 21 59)"/>
                </g>
                <g fill="#ffb703">
                    <ellipse cx="40" cy="17" rx="5" ry="11"/>
                    <ellipse cx="40" cy="63" rx="5" ry="11"/>
                    <ellipse cx="17" cy="40" rx="11" ry="5"/>
                    <ellipse cx="63" cy="40" rx="11" ry="5"/>
                    <ellipse cx="23" cy="23" rx="5" ry="11" transform="rotate(-45 23 23)"/>
                    <ellipse cx="57" cy="57" rx="5" ry="11" transform="rotate(-45 57 57)"/>
                    <ellipse cx="57" cy="23" rx="5" ry="11" transform="rotate(45 57 23)"/>
                    <ellipse cx="23" cy="57" rx="5" ry="11" transform="rotate(45 23 57)"/>
                </g>
                <circle cx="40" cy="40" r="15" fill="#3d2600"/>
                <circle cx="40" cy="40" r="12" fill="#543306" stroke="#fb8500" stroke-width="1.2" stroke-dasharray="2,2"/>
            </svg>`,
        tulipan: `
            <svg width="80" height="200" viewBox="0 0 80 200">
                <path d="M40,45 Q38,120 40,195" stroke="#3a7d44" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M40,115 Q22,100 16,120 Q34,128 40,115" fill="#2d6a4f"/>
                <path d="M40,45 Q20,30 15,55 Q35,60 40,45" fill="#2d6a4f"/>
                <path d="M40,45 Q60,30 65,55 Q45,60 40,45" fill="#2d6a4f"/>
                <path d="M25,45 Q17,15 40,20 Q63,15 55,45 Q40,62 25,45 Z" fill="#ffd166"/>
                <path d="M32,45 Q40,22 48,45 Q40,56 32,45 Z" fill="#ffb703"/>
                <path d="M35,35 Q40,18 45,35 Z" fill="#fb8500"/>
            </svg>`,
        margarita: `
            <svg width="80" height="200" viewBox="0 0 80 200">
                <path d="M40,35 Q38,120 40,195" stroke="#3a7d44" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M40,110 Q56,95 62,115 Q46,125 40,110" fill="#2d6a4f"/>
                <circle cx="40" cy="42" r="20" fill="#2d6a4f" opacity="0.4"/>
                <g fill="#fffdf0" stroke="#ffb703" stroke-width="1.5">
                    <circle cx="40" cy="15" r="7"/>
                    <circle cx="40" cy="55" r="7"/>
                    <circle cx="20" cy="35" r="7"/>
                    <circle cx="60" cy="35" r="7"/>
                    <circle cx="26" cy="21" r="7"/>
                    <circle cx="54" cy="49" r="7"/>
                    <circle cx="54" cy="21" r="7"/>
                    <circle cx="26" cy="49" r="7"/>
                </g>
                <circle cx="40" cy="35" r="10" fill="#fb8500"/>
                <circle cx="40" cy="35" r="7" fill="#ffb703"/>
            </svg>`,
        rosa: `
            <svg width="80" height="200" viewBox="0 0 80 200">
                <path d="M40,37.5 Q38,120 40,195" stroke="#3a7d44" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M40,115 Q22,100 16,120 Q34,128 40,115" fill="#2d6a4f"/>
                <path d="M40,45 Q18,35 18,55 Q38,60 40,45" fill="#2d6a4f"/>
                <path d="M40,45 Q62,35 62,55 Q42,60 40,45" fill="#2d6a4f"/>
                <circle cx="40" cy="37.5" r="22" fill="#ffb703"/>
                <path d="M25,32 Q40,15 55,32 Q40,58 25,32 Z" fill="#fb8500"/>
                <path d="M30,27 Q40,38 50,27" stroke="#fff3b0" stroke-width="3" fill="none"/>
                <circle cx="40" cy="37.5" r="10" fill="#ffd166"/>
            </svg>`
    };

    function addFlower(type) {
        if (bouquetCount >= 50) return;
        bouquetCount++;

        const idx = bouquetCount;
        let angle = 0;
        let layer = Math.floor((idx - 1) / 8);
        let stepInLayer = (idx - 1) % 8;

        if (stepInLayer === 0) {
            angle = 0;
        } else {
            const side = (stepInLayer % 2 === 1) ? -1 : 1;
            const mag = Math.ceil(stepInLayer / 2) * 12;
            angle = side * mag;
        }

        angle += (Math.random() - 0.5) * 4;
        const translateY = -16 * layer;
        const scale = (layer === 0 ? 1.05 : Math.max(0.75, 1 - layer * 0.05)) + (Math.random() - 0.5) * 0.05;

        const el = document.createElement('div');
        el.className = 'flower-item-svg';
        el.innerHTML = flowerSVGs[type] || flowerSVGs['girasol'];

        el.style.left = `calc(50% - 40px)`;
        el.style.bottom = `50px`;
        el.style.transformOrigin = `40px 190px`;
        el.style.transform = `translateY(${translateY}px) rotateZ(${angle}deg) scale(${scale})`;
        el.style.zIndex = 80 - (layer * 12) + (stepInLayer % 3);

        bouquetDisplay.appendChild(el);
    }

    // Initial 5 flowers in vase
    addFlower('girasol');
    addFlower('tulipan');
    addFlower('margarita');
    addFlower('rosa');
    addFlower('girasol');

    addFlowerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addFlower(btn.dataset.type);
        });
    });

    btnResetBouquet?.addEventListener('click', () => {
        if (bouquetDisplay) bouquetDisplay.innerHTML = '';
        bouquetCount = 0;
    });


    // ==========================================
    // CARTA Y MODAL
    // ==========================================
    const cardModal = document.getElementById('card-modal');
    const btnOpenCard = document.getElementById('btn-open-card');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const typedTextEl = document.getElementById('typed-text');

    const defaultMessage = `"Mariana, hoy 21 de septiembre te entrego estas flores amarillas que preparé para ti con todo mi corazón. Que nunca falte la luz, la alegría y esa sonrisa hermosa que ilumina mis días, mi bella Rashell. ¡Eres la persona más especial de mi vida y te quiero muchísimo!"`;

    function typeWriter(text) {
        if (!typedTextEl) return;
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
        cardModal?.classList.remove('hidden');
        typeWriter(defaultMessage);
    });

    modalCloseBtn?.addEventListener('click', () => {
        cardModal?.classList.add('hidden');
    });


    // ==========================================
    // EXPERIENCIA 2: JARDÍN DE RAZONES
    // ==========================================
    const gardenGrid = document.getElementById('garden-grid');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const gardenFinalMsg = document.getElementById('garden-final-msg');

    const reasons = [
        "Mariana, por la luz tan hermosa que le das a mis días con tu sonrisa.",
        "Rashell, por tus abrazos sinceros que hacen que todo mi mundo esté bien.",
        "Por cada risa, llamada y momento inolvidable que compartimos juntos, mi bella Mariana.",
        "Rashell, por tu bondad, tu ternura y la paciencia tan linda que siempre me tienes.",
        "Porque a tu lado me inspiras a ser una mejor persona cada día, Mariana.",
        "¡Simplemente por existir, mi dulce Rashell, y por ser el regalo más bonito de mi vida!"
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
    // EXPERIENCIA 3: MÚSICA & FOTOS POLAROID (Local MP3 Integration)
    // ==========================================
    const btnPlayMusic = document.getElementById('btn-play-music');
    const vinylDisc = document.getElementById('vinyl-disc');
    const localAudio = document.getElementById('local-audio');
    let isPlaying = false;

    function startMusic() {
        if (!isPlaying) {
            isPlaying = true;
            vinylDisc?.classList.add('playing');
            if (btnPlayMusic) btnPlayMusic.textContent = '⏸️ Pausar "Flores Amarillas"';
            if (localAudio) {
                localAudio.play().catch(err => console.log('Audio play error:', err));
            }
        }
    }

    function pauseMusic() {
        if (isPlaying) {
            isPlaying = false;
            vinylDisc?.classList.remove('playing');
            if (btnPlayMusic) btnPlayMusic.textContent = '▶️ Reproducir "Flores Amarillas"';
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
        
        // 7 oleadas instantáneas (sin espaciado) de lluvia de pétalos
        for (let i = 0; i < 7; i++) {
            triggerPetalShower();
        }
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



});
