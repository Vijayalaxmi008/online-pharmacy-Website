import handPills from '../assets/images/banners/tab1.png'
import colorPills from '../assets/images/banners/tab2.jpg'
import smileyPills from '../assets/images/banners/tab3.jpg'
import bottlePills from '../assets/images/banners/tab4.jpg'

const BLOG_IMAGES = [handPills, colorPills, smileyPills, bottlePills]

export const blogCategories = [
  'Healthy lifestyle', 'Beauty and care', 'Weight management',
  'How to use medicines effectively', 'Nutrition', 'Vitamins and minerals',
  'Skincare', 'Pregnancy', 'Digestion',
]

export const blogPosts = [
  {
    id: 1,
    title: 'An active life without hot flashes is in your hands',
    excerpt: 'Simple daily habits can help support comfort, energy and wellbeing through natural body changes.',
    tag: 'Healthy lifestyle',
    date: 'July 25',
  },
  {
    id: 2,
    title: 'How hormone balance helps you feel young and confident',
    excerpt: 'Learn why routine care, healthy sleep and timely specialist advice matter for long-term wellbeing.',
    tag: 'Beauty and care',
    date: 'July 25',
  },
  {
    id: 3,
    title: 'How the right nutrition balance supports your goals',
    excerpt: 'Balanced meals, hydration and steady routines make everyday health goals easier to maintain.',
    tag: 'Nutrition',
    date: 'July 20',
  },
  {
    id: 4,
    title: 'Vitamin balance: choosing a supplement for every season',
    excerpt: 'Seasonal needs can change, so it is useful to review your vitamin plan with a healthcare professional.',
    tag: 'Vitamins and minerals',
    date: 'July 18',
  },
  {
    id: 5,
    title: 'Daily energy from morning to night',
    excerpt: 'Small lifestyle changes can improve your routine and help you feel steadier throughout the day.',
    tag: 'Healthy lifestyle',
    date: 'July 14',
  },
  {
    id: 6,
    title: 'How to prepare for pregnancy with confidence',
    excerpt: 'Planning, prenatal vitamins and regular medical guidance can make preparation calmer and clearer.',
    tag: 'Pregnancy',
    date: 'July 10',
  },
  {
    id: 7,
    title: 'What to keep in a young family medicine kit',
    excerpt: 'A thoughtful home kit helps parents respond quickly to common needs while avoiding unnecessary items.',
    tag: 'Pregnancy',
    date: 'July 5',
  },
  {
    id: 8,
    title: 'Active ingredients in dietary supplements',
    excerpt: 'Understanding labels helps you compare supplements and choose products that match your goals.',
    tag: 'Healthy lifestyle',
    date: 'July 1',
  },
].map((post, i) => ({ ...post, image: BLOG_IMAGES[i % BLOG_IMAGES.length] }))

export const relatedPostLinks = [
  'How to keep your energy steady throughout the day',
  'How to take multivitamins: practical questions and answers',
  'Vitamin balance: choosing a supplement for every season',
  'Active ingredients commonly used in dietary supplements',
]
