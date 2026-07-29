import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  isOwnerAuthConfigured,
  isOwnerLoggedIn,
  loginOwner,
  logoutOwner,
} from '../utils/ownerAuth'

const OwnerAuthContext = createContext(null)

export function OwnerAuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => isOwnerLoggedIn())

  const login = useCallback((password) => {
    const result = loginOwner(password)
    if (result.ok) setLoggedIn(true)
    return result
  }, [])

  const logout = useCallback(() => {
    logoutOwner()
    setLoggedIn(false)
  }, [])

  const value = useMemo(
    () => ({
      loggedIn,
      adminConfigured: isOwnerAuthConfigured(),
      login,
      logout,
    }),
    [loggedIn, login, logout],
  )

  return <OwnerAuthContext.Provider value={value}>{children}</OwnerAuthContext.Provider>
}

export function useOwnerAuth() {
  const ctx = useContext(OwnerAuthContext)
  if (!ctx) {
    throw new Error('useOwnerAuth duhet brenda OwnerAuthProvider')
  }
  return ctx
}
