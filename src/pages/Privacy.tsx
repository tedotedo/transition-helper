import { Link } from 'react-router-dom'

export default function Privacy() {
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
          <span className="text-3xl">🔒</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Privacy & Disclaimer</h1>
            <p className="text-sm text-warm-500">How we handle your information</p>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>⚕️</span> Medical Disclaimer
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            <strong className="text-warm-800">Transition Ready is for educational and informational purposes only.</strong> The content provided in this app does not constitute medical advice, diagnosis, or treatment.
          </p>
          <p>
            This app is designed to help young people and their families prepare for the transition from children's to adult healthcare services. It provides general guidance and checklists to support this process.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Important:</h3>
            <ul className="list-disc list-inside space-y-2 text-amber-700">
              <li>Always consult your healthcare team for advice specific to your medical conditions</li>
              <li>Do not delay seeking medical advice because of information in this app</li>
              <li>In a medical emergency, contact your local emergency services immediately</li>
              <li>This app does not create a doctor-patient relationship</li>
            </ul>
          </div>
          <p>
            The transition checklist in this app is an independent educational tool, designed to complement the NHS transition process. It is intended as a guide only. Your healthcare team may have different requirements or processes for transition.
          </p>
          <p>
            While we strive to keep information accurate and up-to-date, healthcare practices and policies may vary between NHS trusts and can change over time. Always verify information with your local healthcare providers.
          </p>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>🔐</span> Privacy Notice
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            Your privacy is important to us. This notice explains how Transition Ready handles your information.
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">🏠 All your data stays on YOUR device</h3>
              <p className="text-green-700 mb-3">
                Transition Ready stores all your information <strong>locally on your device only</strong>. We do not have any servers or databases that store your data remotely.
              </p>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Your checklist progress and completed items</li>
                <li>Your selected role (young person or parent/carer)</li>
                <li>Your preferences (such as theme settings)</li>
                <li>Any notes or information you enter</li>
              </ul>
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                <p className="text-amber-800 text-xs font-medium">
                  ⚠️ Important: If you lose your device, clear your browser data, or uninstall the app, <strong>all your data will be lost</strong>. We cannot recover it because we never had access to it.
                </p>
                <p className="text-amber-700 text-xs">
                  <strong>Backing up your data:</strong> If you'd like to keep a record of your progress, we recommend taking screenshots or copying important notes to your own secure cloud storage (such as Google Drive, iCloud, or Dropbox). This is entirely your choice and responsibility — we're not able to back up your data for you.
                </p>
                <p className="text-amber-700 text-xs">
                  <strong>Your responsibility:</strong> Since your data stays on your device, you are responsible for keeping your device secure and for any backups you choose to make. We cannot be held responsible for any data loss or security issues on your personal device.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">When you submit feedback:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Your feedback message is sent via email to the app creator</li>
                <li>Your email address (if provided) is included so we can respond</li>
                <li>We use Resend, a third-party email service, to deliver feedback</li>
              </ul>
              <p className="mt-2 text-blue-600 text-xs">
                Feedback is used solely to improve the app and will not be shared with third parties.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">What we do NOT collect:</h3>
              <ul className="list-disc list-inside space-y-1 text-purple-700">
                <li>Personal health information or medical records</li>
                <li>Names, addresses, or identifying information (unless you provide it in feedback)</li>
                <li>Analytics or tracking data</li>
                <li>Cookies for advertising or marketing purposes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>🍪</span> Cookie Notice
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            <strong className="text-warm-800">This app does not use cookies for tracking, advertising, or analytics.</strong>
          </p>
          <p>
            We use your browser's <strong>local storage</strong> (not cookies) to save your preferences and progress. This is a technical distinction, but an important one:
          </p>
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
            <ul className="space-y-2 text-warm-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Local storage:</strong> Data stays on your device and is never sent to any server</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>No tracking cookies:</strong> We don't track your browsing behaviour</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>No third-party cookies:</strong> We don't allow advertisers or analytics services to place cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>No cookie consent needed:</strong> Because we don't use cookies, you won't see annoying cookie banners!</span>
              </li>
            </ul>
          </div>
          <p className="text-warm-500 text-xs">
            The only external service used is Resend (for feedback emails), which operates under its own privacy policy and only processes data when you actively submit feedback.
          </p>
        </div>
      </section>

      {/* Data Rights */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>✅</span> Your Rights
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            Under UK GDPR, you have rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-warm-700">Right to access:</strong> You can request a copy of any personal data we hold about you</li>
            <li><strong className="text-warm-700">Right to erasure:</strong> You can ask us to delete any feedback or personal data you've submitted</li>
            <li><strong className="text-warm-700">Right to rectification:</strong> You can ask us to correct any inaccurate information</li>
            <li><strong className="text-warm-700">Clear your local data:</strong> You can clear your browser's local storage at any time to remove all app data from your device</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the feedback button or email{' '}
            <a href="mailto:aszkenasy@gmail.com" className="text-primary-600 underline hover:text-primary-700">
              aszkenasy@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Young Users */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>👦</span> Information for Young Users
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            This app is designed for young people aged 11 and above, as well as their parents and carers.
          </p>
          <p>
            We encourage young users to use this app together with a parent, carer, or trusted adult. If you're under 13 and want to submit feedback, please ask a parent or guardian to help you.
          </p>
          <p>
            We do not knowingly collect personal information from children under 13 without parental consent.
          </p>
        </div>
      </section>

      {/* Terms of Use */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>📋</span> Terms of Use
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            By using Transition Ready, you agree to the following:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>You will use this app for its intended purpose of supporting healthcare transition</li>
            <li>You understand that this app does not provide medical advice</li>
            <li>You will not rely solely on this app for healthcare decisions</li>
            <li>You accept that the app is provided "as is" without warranties</li>
          </ul>
          <p>
            We reserve the right to modify or discontinue the app at any time. We will not be liable for any loss or damage arising from your use of the app.
          </p>
        </div>
      </section>

      {/* Contact & Updates */}
      <section className="bg-warm-50 rounded-2xl border border-warm-200 p-6">
        <h2 className="text-lg font-bold text-warm-700 mb-3">Contact & Updates</h2>
        <div className="space-y-3 text-warm-600 text-sm leading-relaxed">
          <p>
            This privacy notice was last updated in January 2025.
          </p>
          <p>
            If you have any questions about this privacy notice or how we handle your data, please contact:
          </p>
          <p className="font-medium text-warm-700">
            Dr Mark Aszkenasy<br />
            Email:{' '}
            <a href="mailto:aszkenasy@gmail.com" className="text-primary-600 underline hover:text-primary-700">
              aszkenasy@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Back to About */}
      <div className="text-center">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          Learn more about Transition Ready →
        </Link>
      </div>
    </div>
  )
}
