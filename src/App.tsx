import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { Home } from './pages/Home'
import { LearnAboutCondition } from './pages/LearnAboutCondition'
import { MyTeam } from './pages/MyTeam'
import { Consent16to17 } from './pages/Consent16to17'
import { MyJourney } from './pages/MyJourney'
import { RightsHub } from './pages/RightsHub'
import { Resources } from './pages/Resources'
import { PdfViewer } from './pages/PdfViewer'
import { MoneyPip } from './pages/MoneyPip'
import { PlanningTools } from './pages/PlanningTools'
import { VideosStories } from './pages/VideosStories'

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<MyJourney />} />
          <Route path="/journey/learn-about-condition" element={<LearnAboutCondition />} />
          <Route path="/journey/my-team" element={<MyTeam />} />
          <Route path="/rights" element={<RightsHub />} />
          <Route path="/rights/consent-16-17" element={<Consent16to17 />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
