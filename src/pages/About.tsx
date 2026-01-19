import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <header className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors"
        >
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">ℹ️</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">About Transition Ready</h1>
            <p className="text-sm text-warm-500">The story behind this app</p>
          </div>
        </div>
      </header>

      {/* Creator section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Created by</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src="/dr-mark-aszkenasy.jpg"
              alt="Dr Mark Aszkenasy"
              className="w-32 h-32 rounded-2xl object-cover shadow-card"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-warm-800">Dr Mark Aszkenasy</h3>
            <p className="text-warm-600 leading-relaxed">
              Consultant Community Paediatrician at University Hospitals Tees NHS Foundation Trust,
              with a particular interest in neurodevelopmental differences, particularly autism.
            </p>
            <p className="text-warm-500 text-sm">
              This app was created to help young people and their families navigate the often
              challenging transition from children's to adult healthcare services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Our Mission</h2>
        <p className="text-warm-600 leading-relaxed">
          Transition Ready aims to empower young people aged 11-18+ to take control of their
          healthcare journey. We believe that with the right information and support, every young
          person can feel confident and prepared for adult healthcare services.
        </p>
      </section>

      {/* Acknowledgements section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Acknowledgements</h2>
        <div className="space-y-4">
          <div className="p-4 bg-accent-50 rounded-xl border border-accent-100">
            <h3 className="font-semibold text-accent-700 mb-2">Ready Steady Go Programme</h3>
            <p className="text-warm-600 text-sm leading-relaxed">
              The transition checklist structure used in this app is adapted from the{' '}
              <a
                href="https://www.uhs.nhs.uk/health-professionals/transition-from-child-to-adult-services"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 underline hover:text-accent-700"
              >
                Ready Steady Go
              </a>{' '}
              transition programme, originally developed by Dr Arvind Nagra and the Transition
              Steering Group at University Hospital Southampton NHS Foundation Trust. Used with
              acknowledgement of the original creators.
            </p>
          </div>

          <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
            <h3 className="font-semibold text-primary-700 mb-2">Background Animations</h3>
            <p className="text-warm-600 text-sm leading-relaxed">
              Background video animations created with the assistance of Google Gemini AI.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer section */}
      <section className="bg-warm-50 rounded-2xl border border-warm-200 p-6">
        <h2 className="text-lg font-bold text-warm-700 mb-3">Important Information</h2>
        <p className="text-warm-600 text-sm leading-relaxed mb-3">
          This app provides general information for young people and families in the UK. It does
          not replace medical or legal advice. Always consult with your healthcare team for
          guidance specific to your situation.
        </p>
        <Link
          to="/privacy"
          className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          <span>🔒</span> Read our full Privacy Notice & Disclaimer →
        </Link>
      </section>

      {/* Feedback CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Have feedback?</h2>
        <p className="text-white/90 mb-4">
          We'd love to hear how we can make Transition Ready even better.
        </p>
        <p className="text-white/80 text-sm">
          Click the feedback button in the bottom right corner to share your thoughts! 💬
        </p>
      </section>

      {/* Books section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Books by Dr Aszkenasy</h2>
        <p className="text-warm-600 mb-6">
          Dr Aszkenasy has authored several children's books to help young people understand medical procedures:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="https://amzn.eu/d/9ltdp8A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center space-y-3 group"
          >
            <img
              src="/zaks_bood_test_book_cover.jpg"
              alt="Zak's Blood Test book cover"
              className="w-full max-w-[140px] mx-auto rounded-xl shadow-card group-hover:shadow-card-hover group-hover:scale-105 transition-all"
            />
            <div>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-primary-600 transition-colors">Zak's Blood Test</h3>
              <p className="text-warm-500 text-xs">Helping children prepare for blood tests</p>
            </div>
          </a>
          <a
            href="https://amzn.eu/d/6SmVMMi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center space-y-3 group"
          >
            <img
              src="/zaks_operation.jpg"
              alt="Zak's Operation book cover"
              className="w-full max-w-[140px] mx-auto rounded-xl shadow-card group-hover:shadow-card-hover group-hover:scale-105 transition-all"
            />
            <div>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-primary-600 transition-colors">Zak's Operation</h3>
              <p className="text-warm-500 text-xs">Preparing children for surgery</p>
            </div>
          </a>
          <a
            href="https://amzn.eu/d/1X2Oq76"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center space-y-3 group"
          >
            <img
              src="/leucovorin_book_cover.jpg"
              alt="Leucovorin book cover"
              className="w-full max-w-[140px] mx-auto rounded-xl shadow-card group-hover:shadow-card-hover group-hover:scale-105 transition-all"
            />
            <div>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-primary-600 transition-colors">Leucovorin</h3>
              <p className="text-warm-500 text-xs">Understanding leucovorin treatment</p>
            </div>
          </a>
        </div>
      </section>

      {/* Other Resources section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Other Resources by Dr Aszkenasy</h2>
        <p className="text-warm-500 text-sm mb-4">
          Explore more apps and resources designed to support families and healthcare professionals:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://www.sleepspectrum.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-warm-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">😴</span>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-primary-600 transition-colors">Sleep Spectrum</h3>
            </div>
            <p className="text-warm-500 text-xs leading-relaxed">
              Sleep support and guidance for neurodivergent children and their families.
            </p>
          </a>
          <a
            href="https://www.practical-autism-research.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-warm-100 hover:border-accent-200 hover:bg-accent-50/50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔬</span>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-accent-600 transition-colors">Practical Autism Research</h3>
            </div>
            <p className="text-warm-500 text-xs leading-relaxed">
              Evidence-based resources and research insights for autism support.
            </p>
          </a>
          <a
            href="https://arfidwellnesstracker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-warm-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🍎</span>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-primary-600 transition-colors">ARFID Wellness Tracker</h3>
            </div>
            <p className="text-warm-500 text-xs leading-relaxed">
              Support for families navigating Avoidant/Restrictive Food Intake Disorder.
            </p>
          </a>
          <a
            href="https://deploy-preview-1--nf1-care-companion.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50 transition-all group relative"
          >
            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              WIP
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧬</span>
              <h3 className="font-semibold text-warm-800 text-sm group-hover:text-amber-600 transition-colors">NF1 Care Companion</h3>
            </div>
            <p className="text-warm-500 text-xs leading-relaxed">
              Support and resources for families affected by Neurofibromatosis Type 1.
            </p>
          </a>
        </div>
      </section>
    </div>
  )
}
