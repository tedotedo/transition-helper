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
  panelTextTitle: string
  imageAlt: string
  readIntro: string
  readOutro: string
  panelSummaries: string[]
  panelText: string[][]
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
    panelTextTitle: 'Panel text',
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
    panelText: [
      [
        'Start planning early.',
        'Transition works best when we plan together before you move.',
        "Let's start talking about transition now so you feel ready when the time comes.",
        'When I know the plan, I feel less worried.',
        'Transition plan: learn, prepare, transfer, thrive.',
      ],
      [
        'Build your knowledge and skills.',
        "We'll help you build confidence to manage your health now and in the future.",
        'I am learning about my condition, medicines, appointments and how to speak up for myself.',
        'Life skills: know your health, take medicines, book appointments, understand treatment, make informed choices, ask for help.',
        'Small steps today means more independence tomorrow.',
      ],
      [
        'Shared decision making.',
        'We listen to your goals, worries and what matters most to you.',
        'I want to go to university and travel. I worry about managing my health on my own.',
        "Let's plan around your goals and what is important to you.",
        'It is okay to need support.',
        'We will make reasonable adjustments to help you feel safe and comfortable.',
      ],
      [
        'A smooth transfer.',
        'We coordinate your move to adult services so you have the right information and support.',
        "We'll share a summary of your medical history and what is important about your care.",
        'I like having the information in one place.',
        'Preparation, transfer, continuity of care.',
      ],
      [
        'Know what to expect.',
        "Adult services may feel different. We'll help you know what to expect and where to go.",
        "It's a new place, but I don't have to do it alone.",
        'Different team. New environment. More independence. You are in control.',
        'We can help you find your new clinic, understand how appointments work, and know who to contact if you need help.',
      ],
      [
        'Support beyond transfer.',
        "Our support doesn't stop after you transfer. We are here for the bumps along the way.",
        "I'm having a tough time keeping up.",
        "Let's reach out. There are people who can help.",
        "It is okay to ask for help. You're not alone.",
      ],
      [
        'Your voice matters.',
        'You are at the centre of your care. Your voice, choices and feedback help us improve.',
        "We can share what works, what doesn't, and help shape better services for everyone.",
        'Your experience can inspire change.',
      ],
      [
        'Looking ahead.',
        "Transition is a journey, not a single step. You've got this, and we've got your back.",
        "New chapter. Same strengths. Bright future. Let's go.",
        'Remember: plan early, work together, stay informed, believe in yourself.',
        'You are not just changing services. You are growing into your future. We are here with you, every step of the way.',
      ],
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
    panelTextTitle: 'پینل کا متن',
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
    panelText: [
      [
        'جلد منصوبہ بندی شروع کریں۔',
        'منتقلی اس وقت بہتر ہوتی ہے جب ہم آپ کے منتقل ہونے سے پہلے مل کر منصوبہ بناتے ہیں۔',
        'آئیے ابھی منتقلی کے بارے میں بات شروع کریں تاکہ وقت آنے پر آپ تیار محسوس کریں۔',
        'جب مجھے منصوبہ معلوم ہوتا ہے تو میں کم پریشان محسوس کرتا ہوں۔',
        'منتقلی کا منصوبہ: سیکھیں، تیاری کریں، منتقل ہوں، ترقی کریں۔',
      ],
      [
        'اپنی معلومات اور مہارتیں بڑھائیں۔',
        'ہم آپ کی مدد کریں گے تاکہ آپ ابھی اور مستقبل میں اپنی صحت سنبھالنے کا اعتماد پیدا کریں۔',
        'میں اپنی بیماری، دواؤں، اپائنٹمنٹس، اور اپنے لیے بات کرنے کا طریقہ سیکھ رہا ہوں۔',
        'زندگی کی مہارتیں: اپنی صحت جانیں، دوائیں لیں، اپائنٹمنٹ بک کریں، علاج سمجھیں، سوچ سمجھ کر فیصلے کریں، مدد مانگیں۔',
        'آج کے چھوٹے قدم، کل زیادہ خود مختاری۔',
      ],
      [
        'مل کر فیصلے کرنا۔',
        'ہم آپ کے مقاصد، پریشانیوں، اور جو باتیں آپ کے لیے سب سے اہم ہیں، سنتے ہیں۔',
        'میں یونیورسٹی جانا اور سفر کرنا چاہتا ہوں۔ مجھے فکر ہے کہ میں اپنی صحت اکیلا کیسے سنبھالوں گا۔',
        'آئیے آپ کے مقاصد اور اہم باتوں کے مطابق منصوبہ بنائیں۔',
        'مدد کی ضرورت ہونا ٹھیک ہے۔',
        'ہم مناسب تبدیلیاں کریں گے تاکہ آپ محفوظ اور آرام دہ محسوس کریں۔',
      ],
      [
        'آسان منتقلی۔',
        'ہم آپ کی بالغوں کی خدمات میں منتقلی کو منظم کرتے ہیں تاکہ درست معلومات اور مدد آپ کے ساتھ ہوں۔',
        'ہم آپ کی طبی تاریخ اور آپ کی دیکھ بھال کی اہم باتوں کا خلاصہ شیئر کریں گے۔',
        'مجھے اچھا لگتا ہے کہ معلومات ایک جگہ پر ہیں۔',
        'تیاری، منتقلی، دیکھ بھال کا تسلسل۔',
      ],
      [
        'جانیں کہ کیا توقع رکھنی ہے۔',
        'بالغوں کی خدمات مختلف محسوس ہو سکتی ہیں۔ ہم آپ کو بتائیں گے کہ کیا توقع رکھنی ہے اور کہاں جانا ہے۔',
        'یہ نئی جگہ ہے، لیکن مجھے اکیلے نہیں کرنا پڑے گا۔',
        'مختلف ٹیم۔ نیا ماحول۔ زیادہ خود مختاری۔ اختیار آپ کے پاس ہے۔',
        'ہم آپ کی نئی کلینک تلاش کرنے، اپائنٹمنٹ کا طریقہ سمجھنے، اور ضرورت پڑنے پر رابطہ کرنے والے شخص کو جاننے میں مدد کر سکتے ہیں۔',
      ],
      [
        'منتقلی کے بعد بھی مدد۔',
        'ہماری مدد منتقلی کے بعد ختم نہیں ہوتی۔ مشکل وقت میں بھی ہم آپ کے ساتھ ہیں۔',
        'مجھے ساتھ ساتھ چلنے میں مشکل ہو رہی ہے۔',
        'آئیے مدد مانگتے ہیں۔ ایسے لوگ ہیں جو مدد کر سکتے ہیں۔',
        'مدد مانگنا ٹھیک ہے۔ آپ اکیلے نہیں ہیں۔',
      ],
      [
        'آپ کی آواز اہم ہے۔',
        'آپ اپنی دیکھ بھال کے مرکز میں ہیں۔ آپ کی آواز، پسند، اور رائے خدمات کو بہتر بنانے میں مدد دیتی ہیں۔',
        'ہم بتا سکتے ہیں کہ کیا اچھا کام کرتا ہے اور کیا نہیں، تاکہ سب کے لیے بہتر خدمات بن سکیں۔',
        'آپ کا تجربہ تبدیلی لا سکتا ہے۔',
      ],
      [
        'آگے دیکھنا۔',
        'منتقلی ایک سفر ہے، صرف ایک قدم نہیں۔ آپ یہ کر سکتے ہیں، اور ہم آپ کے ساتھ ہیں۔',
        'نیا باب۔ وہی طاقتیں۔ روشن مستقبل۔ چلیں۔',
        'یاد رکھیں: جلد منصوبہ بنائیں، مل کر کام کریں، باخبر رہیں، خود پر یقین رکھیں۔',
        'آپ صرف خدمات تبدیل نہیں کر رہے۔ آپ اپنے مستقبل کی طرف بڑھ رہے ہیں۔ ہم ہر قدم پر آپ کے ساتھ ہیں۔',
      ],
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
    panelTextTitle: 'نص اللوحة',
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
    panelText: [
      [
        'ابدأ التخطيط مبكرا.',
        'تنجح مرحلة الانتقال بشكل أفضل عندما نخطط معا قبل أن تنتقل.',
        'لنبدأ الحديث عن الانتقال الآن حتى تشعر بالاستعداد عندما يحين الوقت.',
        'عندما أعرف الخطة أشعر بقلق أقل.',
        'خطة الانتقال: تعلم، استعد، انتقل، وازدهر.',
      ],
      [
        'ابن معرفتك ومهاراتك.',
        'سنساعدك على بناء الثقة لإدارة صحتك الآن وفي المستقبل.',
        'أنا أتعلم عن حالتي، وأدويتي، ومواعيدي، وكيف أتحدث عن احتياجاتي.',
        'مهارات الحياة: اعرف صحتك، خذ أدويتك، احجز المواعيد، افهم العلاج، اتخذ قرارات واعية، واطلب المساعدة.',
        'خطوات صغيرة اليوم تعني استقلالا أكبر غدا.',
      ],
      [
        'اتخاذ القرار معا.',
        'نستمع إلى أهدافك ومخاوفك وما يهمك أكثر.',
        'أريد الذهاب إلى الجامعة والسفر. أقلق من إدارة صحتي وحدي.',
        'لنخطط حول أهدافك وما هو مهم لك.',
        'من المقبول أن تحتاج إلى دعم.',
        'سنقوم بتعديلات معقولة لمساعدتك على الشعور بالأمان والراحة.',
      ],
      [
        'انتقال سلس.',
        'ننسق انتقالك إلى خدمات البالغين حتى تكون لديك المعلومات والدعم المناسبان.',
        'سنشارك ملخصا لتاريخك الطبي وما هو مهم في رعايتك.',
        'أحب أن تكون المعلومات في مكان واحد.',
        'التحضير، الانتقال، استمرارية الرعاية.',
      ],
      [
        'اعرف ما يمكن توقعه.',
        'قد تبدو خدمات البالغين مختلفة. سنساعدك على معرفة ما تتوقعه وأين تذهب.',
        'إنه مكان جديد، لكنني لست مضطرا أن أفعل ذلك وحدي.',
        'فريق مختلف. بيئة جديدة. استقلالية أكثر. أنت صاحب القرار.',
        'يمكننا مساعدتك في العثور على عيادتك الجديدة، وفهم طريقة المواعيد، ومعرفة من تتصل به إذا احتجت إلى مساعدة.',
      ],
      [
        'الدعم بعد الانتقال.',
        'دعمنا لا يتوقف بعد انتقالك. نحن هنا عندما تصبح الأمور صعبة.',
        'أجد صعوبة في المتابعة.',
        'لنتواصل مع الآخرين. هناك أشخاص يمكنهم المساعدة.',
        'لا بأس أن تطلب المساعدة. أنت لست وحدك.',
      ],
      [
        'صوتك مهم.',
        'أنت في مركز رعايتك. صوتك وخياراتك وملاحظاتك تساعدنا على التحسين.',
        'يمكننا مشاركة ما ينجح وما لا ينجح، والمساعدة في تشكيل خدمات أفضل للجميع.',
        'تجربتك يمكن أن تلهم التغيير.',
      ],
      [
        'النظر إلى الأمام.',
        'الانتقال رحلة، وليس خطوة واحدة. يمكنك فعل ذلك، ونحن ندعمك.',
        'فصل جديد. نفس نقاط القوة. مستقبل مشرق. لننطلق.',
        'تذكر: خطط مبكرا، اعملوا معا، ابق على اطلاع، وآمن بنفسك.',
        'أنت لا تغير الخدمات فقط. أنت تنمو نحو مستقبلك. نحن معك في كل خطوة.',
      ],
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
    ...content.panelText.flat(),
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
                <div className="mt-3 rounded-xl bg-white px-3 py-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-warm-500">{content.panelTextTitle}</h3>
                  <ul className="mt-2 space-y-1">
                    {content.panelText[panel.panelNumber - 1].map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
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

      <section className="rounded-2xl border border-warm-200 bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-warm-800">{content.panelTextTitle}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.panelText.map((lines, index) => (
            <article key={index} className="rounded-xl bg-warm-50 px-4 py-3 text-sm text-warm-700">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-warm-800">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  {index + 1}
                </span>
                <span>{content.panelSummaries[index]}</span>
              </h3>
              <ul className="space-y-1">
                {lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
