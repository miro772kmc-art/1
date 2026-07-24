import type { Medication, Contact } from '../types'

// 기기 안(localStorage)에만 저장하는 도우미들.
// 서버로 개인정보를 보내지 않습니다.

const MED_KEY = 'ewa.medications'
const CONTACT_KEY = 'ewa.contacts'
const FONT_KEY = 'ewa.fontScale'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 저장 실패는 조용히 무시 (용량 초과 등) */
  }
}

// 오늘 날짜 'YYYY-MM-DD'
export function todayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 간단한 고유 id (외부 라이브러리 없이)
export function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/* ---------- 복약 ---------- */
export function getMeds(): Medication[] {
  return read<Medication[]>(MED_KEY, [])
}
export function saveMeds(meds: Medication[]): void {
  write(MED_KEY, meds)
}

/* ---------- 자주 거는 곳 ---------- */
export function getContacts(): Contact[] {
  return read<Contact[]>(CONTACT_KEY, [])
}
export function saveContacts(contacts: Contact[]): void {
  write(CONTACT_KEY, contacts)
}

/* ---------- 글씨 크기 ---------- */
export function getFontScale(): number {
  return read<number>(FONT_KEY, 1)
}
export function saveFontScale(scale: number): void {
  write(FONT_KEY, scale)
}
