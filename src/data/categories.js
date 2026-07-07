import { Pill, FlaskConical, Sparkles, Users, Eye, Baby, Stethoscope, PawPrint, Activity } from 'lucide-react'

// Import local category images
import medicinesImg from '../assets/images/Categories/blackLady.png'
import vitaminsImg from '../assets/images/Categories/tab1.png'
import cosmeticsImg from '../assets/images/Categories/ladyModel.png'
import babyImg from '../assets/images/Categories/baby.png'
import equipmentImg from '../assets/images/Categories/tablet.png'
import hygieneImg from '../assets/images/Categories/serum.png'

export const categories = [
  { id: 1, name: 'Medicines', slug: 'medicines', image: medicinesImg },
  { id: 2, name: 'Vitamins and Supplements', slug: 'vitamins', image: vitaminsImg },
  { id: 3, name: 'Beauty', slug: 'cosmetics', image: cosmeticsImg },
  { id: 4, name: 'Mother and Baby', slug: 'baby', image: babyImg },
  { id: 5, name: 'Medical Equipment', slug: 'equipment', image: equipmentImg },
  { id: 6, name: 'Hygiene', slug: 'hygiene', image: hygieneImg },
]

export const mainNavCategories = [
  { name: 'MEDICINES', slug: 'medicines', icon: Pill },
  { name: 'VITAMINS AND SUPPLEMENTS', slug: 'vitamins', icon: FlaskConical },
  { name: 'BEAUTY', slug: 'cosmetics', icon: Sparkles },
  { name: 'HYGIENE', slug: 'hygiene', icon: Users },
  { name: 'LENSES', slug: 'lenses', icon: Eye },
  { name: 'MOTHER AND BABY', slug: 'baby', icon: Baby },
  { name: 'MEDICAL SUPPLIES', slug: 'medical', icon: Stethoscope },
  { name: 'PET SUPPLIES', slug: 'pets', icon: PawPrint },
  { name: 'MEDICAL EQUIPMENT', slug: 'equipment', icon: Activity },
]

export const subNavLinks = [
  'Promotions', 'Discounts', 'COVID-19', 'Allergy', 'Dermocosmetics',
  'Digestion', 'Women\'s health', 'Joints', 'More 52',
]

export const medicineCategories = [
  { name: 'Obstetrics and gynecology', slug: 'obstetrics' },
  { name: 'Allergy', slug: 'allergy' },
  {
    name: 'Anesthesia and intensive care',
    slug: 'anesthesia',
    active: true,
    subcategories: ['Local pain relief', 'Intensive care nutrition', 'Solutions', 'Anesthesia products'],
  },
  { name: 'Antibiotics', slug: 'antibiotics' },
  { name: 'Blood disorders', slug: 'blood' },
  { name: 'Pain and fever', slug: 'pain' },
  { name: 'Hemorrhoids', slug: 'hemorrhoids' },
  { name: 'Eyes', slug: 'eyes' },
  { name: 'Parasites and lice', slug: 'parasites' },
  { name: 'Homeopathy', slug: 'homeopathy' },
  { name: 'Diabetes', slug: 'diabetes' },
  { name: 'Diagnostic products', slug: 'diagnostics' },
  { name: 'Respiratory system', slug: 'respiratory' },
  { name: 'Stomach, intestines and liver', slug: 'gastro' },
  { name: 'Teeth and mouth', slug: 'dental' },
]

export const moreMedicineCategories = [
  'Skin', 'Urinary system', 'Metabolic disorders',
  'Neurology and psychiatry', 'Disinfectants', 'Oncology',
  'Poisoning', 'Nutrition formulas', 'Antiviral products',
  'Antifungal products', 'Other', 'Cardiovascular',
  'Trichomoniasis and malaria', 'Ear, nose and throat', 'Endocrinology',
]

export const diseases = [
  'Allergy', 'Alopecia and hair loss', 'First aid kit', 'Joint conditions',
  'Sinusitis', 'Diabetes', 'Healthy running', 'Vision', 'Excess weight',
  'Heartburn', 'Korean cosmetics', 'Irritated skin',
  'Irritable bowel', 'Sleep and insomnia', 'Stomatitis',
]

export const servicePages = [
  {
    title: 'ONLINE ORDER',
    items: ['Catalog', 'How to place an order', 'Health blog', 'Questions and answers', 'Cart'],
    activeItem: 'Questions and answers',
  },
  {
    title: 'CUSTOMERS',
    items: ['Bonus cards', 'Partners in Europe', 'Gift certificates', 'Rare medicine request', 'Leave a review'],
  },
  {
    title: 'ABOUT THE COMPANY',
    items: ['General information', 'News', 'Articles', 'Pharmacy Service Plus', 'Careers', 'Journal', 'Contacts'],
  },
  {
    title: 'PHARMACIES',
    items: ['Catalog', 'How to place an order', 'Questions and answers', 'Cart'],
  },
  {
    title: 'PARTNERS',
    items: ['Landlords', 'Advertisers', 'Corporate customers'],
  },
  {
    title: 'PROJECTS AND PROMOTIONS',
    items: ['Projects', 'Promotions'],
  },
]

