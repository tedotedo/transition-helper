import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { searchContent, type SearchItem } from '../../data/search-index'

const categoryLabels: Record<SearchItem['category'], string> = {
  page: 'Page',
  resource: 'Resource',
  topic: 'Topic',
  guide: 'Guide',
}

const categoryColors: Record<SearchItem['category'], string> = {
  page: 'bg-primary-100 text-primary-700',
  resource: 'bg-accent-100 text-accent-700',
  topic: 'bg-purple-100 text-purple-700',
  guide: 'bg-blue-100 text-blue-700',
}

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Update search results when query changes
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchContent(query)
      setResults(searchResults.slice(0, 8)) // Limit to 8 results
      setIsOpen(true) // Show dropdown regardless of results
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToResult(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const navigateToResult = (item: SearchItem) => {
    setQuery('')
    setIsOpen(false)
    setResults([])

    // Handle external links
    if (item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }

    // Handle hash navigation for topics
    if (item.href.includes('#')) {
      const [path, hash] = item.href.split('#')
      navigate(path)
      // Scroll to element after navigation
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      navigate(item.href)
    }
  }

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400 pointer-events-none">
        🔍
      </span>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-full bg-warm-50 border border-warm-200 pl-10 pr-4 py-2 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 hover:border-warm-300 transition-colors"
        placeholder={t('search.placeholder')}
        aria-label="Search"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="search-results"
      />

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          id="search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-warm-200 shadow-lg overflow-hidden z-50 animate-fade-in"
        >
          <div className="p-2">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-warm-500">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {results.map((item, index) => (
              <li key={item.id}>
                <button
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => navigateToResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-50'
                      : 'hover:bg-warm-50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-warm-800 truncate">
                        {item.title}
                      </span>
                      <span
                        className={`text-[0.65rem] font-semibold uppercase px-1.5 py-0.5 rounded-full ${
                          categoryColors[item.category]
                        }`}
                      >
                        {categoryLabels[item.category]}
                      </span>
                    </div>
                    <p className="text-xs text-warm-500 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-warm-400 text-sm shrink-0">→</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 border-t border-warm-100 bg-warm-50">
            <p className="text-xs text-warm-500">
              <span className="font-medium">Tip:</span> Use ↑↓ to navigate, Enter to select, Esc to close
            </p>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-warm-200 shadow-lg overflow-hidden z-50 animate-fade-in"
        >
          <div className="px-4 py-6 text-center">
            <span className="text-2xl">🔍</span>
            <p className="mt-2 text-sm text-warm-600">No results found for "{query}"</p>
            <p className="mt-1 text-xs text-warm-500">Try different keywords or check your spelling</p>
          </div>
        </div>
      )}
    </div>
  )
}
