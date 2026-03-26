import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EasyReadProvider, RoleProvider, useRole, useEasyRead } from './hooks'
import { VoiceProvider } from './hooks/useVoice'
import { isRTL } from './i18n'
import { AppShell } from './components/layout/AppShell'
import { Home } from './pages/Home'
import { Checklist } from './pages/Checklist'
import { Appointments } from './pages/Appointments'
import { CarePlan } from './pages/CarePlan'
import { CareTeam } from './pages/CareTeam'
import { LearnAboutCondition } from './pages/LearnAboutCondition'
import { MyTeam } from './pages/MyTeam'
import { SpeakUpAtAppointments } from './pages/SpeakUpAtAppointments'
import { KnowYourMedicines } from './pages/KnowYourMedicines'
import { AskAboutMoveDate } from './pages/AskAboutMoveDate'
import { LookIntoPIP } from './pages/LookIntoPIP'
import { HelloNewTeam } from './pages/HelloNewTeam'
import { CheckYourSupport } from './pages/CheckYourSupport'
import { Consent16to17 } from './pages/Consent16to17'
import { ConsentUnder16 } from './pages/ConsentUnder16'
import { Consent18Plus } from './pages/Consent18Plus'
import { MyJourney } from './pages/MyJourney'
import { RightsHub } from './pages/RightsHub'
import { Resources } from './pages/Resources'
import { MoneyPip } from './pages/MoneyPip'
import { PlanningTools } from './pages/PlanningTools'
import { VideosStories } from './pages/VideosStories'
import LevelUpHome from './pages/level-up/LevelUpHome'
import MythBusters from './pages/level-up/MythBusters'
import PowerUpsGuide from './pages/level-up/PowerUpsGuide'
import MyBadges from './pages/level-up/MyBadges'
import { SkillsBuilder } from './pages/SkillsBuilder'
import { QuestionsAnswers } from './pages/QuestionsAnswers'
import About from './pages/About'
import Install from './pages/Install'
import Privacy from './pages/Privacy'

// Wrapper to apply role-based styling and handle RTL
function AppContent() {
  const { isYoungPerson } = useRole()
  const { easyRead } = useEasyRead()
  const { i18n } = useTranslation()

  // Update document direction and language when language changes
  useEffect(() => {
    const lang = i18n.language || 'en'
    const dir = isRTL(lang) ? 'rtl' : 'ltr'

    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [i18n.language])

  // Toggle body.easy-read CSS class for Easy Read mode typography
  useEffect(() => {
    document.body.classList.toggle('easy-read', easyRead)
  }, [easyRead])

  return (
    <div className={isYoungPerson ? 'font-friendly' : 'font-sans'}>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/care-plan" element={<CarePlan />} />
          <Route path="/care-team" element={<CareTeam />} />
          <Route path="/journey" element={<MyJourney />} />
          <Route path="/journey/learn-about-condition" element={<LearnAboutCondition />} />
          <Route path="/journey/my-team" element={<MyTeam />} />
          <Route path="/journey/speak-up" element={<SpeakUpAtAppointments />} />
          <Route path="/journey/my-medicines" element={<KnowYourMedicines />} />
          <Route path="/journey/move-date" element={<AskAboutMoveDate />} />
          <Route path="/journey/pip" element={<LookIntoPIP />} />
          <Route path="/journey/new-team" element={<HelloNewTeam />} />
          <Route path="/journey/check-support" element={<CheckYourSupport />} />
          <Route path="/rights" element={<RightsHub />} />
          <Route path="/rights/consent-under-16" element={<ConsentUnder16 />} />
          <Route path="/rights/consent-16-17" element={<Consent16to17 />} />
          <Route path="/rights/consent-18-plus" element={<Consent18Plus />} />
          <Route path="/money" element={<MoneyPip />} />
          <Route path="/planning" element={<PlanningTools />} />
          <Route path="/videos" element={<VideosStories />} />
          <Route path="/skills" element={<SkillsBuilder />} />
          <Route path="/questions" element={<QuestionsAnswers />} />
          <Route path="/resources" element={<Resources />} />
          {/* Level Up Game */}
          <Route path="/level-up" element={<LevelUpHome />} />
          <Route path="/level-up/myths" element={<MythBusters />} />
          <Route path="/level-up/powers" element={<PowerUpsGuide />} />
          <Route path="/level-up/badges" element={<MyBadges />} />
          {/* About & Legal */}
          <Route path="/about" element={<About />} />
          <Route path="/install" element={<Install />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </div>
  )
}

function App() {
  return (
    <RoleProvider>
      <EasyReadProvider>
        <VoiceProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </VoiceProvider>
      </EasyReadProvider>
    </RoleProvider>
  )
}

export default App
