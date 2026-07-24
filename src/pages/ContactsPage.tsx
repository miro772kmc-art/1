import { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import { getContacts, saveContacts, makeId } from '../lib/storage'
import type { Contact } from '../types'

// F-9 자주 거는 곳 전화
export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [label, setLabel] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setContacts(getContacts())
  }, [])

  function persist(next: Contact[]) {
    setContacts(next)
    saveContacts(next)
  }

  function addContact() {
    const l = label.trim()
    const p = phone.trim()
    if (!l || !p) return
    persist([...contacts, { id: makeId(), label: l, phone: p }])
    setLabel('')
    setPhone('')
  }

  function removeContact(id: string) {
    if (!confirm('이 연락처를 지울까요?')) return
    persist(contacts.filter((c) => c.id !== id))
  }

  return (
    <>
      <AppBar title="자주 거는 곳" />
      <div className="content">
        <h1 className="page-title">한 번 눌러 전화하기</h1>
        <p className="section-help">가족이나 주민센터 번호를 저장해 두고 크게 눌러 거세요.</p>

        {contacts.length === 0 ? (
          <p className="empty">저장된 연락처가 없어요.<br />아래에서 추가해 주세요.</p>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="card">
              <div className="med-item">
                <span className="name" style={{ fontSize: '1.3rem' }}>{c.label}</span>
                <span className="muted">{c.phone}</span>
              </div>
              <div className="row" style={{ marginTop: '0.8rem' }}>
                <a className="btn call" href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                   style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  📞 전화 걸기
                </a>
                <button className="btn danger" style={{ flex: '0 0 auto', minWidth: '5rem' }} onClick={() => removeContact(c.id)}>
                  삭제
                </button>
              </div>
            </div>
          ))
        )}

        <h2 className="page-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>연락처 추가</h2>
        <div className="card">
          <label className="field" htmlFor="c-label">이름 (예: 큰딸, 주민센터)</label>
          <input id="c-label" value={label} placeholder="예: 큰딸"
                 onChange={(e) => setLabel(e.target.value)} />
          <label className="field" htmlFor="c-phone">전화번호</label>
          <input id="c-phone" type="tel" inputMode="tel" value={phone} placeholder="예: 010-1234-5678"
                 onChange={(e) => setPhone(e.target.value)} />
          <div style={{ height: '0.9rem' }} />
          <button className="btn" onClick={addContact} disabled={!label.trim() || !phone.trim()}>+ 연락처 등록</button>
        </div>

        <p className="footer-note">연락처는 이 휴대폰 안에만 저장됩니다.</p>
      </div>
    </>
  )
}
