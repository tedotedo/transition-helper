# Bilingual Implementation Plan: English + Urdu

**Target:** Complete English/Urdu bilingual support for Transition Ready
**Date:** January 2026
**Status:** Planning Phase

---

## 1. Why Urdu?

Based on Census 2021 data for Middlesbrough and Stockton:

| Community | Population % | Notes |
|-----------|--------------|-------|
| **Pakistani** | **6.2%** | Largest ethnic minority |
| Muslim population | 10.22% | Many Urdu speakers |
| Born outside UK | 12.29% | Significant immigrant population |

**Urdu is the clear choice** as the primary ethnic language - it serves the largest minority community and is widely understood across South Asian Muslim communities.

---

## 2. Complete Translation Inventory

### 2.1 Navigation & Layout (`AppShell.tsx`)

| English | Urdu | Location |
|---------|------|----------|
| Home | ہوم | Sidebar, bottom nav |
| Checklist | چیک لسٹ | Sidebar, bottom nav |
| Appointments | ملاقاتیں | Sidebar |
| Care Plan | نگہداشت کا منصوبہ | Sidebar, bottom nav |
| Care Team | نگہداشت ٹیم | Sidebar, bottom nav |
| My Journey | میرا سفر | Sidebar |
| Know Your Rights | اپنے حقوق جانیں | Sidebar |
| Level Up | لیول اپ | Sidebar |
| Skills Builder | مہارت ساز | Sidebar |
| Q&A | سوال و جواب | Sidebar |
| Resources | وسائل | Sidebar |
| Videos & Stories | ویڈیوز اور کہانیاں | Sidebar |
| About | تعارف | Sidebar |
| Privacy | رازداری | Sidebar |
| More | مزید | Bottom nav |
| Search | تلاش کریں | Header |
| Search pages, topics... | صفحات، موضوعات تلاش کریں... | Search placeholder |

### 2.2 Role Toggle & Selection

| English | Urdu |
|---------|------|
| Viewing as: | دیکھ رہے ہیں بطور: |
| Young person | نوجوان |
| Parent/Carer | والدین/نگہداشت کرنے والے |
| I'm a young person | میں ایک نوجوان ہوں |
| I'm a parent or carer | میں والدین یا نگہداشت کرنے والا ہوں |
| I'm getting ready for adult healthcare | میں بالغ صحت کی دیکھ بھال کے لیے تیار ہو رہا ہوں |
| I'm supporting someone through transition | میں کسی کی منتقلی میں مدد کر رہا ہوں |

### 2.3 Home Page Content

| English | Urdu |
|---------|------|
| Welcome to Transition Ready | ٹرانزیشن ریڈی میں خوش آمدید |
| Your move to adult healthcare | بالغ صحت کی دیکھ بھال کی طرف آپ کا سفر |
| Your Health, Your Future | آپ کی صحت، آپ کا مستقبل |
| Hey, welcome back! | واپسی پر خوش آمدید! |
| Take charge of your healthcare journey | اپنے صحت کے سفر کا چارج لیں |
| Supporting Their Journey | ان کے سفر میں مدد |
| Start Your Journey | اپنا سفر شروع کریں |
| Know Your Rights | اپنے حقوق جانیں |
| Quick Actions | فوری اقدامات |
| Your Progress | آپ کی پیشرفت |
| Current Stage | موجودہ مرحلہ |
| tasks completed | کام مکمل |
| Tip of the Day | آج کی تجویز |
| Back up your data | اپنا ڈیٹا محفوظ کریں |
| Download backup | بیک اپ ڈاؤن لوڈ کریں |
| Restore from backup | بیک اپ سے بحال کریں |
| Last backup: | آخری بیک اپ: |

### 2.4 Stage Names

| English | Urdu |
|---------|------|
| Ready | تیار |
| Steady | مستحکم |
| Go | چلو |
| Hello Adult Services | بالغ خدمات میں خوش آمدید |

### 2.5 Common Buttons & Actions

| English | Urdu |
|---------|------|
| Back | واپس |
| Back to Home | ہوم پر واپس |
| Save | محفوظ کریں |
| Cancel | منسوخ |
| Edit | ترمیم |
| Delete | حذف کریں |
| Add | شامل کریں |
| Remove | ہٹائیں |
| Close | بند کریں |
| Next | اگلا |
| Previous | پچھلا |
| Done | مکمل |
| Start | شروع کریں |
| Continue | جاری رکھیں |
| Learn more | مزید جانیں |
| See all | سب دیکھیں |
| Explore | دریافت کریں |
| Coming soon | جلد آ رہا ہے |
| Yes | ہاں |
| No | نہیں |
| OK | ٹھیک ہے |

### 2.6 Checklist Page

