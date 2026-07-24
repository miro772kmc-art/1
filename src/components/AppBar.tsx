import { useNavigate } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'

// 상단 바: 뒤로 가기 + 제목 + 글씨 크기 조절(항상 보이는 접근성 컨트롤)
export default function AppBar({ title, showBack = true }: { title: string; showBack?: boolean }) {
  const navigate = useNavigate()
  const { biggerFont, smallerFont, canBigger, canSmaller } = useSettings()

  return (
    <div className="appbar">
      {showBack ? (
        <button onClick={() => navigate(-1)} aria-label="뒤로 가기">← 뒤로</button>
      ) : null}
      <span className="title">{title}</span>
      <button onClick={smallerFont} disabled={!canSmaller} aria-label="글씨 작게">가–</button>
      <button onClick={biggerFont} disabled={!canBigger} aria-label="글씨 크게">가＋</button>
    </div>
  )
}
