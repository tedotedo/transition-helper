import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'
import { successStories } from '../data/success-stories'

const stageColors: Record<string, string> = {
  'Getting Started': 'bg-green-100 text-green-800 border-green-200',
  'Building Skills': 'bg-amber-100 text-amber-800 border-amber-200',
  'Almost There': 'bg-blue-100 text-blue-800 border-blue-200',
  'All Stages': 'bg-purple-100 text-purple-800 border-purple-200',
}

export function VideosStories() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Videos & Stories</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Real stories from young people 🎬</h1>
        <p className="max-w-2xl text-sm md:text-base text-warm-600 leading-relaxed">
          Watch and listen to real young people sharing their experiences of transitioning to adult care.
          Every journey is unique, and these stories show there's no single "right way" to transition.
        </p>
        <div className="mt-2"><ReadAloud text="Watch and listen to real young people sharing their experiences of transitioning to adult care. Every journey is unique, and these stories show there's no single right way to transition." /></div>
      </header>

      {/* Info Banners */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">👥</span>
            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Regional Information</h3>
              <p className="text-sm text-warm-600">
                Although some of the information in these videos relates to different parts of the country,
                much of the information may be relevant to your local health services. Please speak to your
                paediatrician or general practitioner if you have particular questions about your local
                transition process.
              </p>
              <div className="mt-2"><ReadAloud text="Although some of the information in these videos relates to different parts of the country, much of the information may be relevant to your local health services. Please speak to your paediatrician or general practitioner if you have particular questions about your local transition process." /></div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">💚</span>
            <div>
              <h3 className="font-semibold text-warm-800 mb-1">These are real stories from young people</h3>
              <p className="text-sm text-warm-600">
                All videos have been created with consent and professional safeguarding oversight. Names may
                have been changed to protect privacy. These young people wanted to share their experiences
                to help others feel less alone.
              </p>
              <div className="mt-2"><ReadAloud text="All videos have been created with consent and professional safeguarding oversight. Names may have been changed to protect privacy. These young people wanted to share their experiences to help others feel less alone." /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {successStories.map((story) => (
          <div
            key={story.id}
            className="group rounded-2xl border border-warm-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Video Thumbnail/Embed */}
            <div className="relative aspect-video bg-warm-100">
              {playingVideo === story.id ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${story.youtubeId}?autoplay=1`}
                  title={story.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${story.youtubeId}/maxresdefault.jpg`}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => setPlayingVideo(story.id)}
                      className="w-14 h-14 rounded-full bg-white hover:bg-white/90 text-primary-500 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    >
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <span>🕐</span>
                    {story.duration}
                  </div>
                </>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-2 flex-wrap">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${stageColors[story.stage]}`}
                >
                  {story.stage}
                </span>
                {story.age !== 'Parent' && (
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium border border-warm-200 bg-warm-50 text-warm-700">
                    Age {story.age}
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-warm-800 mb-2 group-hover:text-primary-600 transition-colors">
                {story.title}
              </h3>

              <p className="text-sm text-warm-600 mb-2">{story.description}</p>

              <p className="text-xs text-warm-500">{story.condition}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-accent-50 px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-warm-800 mb-3">Ready to Start Your Journey? 🚀</h2>
        <p className="text-sm text-warm-600 mb-6 max-w-2xl mx-auto">
          These stories show that transition is possible and you're not alone. Check out the journey
          stages to see where you are in your transition.
        </p>
        <div className="mt-2"><ReadAloud text="These stories show that transition is possible and you are not alone. Check out the journey stages to see where you are in your transition." /></div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/journey"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-card border border-primary-400"
          >
            View My Journey
          </Link>
          <Link
            to="/planning"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-warm-300 bg-white text-warm-700 font-medium hover:bg-warm-50 transition-colors"
          >
            Planning Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
