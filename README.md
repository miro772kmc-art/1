# 어르신 복지·건강 도우미 앱

어르신이 **받을 수 있는 복지 혜택을 쉽게 찾고**, **약·병원 일정을 놓치지 않게** 돕는 앱입니다.
큰 글씨·큰 버튼·읽어주기를 기본으로 하여 어르신이 혼자서도 쓸 수 있게 만들었습니다.

- 기술: React + Vite + TypeScript + Supabase + Vercel
- 로그인 없음 · 개인정보 저장 없음 (복약·연락처는 이 기기 안 `localStorage` 에만 저장)

## 기능

| 화면 | 내용 |
|------|------|
| 홈 | 큰 버튼 메뉴 · 글씨 크기 조절 (F-7 / S-4) |
| 복지 혜택 찾기 | 나이·기초연금 여부를 골라 맞춤 혜택 추천 (F-1 / S-1) |
| 혜택 상세 | 지원 내용·신청처·전화 걸기·읽어주기 (F-2 / S-2 / F-8) |
| 약 챙기기 | 약 등록, 오늘 복약 체크, 시간 알림 (F-4 / F-5 / S-3) |
| 자주 거는 곳 | 가족·기관 번호 저장 후 한 번에 전화 (F-9) |

> 복지 혜택 목록은 Supabase `benefits` 테이블에서 읽어옵니다.
> Supabase 를 연결하지 않아도 **내장 예시 데이터로 바로 작동**합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## Supabase 연결 (선택)

1. [supabase.com](https://supabase.com) 에서 프로젝트를 만든다.
2. **SQL Editor** 에 [`supabase/schema.sql`](supabase/schema.sql) 을 붙여넣고 실행한다. (테이블 + 예시 데이터 + 읽기 정책)
3. **Project Settings → API** 에서 `URL` 과 `anon public` 키를 복사한다.
4. `.env.example` 을 복사해 `.env.local` 을 만들고 값을 채운다.

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

## Vercel 배포

1. Vercel 에서 이 GitHub 저장소를 **Import** 한다. (프레임워크: Vite 자동 감지)
2. **Environment Variables** 에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 를 등록한다.
3. **Deploy** 를 누른다. `vercel.json` 이 SPA 라우팅을 처리한다.

## 안내

복지 제도의 자격·금액·신청 기간은 해마다 바뀝니다. 앱은 대표 혜택을 안내할 뿐이며,
실제 신청 전에는 **신청처 전화로 확인**하도록 항상 안내합니다.
