import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'

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
            <div className="mt-2"><ReadAloud text="Consultant Community Paediatrician at University Hospitals Tees NHS Foundation Trust, with a particular interest in neurodevelopmental differences, particularly autism. This app was created to help young people and their families navigate the often challenging transition from children's to adult healthcare services." /></div>
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
        <div className="mt-2"><ReadAloud text="Transition Ready aims to empower young people aged 11-18 and older to take control of their healthcare journey. We believe that with the right information and support, every young person can feel confident and prepared for adult healthcare services." /></div>
      </section>

      {/* Install App section */}
      <section className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl p-6 text-white shadow-card">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span>📲</span> Add to Your Home Screen
        </h2>
        <p className="text-white/90 mb-4">
          Install Transition Ready on your phone for quick access — it works just like an app!
        </p>

        <div className="space-y-3">
          {/* iPhone/iPad */}
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>🍎</span> iPhone or iPad (Safari)
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-white/90 text-sm">
              <li>Tap the <strong>Share</strong> button (square with arrow pointing up)</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> in the top right corner</li>
            </ol>
          </div>

          {/* Android */}
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>🤖</span> Android (Chrome)
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-white/90 text-sm">
              <li>Tap the <strong>three dots menu</strong> (⋮) in the top right</li>
              <li>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
              <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
          </div>
        </div>

        <p className="text-white/70 text-xs mt-4">
          ✨ Once added, open the app directly from your home screen — no browser needed!
        </p>
      </section>

      {/* Acknowledgements section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Acknowledgements</h2>
        <div className="space-y-4">
          <div className="p-4 bg-accent-50 rounded-xl border border-accent-100">
            <h3 className="font-semibold text-accent-700 mb-2">Ready Steady Go &amp; Hello Programme</h3>
            <p className="text-warm-600 text-sm leading-relaxed mb-3">
              This app is designed to complement the{' '}
              <a
                href="https://www.readysteadygo.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 underline hover:text-accent-700"
              >
                Ready Steady Go &amp; Hello
              </a>{' '}
              transition programme. We encourage all users to access the official RSG questionnaires
              and resources at{' '}
              <a
                href="https://www.readysteadygo.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 underline hover:text-accent-700"
              >
                www.readysteadygo.net
              </a>.
            </p>
            <div className="p-3 bg-white/60 rounded-lg border border-accent-200 text-xs text-warm-500 leading-relaxed space-y-2">
              <p>
                'Ready Steady Go' and 'Hello to adult services' developed by the Transition Steering Group
                led by Dr Arvind Nagra, paediatric nephrologist and clinical lead for transitional care at
                Southampton Children's Hospital, University Hospital Southampton NHS Foundation Trust based
                on the work of:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                <li>S Whitehouse and MC Paone. Bridging the gap from youth to adulthood. Contemporary Pediatrics; 1998, December. 13-16.</li>
                <li>Paone MC, Wigle M, Saewyc E. The ON TRAC model for transitional care of adolescents. Prog Transplant 2006;16:291-302</li>
                <li>Janet E McDonagh et al, J Child Health Care 2006;10(1):22-42.</li>
              </ol>
            </div>
            <div className="mt-2"><ReadAloud text="This app is designed to complement the Ready Steady Go and Hello to adult services transition programme, developed by Dr Arvind Nagra and the Transition Steering Group at University Hospital Southampton NHS Foundation Trust." /></div>
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
        <div className="mt-2"><ReadAloud text="This app provides general information for young people and families in the UK. It does not replace medical or legal advice. Always consult with your healthcare team for guidance specific to your situation." /></div>
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
        <div className="mt-2"><ReadAloud text="We would love to hear how we can make Transition Ready even better. Click the feedback button in the bottom right corner to share your thoughts." /></div>
      </section>

      {/* Books section */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Helpful Books for Young People</h2>
        <p className="text-warm-600 mb-6">
          These children's books by Dr Aszkenasy are written to help young people understand and prepare for medical procedures (also available in Italian, French, German, Portuguese and Spanish):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
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
        </div>
      </section>
    </div>
  )
}
