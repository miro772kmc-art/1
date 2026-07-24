import { createClient } from '@supabase/supabase-js'
import type { Benefit } from '../types'
import { SEED_BENEFITS } from '../data/benefits'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anon)

const supabase = isSupabaseConfigured ? createClient(url as string, anon as string) : null

// DB(snake_case) → 앱(camelCase) 변환
type Row = {
  id: string
  title: string
  category: string
  min_age: number
  region: string
  requires_basic_pension: boolean | null
  summary: string
  support_detail: string
  apply_org: string
  apply_phone: string
  apply_url: string | null
}

function mapRow(r: Row): Benefit {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    minAge: r.min_age,
    region: r.region,
    requiresBasicPension: r.requires_basic_pension,
    summary: r.summary,
    supportDetail: r.support_detail,
    applyOrg: r.apply_org,
    applyPhone: r.apply_phone,
    applyUrl: r.apply_url,
  }
}

// 복지 혜택 목록을 가져온다.
// Supabase 가 연결돼 있으면 DB 에서, 아니면 내장 데이터로 폴백한다.
export async function fetchBenefits(): Promise<Benefit[]> {
  if (!supabase) return SEED_BENEFITS
  try {
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error || !data || data.length === 0) return SEED_BENEFITS
    return (data as Row[]).map(mapRow)
  } catch {
    return SEED_BENEFITS
  }
}
