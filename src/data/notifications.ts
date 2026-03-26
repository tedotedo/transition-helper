// Notification types and sample data
export interface Notification {
  id: string
  type: 'welcome' | 'reminder' | 'tip' | 'update'
  title: string
  message: string
  href?: string
  createdAt: Date
}

// Sample notifications for the app
export const defaultNotifications: Notification[] = [
  {
    id: 'welcome-1',
    type: 'welcome',
    title: 'Welcome to Transition Care! 👋',
    message: "We're here to help you get ready for adult healthcare services. Start by exploring your journey stages.",
    href: '/journey',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
  {
    id: 'reminder-1',
    type: 'reminder',
    title: 'Time to fill in your questionnaire? 📋',
    message: 'Have you completed your official Ready Steady Go questionnaire? Visit the RSG website to download it and bring it to your next appointment.',
    href: 'https://www.readysteadygo.net/rsg.html',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 'tip-1',
    type: 'tip',
    title: 'New: Check out the consent guide ✨',
    message: 'Learn about who makes decisions about your care at 16-17 and how your family can still be involved.',
    href: '/rights/consent-16-17',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'reminder-2',
    type: 'reminder',
    title: 'Ask about your transfer date 📅',
    message: "Do you know when you'll be moving to adult services? It's a good idea to ask your team at your next appointment.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 'tip-2',
    type: 'tip',
    title: 'Watch: Real stories from young people 🎬',
    message: "Hear from other young people who've been through transition. Their experiences might help you feel less alone.",
    href: '/videos',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: 'update-1',
    type: 'update',
    title: 'Money & PIP information available 💰',
    message: 'If you receive DLA, you might need to apply for PIP when you turn 16. Learn more about benefits and support.',
    href: '/money',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
]

// Get notification icon by type
export function getNotificationIcon(type: Notification['type']): string {
  switch (type) {
    case 'welcome':
      return '👋'
    case 'reminder':
      return '⏰'
    case 'tip':
      return '💡'
    case 'update':
      return '📣'
    default:
      return '🔔'
  }
}

// Get notification color classes by type
export function getNotificationColors(type: Notification['type']): string {
  switch (type) {
    case 'welcome':
      return 'bg-accent-50 border-accent-200'
    case 'reminder':
      return 'bg-amber-50 border-amber-200'
    case 'tip':
      return 'bg-purple-50 border-purple-200'
    case 'update':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-warm-50 border-warm-200'
  }
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return diffMins <= 1 ? 'Just now' : `${diffMins} mins ago`
  } else if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
  } else if (diffDays < 7) {
    return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`
  } else {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }
}

// Local storage key for read notifications
const READ_NOTIFICATIONS_KEY = 'transition-app-read-notifications'

// Get read notification IDs from localStorage
export function getReadNotificationIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

// Mark a notification as read
export function markNotificationAsRead(id: string): void {
  if (typeof window === 'undefined') return
  const readIds = getReadNotificationIds()
  readIds.add(id)
  localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify([...readIds]))
}

// Mark all notifications as read
export function markAllNotificationsAsRead(notifications: Notification[]): void {
  if (typeof window === 'undefined') return
  const readIds = notifications.map((n) => n.id)
  localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(readIds))
}
