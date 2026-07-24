import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { fetchBenefits } from '../lib/supabase'
import type { Benefit, BenefitFilter } from '../types'

// 나이대 → 대표 나이 (혜택 최소 나이 비교용)
const AGE_TO_NUMBER: Record<string, number> = { '60대': 65, '70대': 70, '80대 이상': 80 }

// F-1 맞춤 혜택 추천 + S-1 조건 고르기
export default function BenefitsPage() {
  const navigate = useNavigate()
  const [all, setAll] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<BenefitFilter>({ ageBand: null, region: null, basicPension: null })

  useEffect(() => {
    let alive = true
    fetchBenefits().then((data) => {
      if (!alive) return
      setAll(data)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  const picked = filter.ageBand && filter.basicPension // 최소 두 가지 고르면 결과 표시

  const results = useMemo(() => {
    if (!picked) return []
    const age = filter.ageBand ? AGE_TO_NUMBER[filter.ageBand] : 65
    return all.filter((b) => {
      if (b.minAge > age) return false
      // 기초연금 대상 혜택인데 "아니다"를 고르면 제외
      if (b.requiresBasicPension === true && filter.basicPension === 'no') return false
      return true
    })
  }, [all, filter, picked])

  return (
    <>
      <AppBar title="복지 혜택 찾기" />
      <div className="content">
        <h1 className="page-title">몇 가지만 골라 주세요</h1>
        <p className="section-help">글자를 쓰지 않아도 됩니다. 버튼만 눌러 주세요.</p>

        <label className="field">나이는 어떻게 되세요?</label>
        <div className="choices">
          {(['60대', '70대', '80대 이상'] as const).map((a) => (
            <button
              key={a}
              className={'choice' + (filter.ageBand === a ? ' selected' : '')}
              onClick={() => setFilter((f) => ({ ...f, ageBand: a }))}
            >
              {filter.ageBand === a ? '✅ ' : ''}
              {a}
            </button>
          ))}
        </div>

        <label className="field">기초연금을 받고 계세요?</label>
        <div className="choices">
          {([
            ['yes', '네, 받고 있어요'],
            ['no', '아니요'],
            ['unknown', '잘 모르겠어요'],
          ] as const).map(([v, label]) => (
            <button
              key={v}
              className={'choice' + (filter.basicPension === v ? ' selected' : '')}
              onClick={() => setFilter((f) => ({ ...f, basicPension: v }))}
            >
              {filter.basicPension === v ? '✅ ' : ''}
              {label}
            </button>
          ))}
        </div>

        <div style={{ height: '1.2rem' }} />

        {loading ? (
          <p className="empty">불러오는 중입니다…</p>
        ) : !picked ? (
          <p className="empty">위에서 나이와 기초연금 여부를 고르면<br />받을 수 있는 혜택을 보여 드려요.</p>
        ) : results.length === 0 ? (
          <p className="empty">딱 맞는 혜택을 찾지 못했어요.<br />가까운 주민센터(☎ 129)에 문의해 보세요.</p>
        ) : (
          <>
            <h2 className="page-title" style={{ fontSize: '1.25rem' }}>
              받을 수 있는 혜택 {results.length}가지
            </h2>
            {results.map((b) => (
              <button key={b.id} className="card" style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => navigate(`/benefits/${b.id}`, { state: b })}>
                <span className="cat">{b.category}</span>
                <h2>{b.title}</h2>
                <p className="muted" style={{ margin: 0 }}>{b.summary}</p>
                <p style={{ margin: '0.6rem 0 0', color: 'var(--brand)', fontWeight: 800 }}>자세히 보기 ›</p>
              </button>
            ))}
            <p className="footer-note">실제 자격과 금액은 신청처에서 꼭 확인하세요.</p>
          </>
        )}
      </div>
    </>
  )
}
