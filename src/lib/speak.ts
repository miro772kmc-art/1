// 내용 읽어주기(F-8). 브라우저 내장 음성 합성(Web Speech API) 사용.
export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ko-KR'
    u.rate = 0.95
    window.speechSynthesis.speak(u)
  } catch {
    /* 음성 미지원 브라우저는 조용히 무시 */
  }
}

export function stopSpeak(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
