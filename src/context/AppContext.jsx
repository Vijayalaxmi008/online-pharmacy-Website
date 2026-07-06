import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [city, setCity] = useState(() => localStorage.getItem('city') || 'Москва и область')
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => { localStorage.setItem('city', city) }, [city])
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)) }, [users])

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id])
  }

  const logout = () => setUser(null)

  return (
    <AppContext.Provider value={{ city, setCity, user, setUser, favorites, toggleFavorite, users, setUsers, logout }}>
      {children}
    </AppContext.Provider>
  )
}
