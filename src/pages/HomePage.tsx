import { useNavigate } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useSettings } from '../context/SettingsContext'

// 홈: 큰 버튼 메뉴 (F-7 쉬운 화면의 시작점)
export default function HomePage() {
  const navigate = useNavigate()
  const { biggerFont, canBigger } = useSettings()

  return (
    <>
      <AppBar title="복지·건강 도우미" showBack={false} />
      <div className="content">
        <p className="section-help">무엇을 도와드릴까요? 큰 버튼을 눌러 주세요.</p>

        <button className="big-btn brand" onClick={() => navigate('/benefits')}>
          <span className="emoji">🎁</span>
          <span>복지 혜택 찾기</span>
          <span className="arrow">›</span>
        </button>

        <button className="big-btn good" onClick={() => navigate('/meds')}>
          <span className="emoji">💊</span>
          <span>약 챙기기</span>
          <span className="arrow">›</span>
        </button>

        <button className="big-btn" onClick={() => navigate('/contacts')}>
          <span className="emoji">📞</span>
          <span>자주 거는 곳</span>
          <span className="arrow">›</span>
        </button>

        <button className="big-btn" onClick={biggerFont} disabled={!canBigger}>
          <span className="emoji">🔎</span>
          <span>글씨 더 크게</span>
          <span className="arrow">＋</span>
        </button>

        <p className="footer-note">
          로그인이 필요 없습니다. 복약 정보는 이 휴대폰 안에만 저장됩니다.
        </p>
      </div>
    </>
  )
}
