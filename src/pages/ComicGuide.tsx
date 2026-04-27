import { Link } from 'react-router-dom'
import { useState } from 'react'
import ReadAloud from '../components/ReadAloud'

type ComicLanguage = 'en' | 'ur' | 'ar'

const comicTranslations: Record<ComicLanguage, {
  label: string
  dir: 'ltr' | 'rtl'
  back: string
  eyebrow: string
  title: string
  description: string
  supportTitle: string
  supportText: string
  print: string
  mobileTitle: string
  mobileText: string
  plainTextTitle: string
  imageAlt: string
  readIntro: string
  readOutro: string
  panelSummaries: string[]
}> = {
  en: {
    label: 'English',
    dir: 'ltr',
    back: 'Back to My Journey',
    eyebrow: 'Visual guide',
    title: "Zach's transition journey",
    description:
      'A comic-strip version of the transition story for anyone who prefers pictures, short captions, and a friendly overview before using the planning tools.',
    supportTitle: 'Use this when words feel like too much',
    supportText:
      'You can look through it together, pick one panel to talk about, or print it as a conversation starter.',
    print: 'Print / save',
    mobileTitle: 'Mobile comic view',
    mobileText: 'Each panel is shown separately so the words stay readable on a phone.',
    plainTextTitle: 'Plain-text version',
    imageAlt:
      "Comic strip called Zach's Transition Journey explaining eight steps in moving from paediatric to adult medical services: planning early, building skills, shared decisions, smooth transfer, knowing what to expect, support after transfer, voice and feedback, and looking ahead.",
    readIntro:
      "Zach's Transition Journey is a comic guide about moving from paediatric to adult medical services.",
    readOutro:
      'Small steps, your way. You are not just changing services, you are growing into your future.',
    panelSummaries: [
      'Start planning early so the move does not feel sudden.',
      'Build knowledge and practical skills one step at a time.',
      'Share your goals, worries, and what matters to you.',
      'Work with your team so important information follows you.',
      'Learn what adult services may feel like before you arrive.',
      'Ask for help after transfer if things feel hard.',
      'Use your voice and feedback to improve care.',
      'Look ahead with confidence: transition is a journey, not one moment.',
    ],
  },
  ur: {
    label: 'اردو',
    dir: 'rtl',
    back: 'میرے سفر پر واپس جائیں',
    eyebrow: 'تصویری رہنمائی',
    title: 'زیک کا انتقالی سفر',
    description:
      'یہ منتقلی کی کہانی کا مزاحیہ تصویری ورژن ہے۔ یہ ان لوگوں کے لیے ہے جو تصویریں، مختصر جملے، اور منصوبہ بندی شروع کرنے سے پہلے ایک دوستانہ خلاصہ پسند کرتے ہیں۔',
    supportTitle: 'جب بہت زیادہ الفاظ مشکل لگیں تو اسے استعمال کریں',
    supportText:
      'آپ اسے ساتھ مل کر دیکھ سکتے ہیں، بات کرنے کے لیے ایک تصویر چن سکتے ہیں، یا گفتگو شروع کرنے کے لیے اسے پرنٹ کر سکتے ہیں۔',
    print: 'پرنٹ / محفوظ کریں',
    mobileTitle: 'موبائل پر کامک دیکھیں',
    mobileText: 'ہر تصویر الگ دکھائی گئی ہے تاکہ فون پر الفاظ پڑھنا آسان رہے۔',
    plainTextTitle: 'سادہ متن والا ورژن',
    imageAlt:
      'زیک کا انتقالی سفر نامی کامک، جو بچوں کی طبی خدمات سے بالغوں کی طبی خدمات میں جانے کے آٹھ قدم سمجھاتا ہے۔',
    readIntro:
      'زیک کا انتقالی سفر ایک تصویری رہنما ہے۔ یہ بچوں کی طبی خدمات سے بالغوں کی طبی خدمات میں جانے کے بارے میں ہے۔',
    readOutro:
      'چھوٹے قدم، آپ کے اپنے طریقے سے۔ آپ صرف خدمات تبدیل نہیں کر رہے۔ آپ اپنے مستقبل کی طرف بڑھ رہے ہیں۔',
    panelSummaries: [
      'جلد منصوبہ بندی شروع کریں تاکہ تبدیلی اچانک محسوس نہ ہو۔',
      'اپنی معلومات اور عملی مہارتیں آہستہ آہستہ بڑھائیں۔',
      'اپنے مقاصد، پریشانیاں، اور جو باتیں آپ کے لیے اہم ہیں، شیئر کریں۔',
      'اپنی ٹیم کے ساتھ کام کریں تاکہ اہم معلومات آپ کے ساتھ جائیں۔',
      'آنے سے پہلے جان لیں کہ بالغوں کی خدمات کیسی ہو سکتی ہیں۔',
      'منتقلی کے بعد اگر چیزیں مشکل لگیں تو مدد مانگیں۔',
      'اپنی بات اور رائے استعمال کریں تاکہ دیکھ بھال بہتر ہو سکے۔',
      'اعتماد کے ساتھ آگے دیکھیں: منتقلی ایک سفر ہے، صرف ایک لمحہ نہیں۔',
    ],
  },
  ar: {
    label: 'العربية',
    dir: 'rtl',
    back: 'العودة إلى رحلتي',
    eyebrow: 'دليل مصور',
    title: 'رحلة زاك في الانتقال',
    description:
      'نسخة مصورة من قصة الانتقال، لمن يفضل الصور والجمل القصيرة ونظرة عامة ودودة قبل استخدام أدوات التخطيط.',
    supportTitle: 'استخدم هذا عندما تكون الكلمات كثيرة',
    supportText:
      'يمكنكم النظر إليه معا، أو اختيار لوحة واحدة للحديث عنها، أو طباعته لبدء محادثة.',
    print: 'طباعة / حفظ',
    mobileTitle: 'عرض القصة المصورة على الهاتف',
    mobileText: 'تظهر كل لوحة بشكل منفصل حتى تبقى الكلمات سهلة القراءة على الهاتف.',
    plainTextTitle: 'نسخة نصية بسيطة',
    imageAlt:
      'قصة مصورة باسم رحلة زاك في الانتقال تشرح ثماني خطوات للانتقال من خدمات الأطفال الطبية إلى خدمات البالغين.',
    readIntro:
      'رحلة زاك في الانتقال هي دليل مصور عن الانتقال من خدمات الأطفال الطبية إلى خدمات البالغين.',
    readOutro:
      'خطوات صغيرة، بطريقتك. أنت لا تغير الخدمات فقط، بل تنمو نحو مستقبلك.',
    panelSummaries: [
      'ابدأ التخطيط مبكرا حتى لا يكون الانتقال مفاجئا.',
      'ابن معرفتك ومهاراتك العملية خطوة بخطوة.',
      'شارك أهدافك ومخاوفك وما يهمك.',
      'اعمل مع فريقك حتى تنتقل المعلومات المهمة معك.',
      'تعرف على خدمات البالغين قبل أن تصل إليها.',
      'اطلب المساعدة بعد الانتقال إذا شعرت أن الأمور صعبة.',
      'استخدم صوتك وملاحظاتك لتحسين الرعاية.',
      'انظر إلى الأمام بثقة: الانتقال رحلة، وليس لحظة واحدة.',
    ],
  },
}

