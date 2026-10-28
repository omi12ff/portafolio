
import './App.css'
import { useEffect, useRef, useState } from 'react'
import securityCenterScreenshot from './assets/security-center-ai.png'
import portrait from './assets/osmar-duarte.jpeg'
import { usePortfolioEffects } from './usePortfolioEffects'

const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'marca-personal', label: 'Mi marca' },
  { id: 'formacion', label: 'Formación' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'reflexion', label: 'Reflexión' },
  { id: 'contacto', label: 'Contacto' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { portfolioRef, activeSection, isScrolled, showBackToTop } = usePortfolioEffects()

  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 1051px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    desktop.addEventListener('change', closeOnDesktop)
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutside)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutside)
    }
  }, [menuOpen])

  const navigate = (id: string) => {
    if (menuOpen) {
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.focus({ preventScroll: true })
      })
    }
    setMenuOpen(false)
  }

  return (
    <div className="portfolio" ref={portfolioRef}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`navbar${isScrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
        <a className="logo" href="#inicio" aria-label="Osmar Duarte, inicio" onClick={() => navigate('inicio')}>
          OD<span>.</span>
        </a>

        <button
          type="button"
          ref={menuButtonRef}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>

        <nav
          id="main-menu"
          aria-label="Navegación principal"
          className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
        >
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => navigate(id)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>


      <main id="contenido" tabIndex={-1}>
        <section className="hero" id="inicio" tabIndex={-1}>
          <div className="hero-content">
            <p className="hero-note">PORTAFOLIO PERSONAL · FPUNA</p>

            <h1>
              Hola, soy <br />
              <span>Osmar Duarte.</span>
            </h1>

            <h2>Desarrollador Full Stack en formación</h2>

            <p className="description">
              Estudiante de la Facultad Politécnica de la
              Universidad Nacional de Asunción.
              Me apasiona transformar ideas en soluciones
              digitales funcionales e innovadoras.
            </p>

            <div className="hero-buttons">
              <a className="btn primary" href="#proyectos">
                Ver mis proyectos
              </a>
              <a className="btn secondary" href="#contacto">
                Contactarme
              </a>
            </div>
            <a className="hero-explore" href="#sobre-mi">Conocé mi recorrido</a>
          </div>

          <figure className="hero-portrait">
            <img
              src={portrait}
              alt="Retrato de Osmar Duarte"
              width="970"
              height="1137"
              fetchPriority="high"
            />
            <figcaption className="portrait-caption">
              <strong>Osmar Duarte</strong>
              <span>Estudiante · Facultad Politécnica, UNA</span>
            </figcaption>
          </figure>
        </section>


        <section className="section about" id="sobre-mi" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">01</span>
            <div>
              <p className="eyebrow">CONOCÉ UN POCO MÁS DE MÍ</p>
              <h2>Sobre mí</h2>
            </div>
          </div>

          <div className="about-container">
            <div className="about-text">
              <p>
                Soy estudiante de tercer año de la Facultad
                Politécnica de la Universidad Nacional de
                Asunción, apasionado por el desarrollo de
                software y las nuevas tecnologías.
              </p>

              <p>
                Durante mi formación académica he adquirido
                conocimientos en programación, desarrollo web,
                bases de datos y resolución de problemas.
                He trabajado con lenguajes y herramientas como
                Java, Python, TypeScript, React, PostgreSQL
                y Oracle SQL, aplicando estos conocimientos
                en proyectos académicos y personales.
              </p>

              <p>
                Mi principal interés es desarrollarme como
                profesional Full Stack, participando en la
                creación de aplicaciones que ofrezcan
                soluciones prácticas y mejoren la experiencia
                de los usuarios.
              </p>

              <p>
                Me considero una persona curiosa, perseverante
                y comprometida con el aprendizaje continuo.
                Disfruto enfrentar desafíos técnicos,
                investigar nuevas herramientas y fortalecer
                mis capacidades mediante la práctica.
                Mi objetivo es integrarme a un equipo de
                desarrollo donde pueda aportar mis
                conocimientos, adquirir experiencia
                profesional y seguir creciendo en el
                ámbito tecnológico.
              </p>
            </div>

            <div className="skills-card">
              <h3>Mis tecnologías</h3>
              <p>Herramientas con las que he trabajado</p>

              <div className="skills-grid">
                {[
                  'React',
                  'TypeScript',
                  'Java',
                  'Python',
                  'PostgreSQL',
                  'Oracle SQL',
                  'HTML',
                  'CSS'
                ].map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="section value-section" id="marca-personal" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">02</span>
            <div>
              <p className="eyebrow">MI IDENTIDAD PROFESIONAL</p>
              <h2>Mi propuesta de valor</h2>
            </div>
          </div>

          <p className="value-intro">
            Busco aportar a empresas, equipos de desarrollo y
            organizaciones mediante la creación de soluciones
            digitales prácticas, eficientes y orientadas a las
            necesidades de los usuarios.

            Combino conocimientos de programación, bases de
            datos y desarrollo web con una mentalidad de
            aprendizaje continuo y resolución de problemas.
          </p>

          <div className="value-grid">

            <article className="value-card">
              <span className="value-number">01</span>
              <h3>Resolución de problemas</h3>

              <p>
                Me interesa comprender los desafíos de los
                usuarios y desarrollar soluciones que
                respondan a necesidades reales.
              </p>

              <div className="value-example">
                <strong>Ejemplo:</strong> Mi trabajo en{' '}
                <a href="#security-center-ai">Security Center AI</a>,
                orientado a presentar comprobaciones de Windows
                y guías para comprender sus resultados.
              </div>
            </article>

            <article className="value-card">
              <span className="value-number">02</span>
              <h3>Conocimientos técnicos</h3>

              <p>
                Cuento con formación en distintos lenguajes
                de programación, desarrollo de interfaces
                y administración de bases de datos.
              </p>

              <div className="value-example">
                <strong>Ejemplo:</strong> Prácticas académicas
                con Oracle SQL, PL/SQL y PostgreSQL, además
                de proyectos con React y TypeScript.
              </div>
            </article>

            <article className="value-card">
              <span className="value-number">03</span>
              <h3>Aprendizaje continuo</h3>

              <p>
                Busco mejorar constantemente mis habilidades,
                aprender nuevas tecnologías y aplicar
                mis conocimientos en proyectos prácticos.
              </p>

              <div className="value-example">
                <strong>Ejemplo:</strong> Desarrollo de
                aplicaciones personales y construcción
                de este portafolio utilizando React
                y TypeScript.
              </div>
            </article>

          </div>

          <div className="value-message">
            <p>
              "Mi objetivo es transformar conocimientos
              técnicos en soluciones que generen valor."
            </p>
          </div>
        </section>

        {/* FORMACIÓN Y EXPERIENCIA */}
        <section className="section education-section" id="formacion" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">03</span>
            <div>
              <p className="eyebrow">MI TRAYECTORIA</p>
              <h2>Formación y experiencia</h2>
            </div>
          </div>

          <p className="education-intro">
            Mi desarrollo profesional combina formación académica,
            aprendizaje continuo y experiencia práctica mediante
            proyectos universitarios y personales.
          </p>

          <div className="education-grid">

            {/* FORMACIÓN ACADÉMICA */}
            <div className="education-column">
              <h3>Formación académica</h3>

              <div className="timeline">
                <article className="timeline-item">
                  <span className="timeline-date">
                    EN CURSO · 3.er AÑO
                  </span>

                  <h4>Estudios universitarios</h4>

                  <p className="timeline-place">
                    Universidad Nacional de Asunción
                  </p>

                  <p>
                    Facultad Politécnica (FPUNA).
                    Formación en programación, bases de datos,
                    redes informáticas y desarrollo de software.
                  </p>

                  <div className="timeline-tags">
                    <span>Programación</span>
                    <span>Bases de datos</span>
                    <span>Redes</span>
                  </div>
                </article>
              </div>
            </div>

            {/* EXPERIENCIA PRÁCTICA */}
            <div className="education-column">
              <h3>Experiencia práctica</h3>

              <div className="timeline">
                <article className="timeline-item">
                  <span className="timeline-date">
                    PROYECTOS ACADÉMICOS Y PERSONALES
                  </span>

                  <h4>Desarrollo de aplicaciones web</h4>

                  <p>
                    Trabajo en Security Center AI, un proyecto
                    personal que integra una interfaz web con
                    Next.js y TypeScript, una API .NET y una
                    base de datos PostgreSQL para consultar
                    análisis de equipos Windows.
                  </p>

                  <div className="timeline-tags">
                    <span>Next.js</span>
                    <span>TypeScript</span>
                    <span>.NET</span>
                    <span>PostgreSQL</span>
                  </div>
                </article>

                <article className="timeline-item">
                  <span className="timeline-date">
                    PRÁCTICAS UNIVERSITARIAS
                  </span>

                  <h4>Programación y bases de datos</h4>

                  <p>
                    Resolución de ejercicios y problemas
                    mediante SQL, PL/SQL, Java y Python.
                    Prácticas con consultas, procedimientos,
                    funciones y triggers en bases de datos.
                  </p>

                  <div className="timeline-tags">
                    <span>Oracle SQL</span>
                    <span>PL/SQL</span>
                    <span>Java</span>
                    <span>Python</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>



        {/* MIS PROYECTOS */}
        <section className="section projects-section" id="proyectos" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">04</span>
            <div>
              <p className="eyebrow">MIS TRABAJOS</p>
              <h2>Proyectos destacados</h2>
            </div>
          </div>

          <p className="projects-intro">
            Una selección de proyectos académicos y personales
            donde aplico mis conocimientos para desarrollar
            soluciones tecnológicas y fortalecer mis habilidades.
          </p>

          <div className="projects-grid">

            {/* PROYECTO 1 */}
            <article className="project-card" id="security-center-ai" tabIndex={-1}>
              <div className="project-image-container">
                <img
                  src={securityCenterScreenshot}
                  alt="Captura de la página de inicio de Security Center AI"
                  className="project-screenshot"
                  width="1920"
                  height="956"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="project-content">
                <span className="project-category">
                  PROYECTO PERSONAL · EN DESARROLLO
                </span>

                <h3>Security Center AI</h3>

                <p>
                  Aplicación para comprender el estado de
                  seguridad de equipos Windows mediante
                  comprobaciones manuales, historial de
                  resultados y guías de revisión. Incorpora
                  explicaciones opcionales con IA.
                </p>

                <div className="project-details">
                  <p>
                    <strong>Objetivo:</strong> Presentar
                    observaciones técnicas de forma clara
                    y ayudar a identificar qué revisar y
                    qué no pudo comprobarse.
                  </p>

                  <p>
                    <strong>Participación:</strong> Trabajo en
                    el desarrollo y evolución de este proyecto
                    personal, aplicando conocimientos de
                    desarrollo web, APIs y bases de datos.
                  </p>

                  <p>
                    <strong>Resultado actual:</strong> Versión
                    local en desarrollo que integra un agente
                    Windows con diez comprobaciones de solo
                    lectura, una API y una web para consultar
                    análisis e historial. Pendiente de despliegue
                    público y de ampliar las pruebas de compatibilidad.
                  </p>
                </div>

                <div className="project-technologies">
                  <span>C#</span>
                  <span>.NET 8</span>
                  <span>Next.js</span>
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>PostgreSQL</span>
                </div>

                <div className="project-links">
                  <a
                    className="project-link"
                    href="https://github.com/omi12ff/SecurityCenterAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver repositorio de Security Center AI (se abre en otra pestaña)"
                  >
                    Ver repositorio ↗
                  </a>
                </div>
              </div>
            </article>

            {/* PROYECTO 2 */}
            <article className="project-card">
              <div className="project-image-container">
                <img
                  src={`${import.meta.env.BASE_URL}images/portafolio-sobre-mi.png`}
                  alt="Captura de la sección Sobre mí del portafolio profesional"
                  className="project-screenshot"
                  width="1547"
                  height="769"
                  loading="lazy"
                />
              </div>

              <div className="project-content">
                <span className="project-category">
                  PROYECTO PERSONAL
                </span>

                <h3>Portafolio profesional</h3>

                <p>
                  Sitio web personal desarrollado para
                  presentar mi perfil profesional,
                  competencias, formación y proyectos.
                </p>

                <div className="project-details">
                  <p>
                    <strong>Objetivo:</strong> Construir una
                    identidad profesional digital para
                    oportunidades académicas y laborales.
                  </p>

                  <p>
                    <strong>Participación:</strong> Desarrollo
                    de las interfaces, estructura y estilos
                    utilizando React, TypeScript y CSS.
                  </p>

                  <p>
                    <strong>Resultado:</strong> Sitio funcional
                    con navegación entre secciones y un
                    diseño adaptable a distintos dispositivos.
                  </p>
                </div>

                <div className="project-technologies">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>CSS</span>
                  <span>Vite</span>
                </div>
                <div className="project-links">
                  <a
                    className="project-link"
                    href="https://github.com/omi12ff/portafolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver repositorio del portafolio profesional (se abre en otra pestaña)"
                  >
                    Ver repositorio ↗
                  </a>
                </div>
              </div>
            </article>

          </div>
        </section>


        {/* REFLEXIÓN PERSONAL */}
        <section className="section reflection-section" id="reflexion" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">05</span>
            <div>
              <p className="eyebrow">MI CRECIMIENTO PROFESIONAL</p>
              <h2>Reflexión personal</h2>
            </div>
          </div>

          <p className="reflection-intro">
            Construir mi portafolio profesional me permitió
            comprender que una marca personal no consiste
            solamente en mostrar conocimientos técnicos,
            sino también en comunicar quién soy,
            qué puedo aportar y hacia dónde quiero crecer.
          </p>

          <div className="reflection-card">
            <h3>Lo que aprendí</h3>

            <p>
              Durante este proyecto reflexioné sobre mis
              fortalezas, habilidades e intereses profesionales.
              Aprendí la importancia de presentar mis
              conocimientos de manera clara, auténtica
              y respaldada por evidencias concretas.
            </p>

            <p>
              También comprendí que mi desarrollo profesional
              es un proceso de mejora continua. Todavía tengo
              mucho por aprender, pero cada proyecto representa
              una oportunidad para fortalecer mis capacidades,
              adquirir experiencia y acercarme a mis objetivos.
            </p>

            <p>
              Este portafolio no representa solamente
              lo que he aprendido hasta ahora, sino también
              mi compromiso de seguir creciendo como
              futuro desarrollador de software.
            </p>
          </div>

          <div className="reflection-quote">
            "Mi marca personal se construye con aprendizaje,
            dedicación y resultados que demuestran
            mis capacidades."
          </div>
        </section>

        {/* CONTACTO Y PROYECCIÓN PROFESIONAL */}
        <section className="section contact-section" id="contacto" tabIndex={-1}>
          <div className="section-heading">
            <span className="section-index" aria-hidden="true">06</span>
            <div>
              <p className="eyebrow">CONECTEMOS</p>
              <h2>Contacto y objetivos profesionales</h2>
            </div>
          </div>

          <p className="contact-intro">
            Estoy abierto a nuevas oportunidades de aprendizaje,
            colaboración y desarrollo profesional en el área
            tecnológica.
          </p>

          <div className="contact-grid">

            <div className="contact-card">
              <h3>Conectá conmigo</h3>

              <p>
                Podés conocer mis proyectos, explorar mi código
                y conectar conmigo a través de mis perfiles
                profesionales.
              </p>

              <div className="social-links">
                <a
                  href="https://github.com/omi12ff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button"
                >
                  GitHub ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/osmar-duarte-745ba136b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Mis objetivos profesionales</h3>

              <div className="goal-item">
                <span>01</span>
                <div>
                  <h4>A corto plazo</h4>
                  <p>
                    Fortalecer mis conocimientos en desarrollo
                    Full Stack, ampliar mi portafolio y adquirir
                    experiencia en proyectos reales.
                  </p>
                </div>
              </div>

              <div className="goal-item">
                <span>02</span>
                <div>
                  <h4>A mediano plazo</h4>
                  <p>
                    Integrarme profesionalmente a un equipo
                    de desarrollo de software, contribuir a
                    soluciones tecnológicas y continuar
                    especializándome.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <footer className="footer">
          <p>
            © 2026 Osmar Duarte · Desarrollado con React
            y TypeScript
          </p>
        </footer>

      </main>
      <a
        className="back-to-top"
        href="#inicio"
        data-visible={showBackToTop}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        Volver al inicio
      </a>
    </div>
  )
}

export default App
