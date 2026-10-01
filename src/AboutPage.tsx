import ConstitutionContent from './ConstitutionContent'

export type Executive = {
  role: string
  positions: number
  description: string
  name?: string
  image?: string
}

export type ConstitutionArticle = {
  title: string
  paragraphs: string[]
}

type AboutPageProps = {
  executives: Executive[]
  constitution: ConstitutionArticle[]
}

const mission = [
  'Organize and provide engaging chess-related events and activities.',
  'Promote chess education and support members in developing their knowledge and skills.',
  'Encourage discussion, collaboration, and the exchange of ideas related to chess.',
  'Motivate members to participate in club events and contribute to the continued growth and popularity of chess.',
  'Increase awareness, interest, and participation in chess among York University students, staff, and faculty.',
]

const sectionHeading = 'text-[32px] leading-[1.2] font-bold tracking-[-1.05px] text-heading max-[480px]:text-[28px]'

function AboutPage({ executives, constitution }: AboutPageProps) {
  return (
    <>
      <section className="grid grid-cols-[1fr_300px] items-center gap-16 pt-16 pb-14 max-[1000px]:grid-cols-[1fr_220px] max-[1000px]:gap-8 max-[700px]:grid-cols-1 max-[700px]:pt-10 max-[700px]:pb-10" aria-labelledby="about-page-title">
        <div>
          <h1 className="max-w-[760px] text-[48px] leading-[1.16] font-bold tracking-[-1.9px] text-heading max-[700px]:text-[clamp(36px,8vw,48px)]" id="about-page-title">About ChessBlitz YorkU</h1>
          <div className="mt-6 max-w-[650px] space-y-4 text-[18px] leading-[1.6] text-muted max-[480px]:text-base">
            <p>ChessBlitz YorkU welcomes players of all skill levels, from beginners to experienced competitors. Through casual games, competitive events, and regular play, members can improve their skills, meet fellow chess enthusiasts, and build lasting connections.</p>
            <p>The club also hosts qualifiers and supports players selected to represent York University at the Canadian University Chess Championship (CUCC).</p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[24px] border border-line max-[700px]:hidden" aria-hidden="true">
          <div className="grid h-full grid-cols-8">
            {Array.from({ length: 64 }, (_, square) => (
              <span key={square} className={(Math.floor(square / 8) + square) % 2 === 0 ? 'bg-photo' : 'bg-photo-alt'} />
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-32 w-32 place-items-center rounded-full border border-line bg-surface text-[90px] leading-none text-link max-[1000px]:h-28 max-[1000px]:w-28 max-[1000px]:text-[78px]">♞</div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[280px_1fr] gap-16 rounded-[24px] border border-line bg-surface p-10 max-[1000px]:grid-cols-[220px_1fr] max-[1000px]:gap-8 max-[700px]:grid-cols-1 max-[700px]:gap-6 max-[700px]:p-6" aria-labelledby="mission-title">
        <div>
          <h2 className={sectionHeading} id="mission-title">Our mission</h2>
        </div>
        <ol className="divide-y divide-line">
          {mission.map((statement, index) => (
            <li className="flex items-start gap-5 py-5 first:pt-0 last:pb-0 max-[480px]:gap-3" key={statement}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-event-number text-sm font-bold text-link" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <p className="pt-1 text-[17px] leading-[1.6] text-heading max-[480px]:text-base">{statement}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-[72px] max-[700px]:pt-12" aria-labelledby="executives-title">
        <h2 className={sectionHeading} id="executives-title">Executive team</h2>
        <p className="mt-3 text-base leading-[1.6] text-muted">The people behind our club, and the roles that bring it all together.</p>
        <div className="mt-8 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[480px]:grid-cols-1">
          {executives.map((executive) => (
            <article className="rounded-2xl border border-line bg-surface p-6" key={`${executive.name ?? ''}-${executive.role}`}>
              <div className="mb-5 flex items-center gap-3">
                {executive.image ? (
                  <img className="h-16 w-16 shrink-0 rounded-full object-cover" src={executive.image} alt="" width="64" height="64" loading="lazy" />
                ) : (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-photo-alt text-lg font-bold text-link" aria-hidden="true">{executive.name ? executive.name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('') : executive.positions}</span>
                )}
                <p className="text-sm text-muted">{executive.positions} {executive.positions === 1 ? 'position' : 'positions'}</p>
              </div>
              <h3 className="text-xl leading-[1.3] font-bold tracking-[-0.4px] text-heading">{executive.name ?? executive.role}</h3>
              {executive.name && <p className="mt-2 text-sm leading-[1.5] text-link">{executive.role}</p>}
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{executive.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-[72px] border-t border-line pt-10 max-[700px]:mt-12" aria-labelledby="constitution-title">
        <h2 className={sectionHeading} id="constitution-title">Club constitution</h2>
        <p className="mt-4 text-base leading-[1.6] text-muted">The principles and rules that guide ChessBlitz YorkU.</p>
        <p className="mt-3 text-sm leading-[1.5] text-muted">Last amended <time dateTime="2026-09-21">September 21, 2026</time>.</p>
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {constitution.map((article, index) => (
            <details className="group" key={article.title}>
              <summary className="flex min-h-[76px] cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors hover:bg-photo focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-link max-[480px]:gap-3 max-[480px]:px-4 [&::-webkit-details-marker]:hidden">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-event-number text-sm font-bold text-link" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="min-w-0 flex-1 text-[18px] leading-[1.4] font-bold text-heading max-[480px]:text-base">{article.title}</h3>
                <svg className="h-5 w-5 shrink-0 text-link transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <div className="border-t border-line px-6 py-6 max-[480px]:px-4">
                <div className="mx-auto max-w-[800px]">
                  <ConstitutionContent paragraphs={article.paragraphs} />
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default AboutPage