const panelImages = Array.from({ length: 8 }, (_, index) => ({
  panelNumber: index + 1,
  src: `/comic-panels/zachs-transition-panel-${index + 1}.png`,
}))

export function ComicGuide() {
  const [language, setLanguage] = useState<ComicLanguage>('en')
  const content = comicTranslations[language]
  const readAloudText = [
    content.readIntro,
    ...content.panelSummaries,
    content.readOutro,
  ].join(' ')

  return (
    <div className="space-y-6 animate-fade-in" dir={content.dir} lang={language === 'en' ? 'en-GB' : language}>
      <header className="space-y-4">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>{content.back}</span>
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">{content.eyebrow}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">{content.title}</h1>
            <p className="text-sm md:text-base text-warm-600 leading-relaxed">
              {content.description}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Comic language">
              {(Object.keys(comicTranslations) as ComicLanguage[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
                    language === option
                      ? 'border-accent-700 bg-white text-accent-800 shadow-card ring-2 ring-accent-500'
                      : 'border-warm-200 bg-white text-warm-600 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {comicTranslations[option].label}
                </button>
              ))}
            </div>
            <ReadAloud text={readAloudText} />
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4 md:p-5 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-warm-800">{content.supportTitle}</h2>
            <p className="mt-1 text-sm text-warm-600">
              {content.supportText}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-card hover:shadow-card-hover transition-all print:hidden"
          >
            <span>🖨️</span>
            <span>{content.print}</span>
          </button>
        </div>
      </section>

      <section className="space-y-4 md:hidden print:hidden">
        <div>
          <h2 className="text-base font-semibold text-warm-800">{content.mobileTitle}</h2>
          <p className="mt-1 text-sm text-warm-500">
            {content.mobileText}
          </p>
        </div>
        <div className="space-y-4">
          {panelImages.map((panel) => (
            <article key={panel.panelNumber} className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-card">
              <img
                src={panel.src}
                alt={`${content.title}, ${panel.panelNumber}: ${content.panelSummaries[panel.panelNumber - 1]}`}
                className="w-full"
                loading={panel.panelNumber > 2 ? 'lazy' : 'eager'}
              />
              <div className="border-t border-warm-100 bg-warm-50 px-4 py-3 text-sm text-warm-700">
                <p>{content.panelSummaries[panel.panelNumber - 1]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <figure className="hidden overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-card md:block print:block print:shadow-none">
        <img
          src="/zachs-transition-journey-comic.png"
          alt={content.imageAlt}
          className="w-full"
        />
      </figure>

      <section className="rounded-2xl border border-warm-200 bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-warm-800">{content.plainTextTitle}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {content.panelSummaries.map((summary, index) => (
            <li key={summary} className="flex gap-3 rounded-xl bg-warm-50 px-4 py-3 text-sm text-warm-700">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                {index + 1}
              </span>
              <span>{summary}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
