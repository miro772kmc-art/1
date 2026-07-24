import { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import { getMeds, saveMeds, makeId, todayKey } from '../lib/storage'
import type { Medication } from '../types'

// F-4 복약 알림 등록 + F-5 오늘 복약 체크 (+ S-3 안 먹은 약 알림)
export default function MedsPage() {
  const [meds, setMeds] = useState<Medication[]>([])
  const [name, setName] = useState('')
  const [time, setTime] = useState('08:00')
  const [notifyOn, setNotifyOn] = useState(false)
  const today = todayKey()

  useEffect(() => {
    setMeds(getMeds())
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') setNotifyOn(true)
  }, [])

  // 앱이 켜져 있는 동안 복약 시간을 확인해 알림을 띄운다(간단 버전).
  useEffect(() => {
    if (!notifyOn) return
    const timer = setInterval(() => {
      const now = new Date()
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      getMeds().forEach((m) => {
        if (m.time === hhmm && !m.takenDates.includes(todayKey())) {
          try {
            new Notification('약 드실 시간이에요', { body: `${m.name} (${m.time})` })
          } catch {
            /* 알림 미지원 무시 */
          }
        }
      })
    }, 60 * 1000)
    return () => clearInterval(timer)
  }, [notifyOn])

  function persist(next: Medication[]) {
    setMeds(next)
    saveMeds(next)
  }

  function addMed() {
    const n = name.trim()
    if (!n) return
    const next = [...meds, { id: makeId(), name: n, time, takenDates: [] }].sort((a, b) =>
      a.time.localeCompare(b.time),
    )
    persist(next)
    setName('')
    setTime('08:00')
  }

  function toggleTaken(m: Medication) {
    const has = m.takenDates.includes(today)
    const takenDates = has ? m.takenDates.filter((d) => d !== today) : [...m.takenDates, today]
    persist(meds.map((x) => (x.id === m.id ? { ...x, takenDates } : x)))
  }

  function removeMed(id: string) {
    if (!confirm('이 약을 목록에서 지울까요?')) return
    persist(meds.filter((x) => x.id !== id))
  }

  async function enableNotify() {
    if (typeof Notification === 'undefined') {
      alert('이 브라우저는 알림을 지원하지 않아요. 화면에서 직접 확인해 주세요.')
      return
    }
    const p = await Notification.requestPermission()
    setNotifyOn(p === 'granted')
    if (p === 'granted') new Notification('알림이 켜졌어요', { body: '약 드실 시간에 알려 드릴게요.' })
  }

  const remaining = meds.filter((m) => !m.takenDates.includes(today)).length

  return (
    <>
      <AppBar title="약 챙기기" />
      <div className="content">
        <h1 className="page-title">오늘 드실 약</h1>
        <p className="section-help">
          {meds.length === 0
            ? '아래에서 약을 먼저 등록해 주세요.'
            : remaining === 0
              ? '오늘 드실 약을 모두 챙기셨어요. 잘하셨어요! 👏'
              : `아직 ${remaining}가지 남았어요.`}
        </p>

        {!notifyOn ? (
          <button className="btn ghost" onClick={enableNotify}>🔔 약 시간 알림 켜기</button>
        ) : (
          <div className="notice">🔔 알림이 켜져 있어요. (앱을 열어 둔 동안 알려 드려요)</div>
        )}

        <div style={{ height: '1rem' }} />

        {meds.length === 0 ? (
          <p className="empty">등록된 약이 없어요.</p>
        ) : (
          meds.map((m) => {
            const taken = m.takenDates.includes(today)
            return (
              <div key={m.id} className="card">
                <div className="med-item">
                  <span className="time">{m.time}</span>
                  <span className="name">{m.name}</span>
                  {taken ? <span className="taken-badge">✅ 드셨어요</span> : null}
                </div>
                <div className="row" style={{ marginTop: '0.8rem' }}>
                  <button className={taken ? 'btn ghost' : 'btn good'} onClick={() => toggleTaken(m)}>
                    {taken ? '취소' : '먹었어요'}
                  </button>
                  <button className="btn danger" style={{ flex: '0 0 auto', minWidth: '5rem' }} onClick={() => removeMed(m.id)}>
                    삭제
                  </button>
                </div>
              </div>
            )
          })
        )}

        <h2 className="page-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>약 추가하기</h2>
        <div className="card">
          <label className="field" htmlFor="med-name">약 이름</label>
          <input id="med-name" value={name} placeholder="예: 혈압약"
                 onChange={(e) => setName(e.target.value)} />
          <label className="field" htmlFor="med-time">드시는 시간</label>
          <input id="med-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <div style={{ height: '0.9rem' }} />
          <button className="btn" onClick={addMed} disabled={!name.trim()}>+ 약 등록</button>
        </div>

        <p className="footer-note">약 정보는 이 휴대폰 안에만 저장됩니다.</p>
      </div>
    </>
  )
}
