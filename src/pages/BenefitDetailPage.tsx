import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AppBar from '../components/AppBar'
import SpeakButton from '../components/SpeakButton'
import { fetchBenefits } from '../lib/supabase'
import type { Benefit } from '../types'

// F-2 혜택 상세·신청 안내 + S-2 신청처 바로 전화
export default function BenefitDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [benefit, setBenefit] = useState<Benefit | null>((location.state as Benefit) ?? null)

  useEffect(() => {
    if (benefit) return
    // 주소로 바로 들어온 경우: 목록에서 찾아온다
    fetchBenefits().then((list) => {
      const found = list.find((b) => b.id === id) ?? null
      setBenefit(found)
    })
  }, [benefit, id])

  if (!benefit) {
    return (
      <>
        <AppBar title="혜택 안내" />
        <div className="content">
          <p className="empty">혜택 정보를 찾지 못했어요.</p>
          <button className="btn ghost" onClick={() => navigate('/benefits')}>혜택 목록으로</button>
        </div>
      </>
    )
  }

  const readText =
    `${benefit.title}. ${benefit.summary} ${benefit.supportDetail} ` +
    `신청처는 ${benefit.applyOrg}, 전화번호는 ${benefit.applyPhone} 입니다.`

  return (
    <>
      <AppBar title="혜택 안내" />
      <div className="content">
        <span className="cat">{benefit.category}</span>
        <h1 className="page-title" style={{ marginTop: '0.3rem' }}>{benefit.title}</h1>

        <div className="card">
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: 0 }}>{benefit.summary}</p>
          <p className="muted" style={{ marginBottom: 0 }}>{benefit.supportDetail}</p>
        </div>

        <div className="card">
          <p style={{ margin: '0 0 0.3rem' }}><b>신청처</b> · {benefit.applyOrg}</p>
          <p style={{ margin: 0 }}><b>전화</b> · {benefit.applyPhone}</p>
        </div>

        <a className="btn call" href={`tel:${benefit.applyPhone.replace(/[^0-9]/g, '')}`}
           style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          📞 {benefit.applyPhone} 전화 걸기
        </a>

        {benefit.applyUrl ? (
          <a className="btn ghost" href={benefit.applyUrl} target="_blank" rel="noreferrer"
             style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '0.7rem' }}>
            🔗 자세한 안내 보기
          </a>
        ) : null}

        <SpeakButton text={readText} />

        <div className="notice" style={{ marginTop: '1.2rem' }}>
          실제 자격·금액·신청 기간은 해마다 바뀔 수 있어요. 신청 전에 위 전화로 꼭 확인하세요.
        </div>
      </div>
    </>
  )
}
