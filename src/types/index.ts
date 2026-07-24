// 복지 혜택 (Supabase benefits 테이블 / 내장 데이터 공통 모양)
export interface Benefit {
  id: string
  title: string
  category: string            // 건강 | 생활 | 주거 | 문화
  minAge: number
  region: string              // '전국' 또는 특정 지역
  requiresBasicPension: boolean | null  // null = 무관
  summary: string
  supportDetail: string
  applyOrg: string
  applyPhone: string
  applyUrl?: string | null
}

// 사용자가 고르는 조건 (F-1 / S-1)
export interface BenefitFilter {
  ageBand: '60대' | '70대' | '80대 이상' | null
  region: string | null       // '전국' 등
  basicPension: 'yes' | 'no' | 'unknown' | null
}

// 복약 (기기 내 localStorage 에만 저장)
export interface Medication {
  id: string
  name: string
  time: string                // 'HH:MM'
  takenDates: string[]        // 복용 완료한 날짜 'YYYY-MM-DD'
}

// 자주 거는 곳 (F-9, localStorage)
export interface Contact {
  id: string
  label: string               // 예: 큰딸, 주민센터
  phone: string
}