| English | Urdu |
|---------|------|
| Transition Checklist | منتقلی چیک لسٹ |
| Track your progress | اپنی پیشرفت دیکھیں |
| Ready (11-13) | تیار (11-13) |
| Steady (14-15) | مستحکم (14-15) |
| Go (16-17) | چلو (16-17) |
| Adult (18+) | بالغ (18+) |
| Mark as complete | مکمل کریں |
| Completed | مکمل ہو گیا |

### 2.7 Care Plan Page

| English | Urdu |
|---------|------|
| My Care Plan | میرا نگہداشت منصوبہ |
| Personal details | ذاتی تفصیلات |
| My conditions | میری بیماریاں |
| My medications | میری دوائیں |
| Allergies | الرجیاں |
| Emergency contacts | ہنگامی رابطے |
| Print my care plan | میرا نگہداشت منصوبہ پرنٹ کریں |
| Name | نام |
| Date of birth | تاریخ پیدائش |
| NHS number | NHS نمبر |
| Address | پتہ |
| Phone | فون |
| Email | ای میل |

### 2.8 Care Team Page

| English | Urdu |
|---------|------|
| My Care Team | میری نگہداشت ٹیم |
| Add team member | ٹیم ممبر شامل کریں |
| Role | کردار |
| Hospital/Clinic | ہسپتال/کلینک |
| Contact details | رابطے کی تفصیلات |

### 2.9 Appointments Page

| English | Urdu |
|---------|------|
| My Appointments | میری ملاقاتیں |
| Add appointment | ملاقات شامل کریں |
| Date | تاریخ |
| Time | وقت |
| Location | مقام |
| Questions to ask | پوچھنے کے سوالات |
| Notes | نوٹس |
| Upcoming | آنے والی |
| Past | گزشتہ |

### 2.10 Rights Hub Page

| English | Urdu |
|---------|------|
| Know Your Rights | اپنے حقوق جانیں |
| Your body, your choices | آپ کا جسم، آپ کے فیصلے |
| Consent | رضامندی |
| Confidentiality | رازداری |
| Making decisions | فیصلے کرنا |
| Under 16 | 16 سے کم عمر |
| 16-17 years | 16-17 سال |
| 18 and over | 18 اور اس سے زیادہ |

### 2.11 Level Up Game

| English | Urdu |
|---------|------|
| Level Up | لیول اپ |
| Your transition superpowers | آپ کی منتقلی کی سپر پاورز |
| Myth Busters | افسانے توڑیں |
| Power-Ups | پاور اپس |
| My Badges | میرے بیجز |
| Flip to reveal | پلٹائیں |
| Myth | افسانہ |
| Fact | حقیقت |
| Badge earned! | بیج ملا! |
| Keep going! | جاری رکھیں! |

### 2.12 Skills Builder Page

| English | Urdu |
|---------|------|
| Skills Builder | مہارت ساز |
| Practice real-life skills | حقیقی مہارتیں سیکھیں |
| Getting Started | شروعات |
| Building Confidence | اعتماد بنانا |
| Ready for Anything | ہر چیز کے لیے تیار |
| I've practiced this! | میں نے یہ سیکھ لیا! |
| Tips | تجاویز |
| Example | مثال |

### 2.13 Q&A Page

| English | Urdu |
|---------|------|
| Questions & Answers | سوالات اور جوابات |
| Common questions about transition | منتقلی کے بارے میں عام سوالات |
| The Basics | بنیادی باتیں |
| Appointments & Care | ملاقاتیں اور دیکھ بھال |
| Your Rights | آپ کے حقوق |
| Common Worries | عام فکریں |

### 2.14 Resources Page

| English | Urdu |
|---------|------|
| Resources | وسائل |
| Ready Steady Go questionnaires | ریڈی سٹیڈی گو سوالنامے |
| Download PDF | PDF ڈاؤن لوڈ کریں |
| View online | آن لائن دیکھیں |
| Easy Read version | آسان پڑھنے والا ورژن |

### 2.15 About Page

| English | Urdu |
|---------|------|
| About Transition Ready | ٹرانزیشن ریڈی کے بارے میں |
| Created by | بنایا گیا |
| Our mission | ہمارا مقصد |
| Acknowledgements | تسلیم نامہ |
| Contact us | ہم سے رابطہ کریں |

### 2.16 Feedback Modal

| English | Urdu |
|---------|------|
| Send Feedback | رائے بھیجیں |
| Help make the app even better! | ایپ کو بہتر بنانے میں مدد کریں! |
| Your message | آپ کا پیغام |
| Your email (optional) | آپ کا ای میل (اختیاری) |
| Send | بھیجیں |
| Thank you for your feedback! | آپ کی رائے کا شکریہ! |

### 2.17 Footer & Disclaimers

