const eventTypes = [
  { number: '01', title: 'Casual play', description: 'Drop in for relaxed games and meet other chess players at YorkU.' },
  { number: '02', title: 'Blitz night', description: 'Enjoy faster games, friendly competition, and plenty of rematches.' },
  { number: '03', title: 'Tournaments', description: 'Compete across the boards and challenge yourself in a club event.' },
  { number: '04', title: 'Chess learning', description: 'Share ideas, discuss positions, and grow your understanding of the game.' },
]

function EventsPage() {
  return (
    <>
      <section className="border-b border-line pt-[56px] pb-[42px] max-[700px]:pt-10" aria-labelledby="events-page-title">
        <h1 className="text-[48px] leading-[1.16] font-bold tracking-[-1.9px] text-heading max-[700px]:text-[clamp(36px,8vw,48px)]" id="events-page-title">Events</h1>
      </section>

      <section className="pt-[34px]" aria-label="Event types">
        <div className="flex flex-col gap-6">
          {eventTypes.map((event) => (
            <article
              className="flex min-h-[145px] items-center gap-8 rounded-2xl border border-line bg-surface px-6 py-7 max-[700px]:gap-5 max-[480px]:gap-4 max-[480px]:px-4 max-[480px]:py-6"
              key={event.number}
              aria-labelledby={`event-type-${event.number}`}
            >
              <span className="grid h-[78px] w-[78px] shrink-0 place-items-center rounded-2xl bg-event-number text-2xl font-bold text-link max-[480px]:h-14 max-[480px]:w-14 max-[480px]:text-xl" aria-hidden="true">{event.number}</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[26px] leading-[1.2] font-bold tracking-[-0.5px] text-heading max-[480px]:text-[22px]" id={`event-type-${event.number}`}>{event.title}</h2>
                <p className="mt-[10px] text-base leading-[1.5] text-muted max-[480px]:text-sm">{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default EventsPage
