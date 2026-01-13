import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  defaultNotifications,
  getNotificationIcon,
  getNotificationColors,
  formatRelativeTime,
  getReadNotificationIds,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  type Notification,
} from '../../data/notifications'

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [notifications] = useState<Notification[]>(defaultNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()

  // Load read state on mount
  useEffect(() => {
    setReadIds(getReadNotificationIds())
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    markNotificationAsRead(notification.id)
    setReadIds((prev) => new Set([...prev, notification.id]))

    // Navigate if there's a link
    if (notification.href) {
      setIsOpen(false)
      navigate(notification.href)
    }
  }

  // Handle mark all as read
  const handleMarkAllRead = () => {
    markAllNotificationsAsRead(notifications)
    setReadIds(new Set(notifications.map((n) => n.id)))
  }

  // Sort notifications by date (newest first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-200 bg-white hover:bg-warm-50 hover:border-primary-300 transition-all hover:shadow-card"
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Notifications</span>
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-1.5 text-[0.65rem] font-bold text-white shadow-sm">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-warm-200 shadow-lg overflow-hidden z-50 animate-fade-in"
          role="menu"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-warm-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-warm-800">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-warm-500">
                  {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto">
            {sortedNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <span className="text-3xl">🔔</span>
                <p className="mt-2 text-sm text-warm-600">No notifications yet</p>
              </div>
            ) : (
              <ul>
                {sortedNotifications.map((notification) => {
                  const isRead = readIds.has(notification.id)
                  return (
                    <li key={notification.id}>
                      <button
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left px-4 py-3 border-b border-warm-50 transition-colors hover:bg-warm-50 ${
                          !isRead ? 'bg-primary-50/30' : ''
                        }`}
                        role="menuitem"
                      >
                        <div className="flex gap-3">
                          <div
                            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${getNotificationColors(
                              notification.type
                            )}`}
                          >
                            <span className="text-lg">
                              {getNotificationIcon(notification.type)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-sm ${
                                  isRead
                                    ? 'text-warm-700'
                                    : 'font-semibold text-warm-800'
                                } line-clamp-1`}
                              >
                                {notification.title}
                              </p>
                              {!isRead && (
                                <span className="shrink-0 w-2 h-2 rounded-full bg-primary-500 mt-1.5" />
                              )}
                            </div>
                            <p className="text-xs text-warm-500 mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-[0.65rem] text-warm-400 mt-1">
                              {formatRelativeTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                        {notification.href && (
                          <span className="sr-only">
                            Click to navigate to {notification.href}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-warm-100 bg-warm-50">
            <p className="text-xs text-warm-500 text-center">
              Stay up to date with your transition journey
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
