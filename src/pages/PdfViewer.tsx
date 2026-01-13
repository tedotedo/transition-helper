interface PdfViewerProps {
  title: string
  description: string
  pdfPath: string
  easyReadPath?: string
}

export function PdfViewer({ title, description, pdfPath, easyReadPath }: PdfViewerProps) {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ready Steady Go toolkit</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">{title}</h1>
        <p className="max-w-2xl text-sm md:text-base text-slate-300">{description}</p>
        <div className="flex flex-wrap gap-3 pt-1 text-sm">
          <a
            href={pdfPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-accent-500 px-4 py-2 font-medium text-white shadow-card hover:bg-accent-600"
          >
            Open in new tab
          </a>
          <a
            href={pdfPath}
            download
            className="inline-flex items-center rounded-full border border-slate-700/80 px-4 py-2 font-medium text-slate-100 hover:bg-slate-900/70"
          >
            Download PDF
          </a>
          {easyReadPath && (
            <a
              href={easyReadPath}
              className="inline-flex items-center rounded-full border border-slate-700/80 px-4 py-2 font-medium text-slate-100 hover:bg-slate-900/70"
            >
              Easy-read PDF
            </a>
          )}
        </div>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-card">
        <div className="h-[70vh] w-full bg-slate-950">
          <iframe
            src={pdfPath}
            title={title}
            className="h-full w-full border-0"
          />
        </div>
      </section>
    </div>
  )
}
