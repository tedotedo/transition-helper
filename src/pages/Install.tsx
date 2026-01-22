import { Link } from 'react-router-dom'

export default function Install() {
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
          <span className="text-3xl">📲</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Install the App</h1>
            <p className="text-sm text-warm-500">Add Transition Ready to your home screen</p>
          </div>
        </div>
      </header>

      {/* Main install section */}
      <section className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl p-6 text-white shadow-card">
        <h2 className="text-xl font-bold mb-2">Why install?</h2>
        <p className="text-white/90 mb-4">
          Adding Transition Ready to your home screen gives you quick, one-tap access — just like a regular app!
          It's free and takes less than 30 seconds.
        </p>

        <div className="space-y-3">
          {/* iPhone/iPad */}
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>🍎</span> iPhone or iPad (Safari)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-white/90 text-sm">
              <li>Open this website in <strong>Safari</strong> (not Chrome or other browsers)</li>
              <li>Tap the <strong>Share</strong> button <span className="inline-block bg-white/30 px-1.5 py-0.5 rounded text-xs">⬆️</span> at the bottom of the screen</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> in the top right corner</li>
            </ol>
          </div>

          {/* Android */}
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>🤖</span> Android (Chrome)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-white/90 text-sm">
              <li>Open this website in <strong>Chrome</strong></li>
              <li>Tap the <strong>three dots menu</strong> <span className="inline-block bg-white/30 px-1.5 py-0.5 rounded text-xs">⋮</span> in the top right corner</li>
              <li>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
              <li>Tap <strong>"Add"</strong> or <strong>"Install"</strong> to confirm</li>
            </ol>
          </div>
        </div>

        <p className="text-white/70 text-xs mt-4">
          ✨ Once installed, you'll find the Transition Ready icon on your home screen — just tap it to open!
        </p>
      </section>

      {/* Benefits */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4">Benefits of installing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-warm-800 text-sm">Quick access</h3>
              <p className="text-warm-500 text-xs">One tap from your home screen — no typing URLs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="font-semibold text-warm-800 text-sm">Works like an app</h3>
              <p className="text-warm-500 text-xs">Full screen experience without browser bars</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🆓</span>
            <div>
              <h3 className="font-semibold text-warm-800 text-sm">Completely free</h3>
              <p className="text-warm-500 text-xs">No app store download needed</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-warm-800 text-sm">Private & secure</h3>
              <p className="text-warm-500 text-xs">Your data stays on your device</p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-warm-50 rounded-2xl border border-warm-200 p-6">
        <h2 className="text-lg font-bold text-warm-700 mb-3">Having trouble?</h2>
        <div className="space-y-3 text-warm-600 text-sm">
          <p>
            <strong>iPhone users:</strong> Make sure you're using Safari — the "Add to Home Screen" option
            doesn't appear in Chrome or other browsers on iOS.
          </p>
          <p>
            <strong>Android users:</strong> If you don't see "Add to Home screen", try looking for
            "Install app" instead, or check your browser settings.
          </p>
          <p>
            <strong>Still stuck?</strong> You can always bookmark this page or save the link for easy access!
          </p>
        </div>
      </section>
    </div>
  )
}
