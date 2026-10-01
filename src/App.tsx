import { useState } from 'react'

type Theme = 'light' | 'dark'

const clubLinks = {
  instagram: 'https://www.instagram.com/yorkuchess/',
  discord: 'https://discord.gg/VsJAdbvyEq',
  yuConnectHome: 'https://yuconnect.yorku.ca/feeds?type=club&type_id=35476&tab=home',
  yuConnectAbout: 'https://yuconnect.yorku.ca/feeds?type=club&type_id=35476&tab=about',
  chessCom: 'https://www.chess.com/club/chessblitz-yorku',
  drive: 'https://drive.google.com/drive/u/3/folders/1sshFt39_rbMfscV_Ots8TBSq3cvVsNBz',
}

const footerLinks = [
  { label: 'Instagram', href: clubLinks.instagram },
  { label: 'Discord', href: clubLinks.discord },
  { label: 'Chess.com', href: clubLinks.chessCom },
  { label: 'YUConnect', href: clubLinks.yuConnectAbout },
  { label: 'Public Drive', href: clubLinks.drive },
]

const events = [
  { number: '01', title: 'Casual play', description: 'Drop in for a game and meet other players.' },
  { number: '02', title: 'Blitz night', description: 'Quick games and friendly competition.' },
  { number: '03', title: 'Campus tournament', description: 'A chance to play across the boards.' },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    const tabIcon = document.querySelector<HTMLLinkElement>('#site-icon')
    if (tabIcon) tabIcon.href = nextTheme === 'dark' ? '/iconwhite.png' : '/icondark.png'
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
      'content', nextTheme === 'dark' ? '#0b1e31' : '#ffffff',
    )
    setTheme(nextTheme)
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner page-width">
          <a className="brand" href="#home" aria-label="ChessBlitz YorkU home">
            <img
              className="brand-image"
              src={theme === 'dark' ? '/CBYUfullwhite.png' : '/CBYUfullblack.png'}
              alt=""
              width="2723"
              height="526"
            />
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" />
              </svg>
            )}
          </button>
          <nav className="main-nav" aria-label="Main navigation">
            <a className="active" href="#home" aria-current="page">Home</a>
            <a href="#events">Events</a>
            <a href="#photos">Photos</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main className="page-width" id="home">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">ChessBlitz YorkU</h1>
          <p>Bringing chess events, learning, and conversation to the York University community.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={clubLinks.discord} target="_blank" rel="noopener noreferrer">Join our Discord <Arrow diagonal /></a>
          </div>
        </section>

        <section className="events-section" id="events" aria-labelledby="events-title">
          <div className="section-kicker">Club events</div>
          <h2 id="events-title">Come play with us</h2>
          <p className="section-description">Details can be updated as new club events are announced.</p>
          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.number}>
                <span className="event-number">{event.number}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <a href={clubLinks.yuConnectHome} target="_blank" rel="noopener noreferrer">Event details <Arrow /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="photos-section" id="photos" aria-labelledby="photos-title">
          <div className="section-kicker">From the club</div>
          <div className="photos-heading">
            <h2 id="photos-title">Past events in pictures</h2>
            <a href={clubLinks.instagram} target="_blank" rel="noopener noreferrer">See all photos <Arrow /></a>
          </div>
          <div className="photo-grid" id="photo-gallery">
            {[1, 2, 3].map((photo) => (
              <div className="photo-placeholder" key={photo} role="img" aria-label={'Event photo placeholder ' + photo}>
                <span className="photo-icon" aria-hidden="true" />
                <span>Add event photo</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer page-width" id="about">
        <strong>CHESSBLITZ YORKU</strong>
        <nav className="footer-links" aria-label="Club links">
          {footerLinks.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
      </footer>
    </>
  )
}

export default App
