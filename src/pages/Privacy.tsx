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
            This notice explains what Transition Ready keeps, what it sends, and which other companies can see ordinary technical information when you use it.
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-2">🏠 What you enter stays on your device</h3>
              <p className="text-green-700 mb-3">
                <strong>The app does not send anything you enter to us, or to any server, automatically.</strong> We do not keep a database of users' information. What you enter is saved in your browser's local storage, on your own device. It leaves your device only if you choose to send or share it (see "What you can choose to send" below).
              </p>
              <p className="text-green-700 mb-2">Saved on your device:</p>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Your checklist progress and completed items</li>
                <li>Your selected role (young person or parent/carer)</li>
                <li>Your age group, if you choose to give it, so the app can show the stage that fits</li>
                <li>Your preferences (such as language, Simple language mode and voice)</li>
                <li>Anything you type in, such as notes, appointments, care plan details and contact details</li>
              </ul>
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                <p className="text-amber-800 text-xs font-medium">
                  ⚠️ Important: If you lose your device, clear your browser data, or uninstall the app, <strong>all your data will be lost</strong>. We cannot recover it because we do not have a copy.
                </p>
                <p className="text-amber-700 text-xs">
                  <strong>Backing up your data:</strong> The backup button on the Home page saves a file on your device. The app does not upload it anywhere. If you want a second copy, you can keep that file somewhere safe of your own choosing, such as your own cloud storage. That is your choice and your responsibility.
                </p>
                <p className="text-amber-700 text-xs">
                  <strong>Your responsibility:</strong> Because your data stays on your device, you are responsible for keeping your device secure. We cannot be held responsible for data loss or security problems on your own device.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">✉️ What you can choose to send</h3>
              <p className="text-blue-700 mb-2">
                <strong>Feedback button.</strong> If you use it, the app sends three things: your message, your email address (only if you type one in), and the page you were on (for example, /checklist). It does not attach anything else from your device.
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Your feedback goes through our hosting provider, Netlify, to Resend, a service that sends emails</li>
                <li>Resend emails it to the app's owner, Dr Mark Aszkenasy</li>
                <li>We use feedback only to read it, reply if you gave an email address, and improve the app</li>
                <li>Netlify and Resend may keep records of the message for a time under their own policies</li>
              </ul>
              <p className="mt-2 text-blue-700">
                <strong>Please do not put patient-identifiable information in feedback.</strong> That means names, dates of birth, NHS numbers, addresses, or details of someone's health.
              </p>
              <p className="mt-2 text-blue-700">
                <strong>Other things you do yourself.</strong> If you tap an email address, your own email app opens. If you tap a link to another website, that website opens. Printing uses your browser's print window. What happens after that is between you and that service or printer.
              </p>
            </div>

            <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
              <h3 className="font-semibold text-warm-800 mb-2">🌐 Other companies that see ordinary visitor information</h3>
              <p className="mb-2">
                Like any website, the app is delivered over the internet. When your device loads it, these services can see ordinary technical information, such as your IP address, browser and device type, and the time. This is not information you entered in the app.
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong>Netlify</strong> hosts the app and sends its pages and files to your device. It also runs the feedback form's connection.{' '}
                  <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline hover:text-primary-700">
                    Netlify's privacy policy<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <strong>Google Fonts</strong> supplies the app's text styles. Every time the app opens, your device asks Google for these fonts, so Google can see the request.{' '}
                  <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline hover:text-primary-700">
                    Google Fonts privacy information<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <strong>YouTube (Google)</strong> provides the videos on the Videos &amp; Stories page only. See "YouTube videos" below.{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline hover:text-primary-700">
                    Google's privacy policy<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <strong>Resend</strong> sees your feedback only if you send some.{' '}
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline hover:text-primary-700">
                    Resend's privacy policy<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <p className="mt-2">
                Each of these companies has its own privacy policy, and we do not control what it records. The app's own code contains no analytics, advertising or tracking tools. The read-aloud feature uses your browser's built-in voices, and the app does not send the text anywhere. Your browser or device maker may handle speech in its own way.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2">What the app does not do:</h3>
              <ul className="list-disc list-inside space-y-1 text-purple-700">
                <li>Send your checklist, notes, care plan, appointments or contacts to us automatically</li>
                <li>Use analytics, advertising or tracking tools of its own</li>
                <li>Use cookies for advertising or marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice */}
      <section className="bg-white rounded-2xl border border-warm-200 p-6 shadow-card">
        <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
          <span>🍪</span> Cookies and local storage
        </h2>
        <div className="space-y-4 text-warm-600 text-sm leading-relaxed">
          <p>
            <strong className="text-warm-800">The app itself does not use cookies for tracking, advertising or analytics.</strong>
          </p>
          <p>
            We use your browser's <strong>local storage</strong> (not cookies) to save your preferences and progress on your device. Local storage is never sent to a server by the app.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700">
            <h3 className="font-semibold text-blue-800 mb-2">▶️ YouTube videos</h3>
            <p>
              The videos on the Videos &amp; Stories page are made by other organisations and shown via YouTube. We use YouTube's privacy-enhanced mode (youtube-nocookie.com), which asks YouTube not to store information about you unless you play a video.
            </p>
            <p className="mt-2">
              The small preview pictures on that page are loaded from YouTube's servers when the page opens, so YouTube may see that your device has loaded them. Playing a video connects you to YouTube, which may set cookies or collect data under{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                Google's privacy policy<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . Nothing you have entered in the app is sent to YouTube.
            </p>
          </div>
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
            <li><strong className="text-warm-700">Right to access:</strong> You can request a copy of any personal data we hold about you (for example, a feedback email you sent us)</li>
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
            This privacy notice was last updated in October 2026.
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
