import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import QuestionsCTA from './components/QuestionsCTA'
import HealthBlogSection from './components/HealthBlogSection'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Beauty from './pages/Beauty'
import Hygiene from './pages/Hygiene'
import Lenses from './pages/Lenses'
import MotherAndBaby from './pages/MotherAndBaby'
import MedicalSupplies from './pages/MedicalSupplies'
import PetSupplies from './pages/PetSupplies'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Favorites from './pages/Favorites'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Feedback from './pages/Feedback'
import Reviews from './pages/Reviews'
import Advertising from './pages/Advertising'
import Delivery from './pages/DeliveryPickup'
import Payment from './pages/Payment'
import License from './pages/License'
import Privacy from './pages/Privacy'
import AlphabetSearch from './pages/AlphabetSearch'
import Vitamins from './pages/Vitamins'
import StaticText from './pages/StaticText'
import MedEquipment from './pages/MedEquipment'
import NotFound from './pages/NotFound'

const WINDOWS_1252_BYTES = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
  0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
  0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
  0x017E: 0x9E, 0x0178: 0x9F,
}

const needsTextRepair = (value = '') => /[ÐÑÂâð]/.test(value)

const repairMojibake = (value = '') => {
  if (!needsTextRepair(value) || !window.TextDecoder) return value
  const bytes = []

  for (const char of value) {
    const code = char.charCodeAt(0)
    const byte = code <= 0xff ? code : WINDOWS_1252_BYTES[code]
    if (byte === undefined) return value
    bytes.push(byte)
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes))
  } catch {
    return value
  }
}

const repairVisibleText = (root = document.body) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const attributes = ['placeholder', 'alt', 'title', 'aria-label']
  const textNodes = []

  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((node) => {
    const fixed = repairMojibake(node.nodeValue)
    if (fixed !== node.nodeValue) node.nodeValue = fixed
  })

  root.querySelectorAll?.('*').forEach((element) => {
    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return
      const fixed = repairMojibake(value)
      if (fixed !== value) element.setAttribute(attribute, fixed)
    })
  })
}

function AppLayout() {
  const location = useLocation()
  const hideGlobalHealthBlog = [
    '/Mother-&-Child',
    '/mother-and-baby',
    '/Lenses',
    '/lenses',
    '/med-supplies',
    '/medical-supplies',
    '/pet-products',
    '/pet-supplies',
    '/med-equipment',
    '/medical-equipment',
  ].includes(location.pathname)

  useEffect(() => {
    // Reset scroll position on every route change so the new page opens
    // at the top (header/content) instead of staying at the previous
    // scroll position (which could leave only the footer visible).
    window.scrollTo(0, 0)

    repairVisibleText()
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          const fixed = repairMojibake(mutation.target.nodeValue)
          if (fixed !== mutation.target.nodeValue) mutation.target.nodeValue = fixed
          return
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const fixed = repairMojibake(node.nodeValue)
            if (fixed !== node.nodeValue) node.nodeValue = fixed
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            repairVisibleText(node)
          }
        })
      })
    })

    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/Beauty" element={<Beauty />} />
          <Route path="/hygiene" element={<Hygiene />} />
          <Route path="/Hygiene" element={<Hygiene />} />
          <Route path="/lenses" element={<Lenses />} />
          <Route path="/Lenses" element={<Lenses />} />
          <Route path="/mother-and-baby" element={<MotherAndBaby />} />
          <Route path="/Mother-&-Child" element={<MotherAndBaby />} />
          <Route path="/medical-supplies" element={<MedicalSupplies />} />
          <Route path="/med-supplies" element={<MedicalSupplies />} />
          <Route path="/medical-equipment" element={<MedEquipment />} />
          <Route path="/med-equipment" element={<MedEquipment />} />
          <Route path="/pet-supplies" element={<PetSupplies />} />
          <Route path="/pet-products" element={<PetSupplies />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/license" element={<License />} />
          <Route path="/alphabet" element={<AlphabetSearch />} />
          <Route path="/vitamins" element={<Vitamins />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<StaticText title="Terms of Use" />} />
          <Route
            path="/franchise"
            element={
              <StaticText
                title="Franchise"
                paragraphs={[
                  'We offer our partners a ready-made social pharmacy model: a recognizable brand, proven business processes, staff training, and support at every stage of launch.',
                  'The franchise package includes help choosing a location, direct supply of products from manufacturers and distributors, and marketing support.',
                  'To receive a franchise presentation and discuss the terms of cooperation, write to info@restoll.ru or call 8-800-777-22-33.',
                ]}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideGlobalHealthBlog && <HealthBlogSection />}
      <QuestionsCTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
