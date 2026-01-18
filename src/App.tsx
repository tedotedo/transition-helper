import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { EasyReadProvider, RoleProvider, useRole } from './hooks'
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
import { PdfViewer } from './pages/PdfViewer'
import { MoneyPip } from './pages/MoneyPip'
import { PlanningTools } from './pages/PlanningTools'
import { VideosStories } from './pages/VideosStories'
import LevelUpHome from './pages/level-up/LevelUpHome'
import MythBusters from './pages/level-up/MythBusters'
import PowerUpsGuide from './pages/level-up/PowerUpsGuide'
import MyBadges from './pages/level-up/MyBadges'

// Wrapper to apply role-based styling
function AppContent() {
  const { isYoungPerson } = useRole()

  // Apply vibrant gradient directly to body for young person view
  useEffect(() => {
    if (isYoungPerson) {
      document.body.classList.add('young-person-bg')
    } else {
      document.body.classList.remove('young-person-bg')
    }
    return () => {
      document.body.classList.remove('young-person-bg')
    }
  }, [isYoungPerson])

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
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/resources/ready-steady-go/ready-questionnaire"
            element={
              <PdfViewer
                title="Ready questionnaire (age 11–13)"
                description="Helps younger children start talking about their condition, who is in their team, and what they understand so far. You can complete it together at home and bring it to clinic."
                pdfPath="/ready-steady-go-pdfs/readysteadygoreadyquestionnaire_1-3_1.pdf"
                easyReadPath="/ready-steady-go-pdfs/easy-read-ready-3.pdf"
              />
            }
          />
          <Route
            path="/resources/ready-steady-go/steady-questionnaire"
            element={
              <PdfViewer
                title="Steady questionnaire (age 14–15)"
                description="Supports young people aged 14–15 to think about independence, medicines, and questions they may have before transition."
                pdfPath="/ready-steady-go-pdfs/readysteadygosteadyquestionnaire_1-2_1.pdf"
                easyReadPath="/ready-steady-go-pdfs/easy-read-steady-3.pdf"
              />
            }
          />
          <Route
            path="/resources/ready-steady-go/go-questionnaire"
            element={
              <PdfViewer
                title="Go questionnaire (age 16–17)"
                description="This Ready Steady Go questionnaire helps you think about how ready you feel to move to adult services. You can fill it in at home and bring it to your next clinic visit."
                pdfPath="/ready-steady-go-pdfs/readysteadygogoquestionnaire_1-2_1.pdf"
                easyReadPath="/ready-steady-go-pdfs/easy-read-go-3.pdf"
              />
            }
          />
          {/* Level Up Game */}
          <Route path="/level-up" element={<LevelUpHome />} />
          <Route path="/level-up/myths" element={<MythBusters />} />
          <Route path="/level-up/powers" element={<PowerUpsGuide />} />
          <Route path="/level-up/badges" element={<MyBadges />} />
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
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </EasyReadProvider>
    </RoleProvider>
  )
}

export default App