export const partnerLogos = [
  'OTP Bank', 'BNP Paribas', 'QIWI', 'Raiffeisen Bank', 'PayPal', 'MTS Bank',
  'Ziraat Bank', 'Vostochny Bank', 'VTB', 'Severgazbank', 'YooMoney', 'VBRR',
]

export const features = [
  { id: 1, title: 'Assortment', desc: 'Promotions, vitamins, medicines, medical equipment and cosmetics' },
  { id: 2, title: 'Fast delivery', desc: 'Fast delivery to locations across the country' },
  { id: 3, title: 'Quality guarantee', desc: 'All products are certified' },
  { id: 4, title: 'Low prices', desc: 'We work to keep prices affordable for our customers' },
]

export const reviews = [
  { id: 1, name: 'Lena, Moscow', date: 'October 12', rating: 5, text: 'Knowledgeable staff, attentive service and a smooth ordering experience. Delivery was quick and everything arrived in good condition.' },
  { id: 2, name: 'Lena, Moscow', date: 'October 5', rating: 5, text: 'Thank you for the fast delivery. The order arrived complete and well packed.' },
  { id: 3, name: 'Alex', date: 'October 1', rating: 4, text: 'Good service and quick delivery. The convenience is worth it.' },
  { id: 4, name: 'Maria', date: 'September 28', rating: 5, text: 'Very happy with the service. My vitamins arrived quickly and in excellent condition.' },
]

export const howItWorks = [
  { step: 1, title: 'Choose a product', desc: 'Use search to find the product you need' },
  { step: 2, title: 'Choose a pharmacy', desc: 'Select the pickup point that is most convenient for you' },
  { step: 3, title: 'Place your order', desc: 'Follow the steps and complete checkout' },
  { step: 4, title: 'Receive your order', desc: 'Pick up your order at a nearby pharmacy' },
]

export const aboutParagraphs = [
  'The Pharmacy.online network has operated since 2000 and brings together hundreds of pharmacy locations. We work directly with manufacturers and distributors so customers can buy trusted medicines at affordable prices.',
  'Every product in our catalog is supported by quality documentation. We work with verified suppliers and carefully monitor storage and transportation conditions.',
  'You can order medicines online for home delivery or pickup from a nearby pharmacy. Our support team is available every day to help with product selection, alternatives and stock questions.',
]

export const alphabetCategoryGroups = [
  {
    title: 'Medicines', slug: 'medicines',
    items: ['Obstetrics and gynecology', 'Allergy', 'Antibiotics', 'Pain and fever', 'Diabetes', 'Stomach, intestines and liver'],
  },
  {
    title: 'Vitamins and Supplements', slug: 'vitamins',
    items: ['Amino acids', 'Antioxidants', 'Multivitamins', 'Immune supplements', 'Prenatal vitamins', 'Cold season supplements'],
  },
  {
    title: 'Beauty', slug: 'cosmetics',
    items: ['Face care', 'Body care', 'Hair care', 'Sun protection', 'Pharmacy cosmetics', 'Korean cosmetics'],
  },
  {
    title: 'Hygiene', slug: 'hygiene',
    items: ['Shower products', 'Oral care', 'Hygiene pads', 'Diapers', 'Antiseptics', 'Wet wipes'],
  },
  {
    title: 'Mother and Baby', slug: 'baby',
    items: ['Baby food', 'Diapers and changing', 'Baby care', 'Feeding products', 'Toys and development'],
  },
  {
    title: 'Medical Supplies', slug: 'medical',
    items: ['Bandages and plasters', 'Compression wear', 'Orthopedic products', 'Rehabilitation products', 'Medical clothing'],
  },
  {
    title: 'Lenses', slug: 'lenses',
    items: ['Contact lenses', 'Lens solutions', 'Glasses and frames', 'Eye care products'],
  },
  {
    title: 'Pet Supplies', slug: 'pets',
    items: ['Pet vitamins', 'Antiparasitic products', 'Therapeutic food', 'Pet care'],
  },
  {
    title: 'Medical Equipment', slug: 'equipment',
    items: ['Blood pressure monitors', 'Thermometers', 'Nebulizers', 'Glucose meters', 'Rehabilitation equipment'],
  },
]
