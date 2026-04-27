import { useLocation } from 'react-router-dom'
import { useRole } from '../../hooks'
import ReadAloud from '../ReadAloud'

interface EasyReadContent {
  icon: string
  title: string
  message: string
  actions: { icon: string; text: string }[]
}

const defaultContent: EasyReadContent = {
  icon: '🧭',
  title: 'You can take this one step at a time',
  message: 'This page has tools to help you plan your move to adult health care.',
  actions: [
    { icon: '👀', text: 'Look at the page' },
    { icon: '✅', text: 'Choose one thing to do' },
    { icon: '🗣️', text: 'Ask someone for help if you need it' },
  ],
}

const contentByPath: { match: (path: string) => boolean; content: EasyReadContent }[] = [
  {
    match: (path) => path === '/',
    content: {
      icon: '🏠',
      title: 'This is your home page',
      message: 'It shows the main things you can do in the app.',
      actions: [
        { icon: '✅', text: 'Check your progress' },
        { icon: '📅', text: 'Plan appointments' },
        { icon: '📋', text: 'Write down health information' },
      ],
    },
  },
  {
    match: (path) => path === '/checklist',
    content: {
      icon: '✅',
      title: 'This is your checklist',
      message: 'Tick things when you feel ready. You do not have to do everything today.',
      actions: [
        { icon: '🌱', text: 'Pick your stage' },
        { icon: '☝️', text: 'Choose one task' },
        { icon: '✅', text: 'Tick it when it is done' },
      ],
    },
  },
  {
    match: (path) => path === '/appointments',
    content: {
      icon: '📅',
      title: 'This page helps with appointments',
      message: 'You can write down where you are going and what you want to ask.',
      actions: [
        { icon: '📍', text: 'Add where and when' },
        { icon: '❓', text: 'Write your questions' },
        { icon: '☑️', text: 'Mark it done after you go' },
      ],
    },
  },
  {
    match: (path) => path === '/care-plan',
    content: {
      icon: '📋',
      title: 'This is your care plan',
      message: 'It keeps important health information in one place.',
      actions: [
        { icon: '👤', text: 'Add your details' },
        { icon: '💊', text: 'Add medicines and allergies' },
        { icon: '🖨️', text: 'Print or save it if you want to share it' },
      ],
    },
  },
  {
    match: (path) => path === '/care-plan/passport',
    content: {
      icon: '🗂️',
      title: 'This is a communication passport',
      message: 'It helps health staff understand how to communicate well.',
      actions: [
        { icon: '💬', text: 'Say how communication works best' },
        { icon: '🤝', text: 'Say what helps' },
        { icon: '🖨️', text: 'Print or save the summary' },
      ],
    },
  },
  {
    match: (path) => path === '/journey',
    content: {
      icon: '🗺️',
      title: 'This is your journey map',
      message: "It shows the steps from children's care to adult care.",
      actions: [
        { icon: '🌱', text: 'Start early' },
        { icon: '💪', text: 'Build skills' },
        { icon: '🤝', text: 'Work with your team' },
      ],
    },
  },
  {
    match: (path) => path === '/comic-guide',
    content: {
      icon: '🎨',
      title: 'This is the comic guide',
      message: 'It explains transition with pictures and short sentences.',
      actions: [
        { icon: '👀', text: 'Look at one picture at a time' },
        { icon: '💬', text: 'Talk about what it means' },
        { icon: '🖨️', text: 'Print it if that helps' },
      ],
    },
  },
  {
    match: (path) => path === '/rights',
    content: {
      icon: '⚖️',
      title: 'This page explains your rights',
      message: 'It helps explain consent, privacy and decisions.',
      actions: [
        { icon: '✅', text: 'Know what you can decide' },
        { icon: '🔒', text: 'Know what stays private' },
        { icon: '🗣️', text: 'Ask if something is not clear' },
      ],
    },
  },
  {
    match: (path) => path === '/resources' || path === '/planning',
    content: {
      icon: '📚',
      title: 'This page has resources',
      message: 'You can open forms, guides and easy-read documents.',
      actions: [
        { icon: '📖', text: 'Choose the right guide' },
        { icon: '📝', text: 'Fill it in with support' },
        { icon: '🏥', text: 'Bring it to clinic' },
      ],
    },
  },
]

export function EasyReadPanel() {
  const { pathname } = useLocation()
  const { isYoungPerson } = useRole()
  const content = contentByPath.find((item) => item.match(pathname))?.content ?? defaultContent
  const readText = [
    content.title,
    content.message,
    'Things to do:',
    ...content.actions.map((action) => action.text),
  ].join('. ')

  return (
    <section className="easy-read-panel rounded-2xl border-2 border-accent-200 bg-white p-4 md:p-5 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-3xl border border-accent-100">
            {content.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent-700">
              Easy Read {isYoungPerson ? 'for young people' : 'for parents and carers'}
            </p>
            <h2 className="mt-1 text-xl md:text-2xl font-bold text-warm-800">{content.title}</h2>
            <p className="mt-2 text-base md:text-lg text-warm-600 leading-relaxed">{content.message}</p>
          </div>
        </div>
        <ReadAloud text={readText} label="Read this" />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {content.actions.map((action) => (
          <div key={action.text} className="flex items-center gap-3 rounded-xl bg-warm-50 px-4 py-3">
            <span className="text-2xl" aria-hidden="true">{action.icon}</span>
            <span className="text-base font-semibold text-warm-700">{action.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