| English | Urdu |
|---------|------|
| This app gives general information for the UK. It does not replace medical or legal advice. | یہ ایپ برطانیہ کے لیے عمومی معلومات دیتی ہے۔ یہ طبی یا قانونی مشورے کی جگہ نہیں لیتی۔ |
| Privacy & Disclaimer | رازداری اور دستبرداری |
| Transition checklist adapted from Ready Steady Go by Dr Arvind Nagra, University Hospital Southampton NHS Foundation Trust. | منتقلی چیک لسٹ ڈاکٹر اروند ناگرا، یونیورسٹی ہسپتال ساؤتھمپٹن NHS فاؤنڈیشن ٹرسٹ کی ریڈی سٹیڈی گو سے اخذ کی گئی ہے۔ |

### 2.18 Privacy Page Content

| English | Urdu |
|---------|------|
| Privacy & Disclaimer | رازداری اور دستبرداری |
| Medical Disclaimer | طبی دستبرداری |
| This app is for educational purposes only | یہ ایپ صرف تعلیمی مقاصد کے لیے ہے |
| Not medical advice | طبی مشورہ نہیں |
| Always consult your doctor | ہمیشہ اپنے ڈاکٹر سے مشورہ کریں |
| In an emergency, call 999 | ہنگامی صورت میں 999 کال کریں |
| Privacy Notice | رازداری کا نوٹس |
| Your data stays on your device | آپ کا ڈیٹا آپ کے آلے پر رہتا ہے |
| We don't collect personal information | ہم ذاتی معلومات جمع نہیں کرتے |
| Cookie Notice | کوکی نوٹس |
| We don't use cookies | ہم کوکیز استعمال نہیں کرتے |
| Your Rights | آپ کے حقوق |
| UK GDPR | برطانیہ GDPR |

### 2.19 Easy Read Toggle

| English | Urdu |
|---------|------|
| Easy Read Mode | آسان پڑھنے کا موڈ |
| Simpler words, bigger buttons, more pictures | آسان الفاظ، بڑے بٹن، زیادہ تصاویر |
| Easy Read is ON | آسان پڑھنا آن ہے |

### 2.20 Error & Status Messages

| English | Urdu |
|---------|------|
| Loading... | لوڈ ہو رہا ہے... |
| Something went wrong | کچھ غلط ہو گیا |
| Please try again | براہ کرم دوبارہ کوشش کریں |
| No results found | کوئی نتیجہ نہیں ملا |
| Saved! | محفوظ ہو گیا! |
| Deleted | حذف ہو گیا |

---

## 3. Technical Implementation

### 3.1 Library Choice
**react-i18next** - Industry standard, excellent RTL support

### 3.2 File Structure
```
src/
├── i18n/
│   ├── index.ts          # i18n configuration
│   └── locales/
│       ├── en.json       # All English strings
│       └── ur.json       # All Urdu strings
```

### 3.3 RTL Support for Urdu
Urdu is read right-to-left. Required:
- `dir="rtl"` on document when Urdu selected
- CSS for flipped layouts
- Tailwind RTL plugin
- Noto Nastaliq Urdu font for proper display

### 3.4 Language Switcher
Simple dropdown in header:
- 🇬🇧 English
- 🇵🇰 اردو (Urdu)

Store selection in localStorage.

---

## 4. Implementation Phases

### Phase 1: Setup (1-2 hours)
- [ ] Install react-i18next
- [ ] Configure i18n with language detection
- [ ] Create en.json with all English strings
- [ ] Add language switcher component

### Phase 2: Urdu Translation (2-3 hours)
- [ ] Create ur.json with all translations
- [ ] Implement RTL CSS support
- [ ] Add Noto Nastaliq Urdu font

### Phase 3: Integration (2-3 hours)
- [ ] Update AppShell navigation
- [ ] Update Home page
- [ ] Update all other pages
- [ ] Update disclaimers and footer

### Phase 4: Testing (1-2 hours)
- [ ] Test all pages in both languages
- [ ] Test RTL layout
- [ ] Test on mobile
- [ ] Community review of Urdu translations

---

## 5. Urdu Translation Notes

### Font Choice
**Noto Nastaliq Urdu** - Google's free font designed specifically for Urdu's Nastaliq script style.

### Cultural Considerations
- Use formal/respectful language appropriate for healthcare
- Keep medical terms simple and understandable
- Consider that some users may be more comfortable with spoken Urdu than written

### Translation Quality
- Translations should be reviewed by native Urdu speakers
- Consider partnering with local community organizations for review
- Middlesbrough has established Pakistani community centers that could help

---

## 6. Estimated Timeline

| Phase | Time |
|-------|------|
| Setup | 1-2 hours |
| Translation | 2-3 hours |
| Integration | 2-3 hours |
| Testing | 1-2 hours |
| **Total** | **6-10 hours** |

---

## 7. Success Metrics

- [ ] All UI text translates correctly
- [ ] RTL layout works properly
- [ ] Language preference persists
- [ ] No English text visible when Urdu selected
- [ ] Urdu text is readable and appropriate
- [ ] Mobile layout works in both languages
