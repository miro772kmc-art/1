import { speak } from '../lib/speak'

// 내용 읽어주기 버튼(F-8)
export default function SpeakButton({ text }: { text: string }) {
  return (
    <button className="speak-btn" onClick={() => speak(text)}>
      🔊 읽어 드리기
    </button>
  )
}
