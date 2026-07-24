import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getFontScale, saveFontScale } from '../lib/storage'

// 글씨 크기 조절(S-4). 앱 전체 글씨를 키우고 설정을 기억한다.
const STEPS = [1, 1.15, 1.3, 1.5]

interface SettingsValue {
  fontScale: number
  biggerFont: () => void
  smallerFont: () => void
  canBigger: boolean
  canSmaller: boolean
}

const SettingsContext = createContext<SettingsValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScale] = useState<number>(() => getFontScale())

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
    saveFontScale(fontScale)
  }, [fontScale])

  const idx = STEPS.indexOf(fontScale)
  const safeIdx = idx === -1 ? 0 : idx

  const biggerFont = () => setFontScale(STEPS[Math.min(safeIdx + 1, STEPS.length - 1)])
  const smallerFont = () => setFontScale(STEPS[Math.max(safeIdx - 1, 0)])

  return (
    <SettingsContext.Provider
      value={{
        fontScale,
        biggerFont,
        smallerFont,
        canBigger: safeIdx < STEPS.length - 1,
        canSmaller: safeIdx > 0,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
