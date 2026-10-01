const eventGalleries = [
  { id: 'event-1', title: 'Event name', date: 'Date', photos: [1, 2, 3] },
  { id: 'event-2', title: 'Event name', date: 'Date', photos: [4, 5, 6] },
]

function GalleryPage() {
  return (
    <>
      <section className="border-b border-line pt-16 pb-[30px] max-[700px]:pt-10" aria-labelledby="gallery-page-title">
        <h1 className="text-[48px] leading-[1.16] font-bold tracking-[-1.9px] text-heading max-[700px]:text-[clamp(36px,8vw,48px)]" id="gallery-page-title">Gallery</h1>
      </section>

      <div className="space-y-[72px] pt-10 max-[700px]:space-y-12">
        {eventGalleries.map((event) => (
          <section key={event.id} aria-labelledby={`${event.id}-title`}>
            <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-1.05px] text-heading max-[480px]:text-[28px]" id={`${event.id}-title`}>
              {event.title} <span className="mx-1" aria-hidden="true">·</span> {event.date}
            </h2>
            <div className="mt-[34px] grid grid-cols-3 gap-x-[26px] gap-y-8 max-[1000px]:grid-cols-2 max-[1000px]:gap-x-5 max-[480px]:grid-cols-1">
              {event.photos.map((photo) => (
                <div key={photo} className={`flex aspect-[8/5] flex-col items-center justify-center gap-7 rounded-[15px] border border-line ${photo % 3 === 2 ? 'bg-photo-alt' : 'bg-photo'}`} role="img" aria-label={`Event photo placeholder ${photo}`}>
                  <span className="grid h-[68px] w-[68px] place-items-center rounded-2xl border border-line bg-surface" aria-hidden="true">
                    <span className="block h-[29px] w-[29px] border-2 border-link bg-[repeating-linear-gradient(45deg,transparent_0_4px,var(--link)_4px_6px,transparent_6px_10px)]" />
                  </span>
                  <span className="text-[18px] font-bold text-heading">Add event photo</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export default GalleryPage
