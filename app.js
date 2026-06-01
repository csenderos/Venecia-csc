// Logic and Interactivity for Venice Web - CSC

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const scrollAnims = document.querySelectorAll('.scroll-anim');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnims.forEach(el => observer.observe(el));

    // 4. Accordion for Tips Section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Venice Itinerary Planner Widget
    const plannerForm = document.getElementById('venice-planner-form');
    const resultsContainer = document.getElementById('itinerary-results');

    if (plannerForm && resultsContainer) {
        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const days = parseInt(document.getElementById('travel-days').value);
            const budget = document.getElementById('travel-budget').value;
            const style = document.getElementById('travel-style').value;

            generateItinerary(days, budget, style);
        });
    }

    function generateItinerary(days, budget, style) {
        let budgetText = budget === 'low' ? 'Económico' : budget === 'medium' ? 'Moderado' : 'Exclusivo';
        let styleText = style === 'cultural' ? 'Cultural e Histórico' : style === 'romantic' ? 'Romántico y Relajado' : 'Aventura y Exploración';
        
        let itineraryHTML = `
            <div class="itinerary-header">
                <h3>Tu Itinerario Personalizado</h3>
                <span class="itinerary-tag">${days} ${days === 1 ? 'Día' : 'Días'} • ${budgetText} • ${styleText}</span>
            </div>
            <div class="itinerary-timeline">
        `;

        // Itinerary database logic
        const itineraries = {
            cultural: {
                day1: [
                    { time: "09:00 AM", title: "Plaza de San Marcos y Basílica", desc: "Comienza temprano contemplando la arquitectura bizantina. Admira los mosaicos dorados de la Basílica de San Marcos." },
                    { time: "11:30 AM", title: "Palacio Ducal (Palazzo Ducale)", desc: "Explora las salas góticas de los Dogos y cruza el famoso Puente de los Suspiros hasta las prisiones." },
                    { time: "03:00 PM", title: "Museo Correr y Biblioteca Marciana", desc: "Sumérgete en la historia del imperio veneciano a través de colecciones imperiales de arte y mapas antiguos." },
                    { time: "07:00 PM", title: "Cena en Cannaregio", desc: "Prueba el tradicional risotto al nero di seppia en una taberna histórica lejos del bullicio turístico." }
                ],
                day2: [
                    { time: "10:00 AM", title: "Galería de la Academia", desc: "La colección más grande de pintura veneciana (Bellini, Tiziano, Tintoretto y el Hombre de Vitruvio de Da Vinci)." },
                    { time: "01:30 PM", title: "Iglesia de Santa Maria della Salute", desc: "Majestuoso templo barroco construido en agradecimiento por el fin de la peste en el siglo XVII." },
                    { time: "04:00 PM", title: "Paseo por el Puente de Rialto y Mercado", desc: "Cruza el puente de piedra más antiguo de Venecia y explora el área mercantil histórica." }
                ],
                day3: [
                    { time: "09:30 AM", title: "Excursión en Vaporetto a Murano y Burano", desc: "Descubre el arte del soplado de vidrio en Murano y las icónicas casitas de colores y encajes en Burano." },
                    { time: "04:00 PM", title: "Colección Peggy Guggenheim", desc: "Visita una de las colecciones de arte moderno más importantes en un palacio inconcluso del siglo XVIII frente al Gran Canal." }
                ]
            },
            romantic: {
                day1: [
                    { time: "10:00 AM", title: "Paseo por el laberinto de San Polo", desc: "Piérdete por callejones tranquilos cruzando puentes pequeños y plazoletas silenciosas." },
                    { time: "01:00 PM", title: "Almuerzo en Osteria con Cicchetti", desc: "Degusta las tapas venecianas (cicchetti) acompañadas de un copa de Prosecco o Spritz Aperol." },
                    { time: "05:00 PM", title: "Paseo en Góndola al Atardecer", desc: "Una experiencia ineludible. Pasea por los canales interiores mientras el sol tiñe los antiguos edificios de tonos dorados." },
                    { time: "08:30 PM", title: "Cena íntima frente al Gran Canal", desc: "Reserva una mesa exterior con vistas al canal iluminado en un restaurante premium." }
                ],
                day2: [
                    { time: "10:30 AM", title: "Isla de San Giorgio Maggiore", desc: "Sube al campanario de la iglesia de Palladio para obtener las mejores vistas panorámicas de la laguna y Venecia." },
                    { time: "02:00 PM", title: "Teatro La Fenice", desc: "Admira el esplendor dorado de uno de los teatros de ópera más legendarios e históricos del mundo." },
                    { time: "06:00 PM", title: "Concierto de Vivaldi", desc: "Disfruta de 'Las Cuatro Estaciones' interpretadas con trajes de época en la Iglesia de la Pietà." }
                ],
                day3: [
                    { time: "10:00 AM", title: "Paseo por los Jardines de la Biennale", desc: "Disfruta de un tranquilo paseo rodeado de vegetación y pabellones de arte contemporáneo al borde de la laguna." },
                    { time: "03:00 PM", title: "Tarde de té en Café Florian", desc: "El café más antiguo del mundo en plena Plaza de San Marcos. Escucha la música clásica en vivo en un entorno del siglo XVIII." }
                ]
            },
            adventure: {
                day1: [
                    { time: "09:00 AM", title: "Subida al Campanile de San Marcos", desc: "Consigue una vista aérea espectacular de toda la laguna de Venecia y los tejados de ladrillo rojo." },
                    { time: "11:30 AM", title: "Exploración urbana de Dorsoduro", desc: "Visita Squero di San Trovaso, uno de los últimos astilleros tradicionales donde todavía construyen y reparan góndolas." },
                    { time: "03:00 PM", title: "Escalera Contarini del Bovolo", desc: "Sube la carismática escalera de caracol gótico-renacentista oculta en un callejón sin salida." },
                    { time: "08:00 PM", title: "Ruta nocturna de misterios y fantasmas", desc: "Únete a un tour guiado a pie para descubrir las leyendas oscuras y misterios de la Venecia medieval." }
                ],
                day2: [
                    { time: "09:00 AM", title: "Kayak por los Canales Venecianos", desc: "Descubre Venecia desde el nivel del agua remando en kayak de manera guiada por los canales históricos de Cannaregio." },
                    { time: "02:00 PM", title: "El Barrio Judío (Ghetto Vecchio)", desc: "Recorre el primer gueto del mundo, un barrio cargado de historia con edificios inusualmente altos." },
                    { time: "05:00 PM", title: "Mirador T Fondaco dei Tedeschi", desc: "Sube a la terraza panorámica de este antiguo edificio comercial para ver una vista cenital del Puente de Rialto." }
                ],
                day3: [
                    { time: "10:00 AM", title: "Exploración de la Isla de Torcello", desc: "El origen de Venecia. Visita esta isla semidesierta y admira el imponente trono de Atila y los mosaicos de su basílica del año 639." },
                    { time: "03:00 PM", title: "Cruzar en góndola traghetto", desc: "Cruza el Gran Canal como un auténtico local subiendo a las góndolas colectivas de cruce por solo un par de euros." }
                ]
            }
        };

        // Render days
        const styleData = itineraries[style] || itineraries.cultural;

        for (let i = 1; i <= days; i++) {
            const dayKey = `day${i}`;
            const dayEvents = styleData[dayKey] || [];
            
            itineraryHTML += `
                <div class="timeline-day-separator" style="margin: 2rem 0 1rem -1rem; font-family: var(--font-serif); font-size: 1.25rem; color: var(--accent); font-weight: 600;">
                    Día ${i}
                </div>
            `;

            dayEvents.forEach(event => {
                // Adjust description based on budget slightly
                let budgetNote = "";
                if (budget === 'low') {
                    if (event.title.includes("Góndola")) {
                        budgetNote = " <em>(Consejo bajo costo: Puedes optar por el Góndola Traghetto por 2€ para cruzar el canal si el paseo completo excede tu presupuesto)</em>.";
                    } else if (event.title.includes("Cena") || event.title.includes("Almuerzo")) {
                        budgetNote = " <em>(Consejo bajo costo: Pide comida para llevar, como pasta en caja fresca o porciones de pizza en Farini, y disfrútala junto al canal)</em>.";
                    } else if (event.title.includes("Florian")) {
                        budgetNote = " <em>(Consejo bajo costo: Toma el café al mostrador dentro para pagar el precio estándar en lugar de la mesa exterior con recargo musical)</em>.";
                    }
                } else if (budget === 'premium') {
                    if (event.title.includes("Góndola")) {
                        budgetNote = " <em>(Toque exclusivo: Contrata un músico a bordo para que cante serenatas durante tu paseo privado)</em>.";
                    } else if (event.title.includes("Cena") || event.title.includes("Almuerzo")) {
                        budgetNote = " <em>(Toque exclusivo: Disfruta de un menú degustación de estrella Michelin maridado con vinos del Véneto)</em>.";
                    }
                }

                itineraryHTML += `
                    <div class="timeline-item">
                        <span class="timeline-time">${event.time}</span>
                        <h4 class="timeline-title">${event.title}</h4>
                        <p class="timeline-desc">${event.desc}${budgetNote}</p>
                    </div>
                `;
            });
        }

        itineraryHTML += `
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <p style="font-size: 0.9rem; color: rgba(248, 250, 252, 0.5); font-style: italic;">Itinerario diseñado para ti. Las iniciales del autor de esta página web son <strong>CSC</strong>.</p>
            </div>
        `;

        resultsContainer.innerHTML = itineraryHTML;

        // Show transition
        resultsContainer.style.display = 'block';
        setTimeout(() => {
            resultsContainer.classList.add('show');
            // Smooth scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }

    // 6. Image Fallback Handler
    // Unsplash high quality alternatives for Venice
    const fallbacks = {
        'images/hero.png': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80',
        'images/gondola.png': 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
        'images/rialto.png': 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=800&q=80'
    };

    // Hero background image check
    const heroSection = document.querySelector('.hero');
    const plannerSection = document.querySelector('.planner');

    if (heroSection) {
        const testImg = new Image();
        testImg.src = 'images/hero.png';
        testImg.onerror = () => {
            // Local file missing, use high-quality Unsplash image
            const unsplashHero = fallbacks['images/hero.png'];
            heroSection.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.7)), url('${unsplashHero}')`;
            
            if (plannerSection) {
                plannerSection.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.96)), url('${unsplashHero}')`;
            }
        };
    }

    // Check gallery/card images
    document.querySelectorAll('img').forEach(img => {
        const relativeSrc = img.getAttribute('src');
        if (fallbacks[relativeSrc]) {
            img.onerror = () => {
                img.src = fallbacks[relativeSrc];
            };
        }
    });
});
