import { useEffect, useState, useSyncExternalStore } from 'react'
import EventsPage from './EventsPage'
import GalleryPage from './GalleryPage'
import AboutPage from './AboutPage'
import constitution from './constitution.json'
import { executiveTeam } from './executiveTeam'

type Theme = 'light' | 'dark'

const pageWidth = 'mx-auto w-[calc(100%-160px)] max-w-[1280px] max-[1000px]:w-[calc(100%-48px)] max-[480px]:w-[calc(100%-36px)]'
const focusRing = 'focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-link'
const sectionHeading = 'text-[32px] leading-[1.2] font-bold tracking-[-1.05px] text-heading max-[480px]:text-[28px]'
const sectionKicker = 'text-[13px] leading-[1.4] font-bold uppercase text-link'
const mainNavLink = 'relative flex items-center px-[2px] text-[15px] font-bold max-[700px]:text-[13px]'
const activeNavLink = "text-link after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-t-sm after:bg-link after:content-['']"

function subscribeToNavigation(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentPage() {
  return window.location.hash || '#home'
}

const clubLinks = {
  instagram: 'https://www.instagram.com/yorkuchess/',
  discord: 'https://discord.gg/VsJAdbvyEq',
  membershipDeclaration: 'https://docs.google.com/forms/d/e/1FAIpQLSfKhyvisAQR1bz3xsTWBHttU43sQml22_uEs1reKg1Woazgbg/viewform',
  mailingList: 'https://docs.google.com/forms/d/e/1FAIpQLSfbBhQen9DcdJJAIvWTOmQQ7Ez9PE1bLb8dB_sy75F_LBmELg/viewform',
  yuConnectAbout: 'https://yuconnect.yorku.ca/feeds?type=club&type_id=35476&tab=about',
  chessCom: 'https://www.chess.com/club/chessblitz-yorku',
  drive: 'https://drive.google.com/drive/u/3/folders/1sshFt39_rbMfscV_Ots8TBSq3cvVsNBz',
  linktree: 'https://linktr.ee/yorkuchess',
}

const footerLinks = [
  { label: 'Instagram', href: clubLinks.instagram },
  { label: 'Discord', href: clubLinks.discord },
  { label: 'Chess.com', href: clubLinks.chessCom },
  { label: 'YUConnect', href: clubLinks.yuConnectAbout },
  { label: 'Public Drive', href: clubLinks.drive },
  { label: 'Linktree', href: clubLinks.linktree },
]

const events = [
  { number: '01', title: 'Weekly chess meets', description: 'Drop in each week for casual games and meet other players.' },
  { number: '02', title: 'Workshops', description: 'Learn and improve your chess with sessions such as our Beginners workshop.' },
  { number: '03', title: 'CUCC', description: 'Play in our qualifiers for a chance to represent York University at the Canadian University Chess Championship.' },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? 'text-[17px] leading-none' : 'ml-[3px] align-[-1px] text-[17px]'} aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const currentPage = useSyncExternalStore(subscribeToNavigation, getCurrentPage)
  const isEventsPage = currentPage === '#events'
  const isGalleryPage = currentPage === '#gallery' || currentPage === '#photos'
  const isAboutPage = currentPage === '#about'
  const isHomePage = !isEventsPage && !isGalleryPage && !isAboutPage
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    const pageTitle = isEventsPage ? 'Events' : isGalleryPage ? 'Gallery' : isAboutPage ? 'About' : ''
    document.title = pageTitle ? `${pageTitle} | ChessBlitz YorkU` : 'ChessBlitz YorkU'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentPage, isEventsPage, isGalleryPage, isAboutPage])

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
    <div className="min-h-screen min-w-[320px] bg-page font-site text-heading antialiased [font-synthesis:none] [text-rendering:optimizeLegibility]">
      <header className="h-[78px] bg-site-header max-[700px]:h-auto">
        <div className={`${pageWidth} flex h-full items-center justify-between gap-[30px] max-[1000px]:gap-3 max-[700px]:flex-wrap max-[700px]:pt-4`}>
          <a className={`inline-flex shrink-0 items-center ${focusRing}`} href="#home" aria-label="ChessBlitz YorkU home">
            <img
              className="block h-auto w-[228px] max-[1000px]:w-[200px] max-[700px]:w-[190px] max-[480px]:w-[165px]"
              src={theme === 'dark' ? '/CBYUfullwhite.png' : '/CBYUfullblack.png'}
              alt=""
              width="2723"
              height="526"
            />
          </a>
          <button
            className={`ml-auto grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-[10px] border border-line bg-surface p-0 text-heading transition-colors hover:border-link hover:text-link max-[700px]:h-[38px] max-[700px]:w-[38px] ${focusRing}`}
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" />
              </svg>
            )}
          </button>
          <nav className="flex self-stretch items-stretch gap-[42px] max-[1000px]:gap-5 max-[700px]:order-3 max-[700px]:h-[49px] max-[700px]:w-full max-[700px]:justify-between max-[700px]:gap-[14px]" aria-label="Main navigation">
            <a className={`${mainNavLink} ${isHomePage ? activeNavLink : 'text-muted hover:text-link'} ${focusRing}`} href="#home" aria-current={isHomePage ? 'page' : undefined}>Home</a>
            <a className={`${mainNavLink} ${isEventsPage ? activeNavLink : 'text-muted hover:text-link'} ${focusRing}`} href="#events" aria-current={isEventsPage ? 'page' : undefined}>Events</a>
            <a className={`${mainNavLink} ${isGalleryPage ? activeNavLink : 'text-muted hover:text-link'} ${focusRing}`} href="#gallery" aria-current={isGalleryPage ? 'page' : undefined}>Gallery</a>
            <a className={`${mainNavLink} ${isAboutPage ? activeNavLink : 'text-muted hover:text-link'} ${focusRing}`} href="#about" aria-current={isAboutPage ? 'page' : undefined}>About</a>
          </nav>
        </div>
      </header>

      {isEventsPage ? (
        <main className={pageWidth} id="events">
          <EventsPage />
        </main>
      ) : isGalleryPage ? (
        <main className={pageWidth} id="gallery">
          <GalleryPage />
        </main>
      ) : isAboutPage ? (
        <main className={pageWidth} id="about">
          <AboutPage executives={executiveTeam} constitution={constitution} />
        </main>
      ) : (
        <main className={pageWidth} id="home">
          <section className="border-b border-line pt-16 pb-[42px] max-[700px]:pt-[52px]" aria-labelledby="hero-title">
            <h1 className="text-[48px] leading-[1.16] font-bold tracking-[-1.9px] text-heading max-[700px]:text-[clamp(36px,8vw,48px)]" id="hero-title">ChessBlitz YorkU</h1>
            <p className="mt-[22px] text-[18px] leading-[1.5] text-muted max-[700px]:text-base">Bringing chess events, learning, and conversation to the York University community.</p>
            <div className="mt-8 flex flex-wrap gap-[14px]">
              <a className={`inline-flex min-h-11 min-w-[205px] items-center justify-center gap-[7px] rounded-[10px] border border-transparent bg-button px-[34px] text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-link-hover max-[480px]:flex-1 ${focusRing}`} href={clubLinks.discord} target="_blank" rel="noopener noreferrer">Join our Discord <Arrow diagonal /></a>
              <a className={`inline-flex min-h-11 items-center justify-center gap-[7px] rounded-[10px] border border-line bg-surface px-[34px] text-sm font-bold whitespace-nowrap text-link transition-colors hover:border-link hover:text-link-hover max-[480px]:flex-1 ${focusRing}`} href={clubLinks.membershipDeclaration} target="_blank" rel="noopener noreferrer">Membership Declaration <Arrow diagonal /></a>
              <a className={`inline-flex min-h-11 items-center justify-center gap-[7px] rounded-[10px] border border-line bg-surface px-[34px] text-sm font-bold whitespace-nowrap text-link transition-colors hover:border-link hover:text-link-hover max-[480px]:flex-1 ${focusRing}`} href={clubLinks.mailingList} target="_blank" rel="noopener noreferrer">Mailing list <Arrow diagonal /></a>
            </div>
          </section>

          <section className="pt-10" aria-labelledby="events-title">
            <div className={sectionKicker}>Club events</div>
            <div className="mt-4 flex items-end justify-between gap-5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3">
              <h2 className={sectionHeading} id="events-title">Come play with us</h2>
              <a className={`pb-[5px] text-sm font-bold whitespace-nowrap text-link hover:text-link-hover ${focusRing}`} href="#events">See all events <Arrow /></a>
            </div>
            <p className="mt-3 text-base leading-[1.5] text-muted">Details can be updated as new club events are announced.</p>
            <div className="mt-[27px] grid grid-cols-3 gap-[26px] max-[1000px]:gap-4 max-[700px]:grid-cols-1">
              {events.map((event) => (
                <article className="flex min-h-[183px] flex-col rounded-2xl border border-line bg-surface px-[23px] pt-6 pb-[14px] max-[1000px]:px-[18px] max-[700px]:min-h-[170px]" key={event.number}>
                  <span className="text-[15px] leading-[1.3] font-bold text-link">{event.number}</span>
                  <h3 className="mt-[18px] text-2xl leading-[1.2] font-bold tracking-[-0.6px] text-heading max-[1000px]:text-[21px]">{event.title}</h3>
                  <p className="mt-[9px] text-[15px] leading-[1.4] text-muted">{event.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-[72px] max-[700px]:pt-[60px]" id="gallery-preview" aria-labelledby="photos-title">
            <div className={sectionKicker}>From the club</div>
            <div className="mt-4 flex items-end justify-between gap-5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3">
              <h2 className={sectionHeading} id="photos-title">Past events in pictures</h2>
              <a className={`pb-[5px] text-sm font-bold whitespace-nowrap text-link hover:text-link-hover ${focusRing}`} href="#gallery">See gallery <Arrow /></a>
            </div>
            <div className="mt-[22px] grid grid-cols-3 gap-[26px] max-[1000px]:gap-4 max-[700px]:grid-cols-1" id="photo-gallery">
              {[1, 2, 3].map((photo) => (
                <div className={`flex min-h-[174px] flex-col items-center justify-center gap-[27px] rounded-[15px] border border-line ${photo === 2 ? 'bg-photo-alt' : 'bg-photo'} text-[15px] font-medium text-muted`} key={photo} role="img" aria-label={'Event photo placeholder ' + photo}>
                  <span className="block h-[30px] w-[30px] border-2 border-link bg-[repeating-linear-gradient(45deg,transparent_0_4px,var(--link)_4px_6px,transparent_6px_10px)]" aria-hidden="true" />
                  <span>Add event photo</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      <footer className={`${pageWidth} ${isGalleryPage || isAboutPage ? 'mt-[78px] pb-[70px]' : isEventsPage ? 'mt-[54px] pb-[30px]' : 'mt-[41px] pb-[30px]'} flex items-center justify-between gap-5 border-t border-line pt-[22px] max-[480px]:flex-col max-[480px]:items-start`}>
        <strong className="text-sm font-bold text-heading">CHESSBLITZ YORKU</strong>
        <nav className="flex flex-wrap justify-end gap-x-[21px] gap-y-3 text-sm text-muted max-[480px]:justify-start" aria-label="Club links">
          {footerLinks.map(({ label, href }) => (
            <a className={`hover:text-link ${focusRing}`} key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
      </footer>
    </div>
  )
}

export default App
