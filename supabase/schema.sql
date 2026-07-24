-- ============================================================
--  어르신 복지·건강 도우미 — Supabase 스키마
--  Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
--  개인정보는 저장하지 않습니다. '공개 복지 혜택 목록'만 담습니다.
-- ============================================================

create table if not exists public.benefits (
  id uuid primary key default gen_random_uuid(),
  title text not null,                       -- 혜택 이름
  category text not null,                    -- 건강 / 생활 / 주거 / 문화
  min_age int not null default 65,           -- 대상 최소 나이
  region text not null default '전국',        -- 전국 또는 특정 지역
  requires_basic_pension boolean,            -- 기초연금 수급자 대상 여부 (null = 무관)
  summary text not null,                     -- 한 줄 요약
  support_detail text not null,              -- 지원 내용
  apply_org text not null,                   -- 신청처
  apply_phone text not null,                 -- 신청처 전화번호
  apply_url text,                            -- 안내 링크(선택)
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- 누구나 '조회'만 가능하도록 (로그인 없이 읽기 전용)
alter table public.benefits enable row level security;

drop policy if exists "Public read benefits" on public.benefits;
create policy "Public read benefits"
  on public.benefits for select
  using (true);

-- ------------------------------------------------------------
--  예시 데이터 (앱 내장 데이터와 동일). 실제 자격·금액은 신청처 확인 안내.
-- ------------------------------------------------------------
insert into public.benefits
  (title, category, min_age, region, requires_basic_pension, summary, support_detail, apply_org, apply_phone, apply_url, sort_order)
values
  ('기초연금', '생활', 65, '전국', true,
   '만 65세 이상 소득 하위 어르신께 매달 연금을 드립니다.',
   '소득·재산 기준을 충족하는 만 65세 이상에게 매월 연금을 지급합니다. 금액과 자격은 해마다 바뀔 수 있습니다.',
   '주민센터 · 국민연금공단', '1355', 'https://www.bokjiro.go.kr', 10),
  ('노인 무임교통(지하철)', '생활', 65, '전국', null,
   '만 65세 이상은 지하철을 무료로 이용할 수 있습니다.',
   '경로우대 교통카드를 발급받으면 지하철 요금이 면제됩니다. 지역별로 버스 할인도 있습니다.',
   '주민센터', '129', null, 20),
  ('에너지바우처', '생활', 65, '전국', true,
   '여름·겨울 냉난방 비용을 도와드립니다.',
   '기초생활수급 등 대상 어르신 가구에 전기·가스·연탄 비용을 바우처로 지원합니다.',
   '주민센터', '1600-3190', null, 30),
  ('노인맞춤돌봄서비스', '건강', 65, '전국', null,
   '혼자 지내기 어려운 어르신을 방문해 도와드립니다.',
   '안부 확인, 가사·이동 지원, 사회참여 프로그램 등을 형편에 맞게 제공합니다.',
   '주민센터 · 노인맞춤돌봄 수행기관', '129', null, 40),
  ('어르신 무료 독감 예방접종', '건강', 65, '전국', null,
   '만 65세 이상은 독감 예방접종을 무료로 받습니다.',
   '지정 병·의원과 보건소에서 무료로 접종합니다. 접종 기간은 매년 가을에 안내됩니다.',
   '보건소 · 지정 병의원', '1339', null, 50),
  ('치과 임플란트·틀니 건강보험', '건강', 65, '전국', null,
   '임플란트와 틀니 비용의 일부를 건강보험으로 지원합니다.',
   '만 65세 이상 대상으로 정해진 개수 한도 안에서 본인부담을 낮춰 줍니다.',
   '국민건강보험공단', '1577-1000', null, 60),
  ('노인일자리·사회활동 지원', '문화', 65, '전국', null,
   '활동하실 수 있는 어르신께 일자리와 활동비를 드립니다.',
   '공공·사회서비스형 등 다양한 활동에 참여하고 활동비를 받을 수 있습니다.',
   '시니어클럽 · 노인복지관', '129', null, 70),
  ('경로당·노인복지관 프로그램', '문화', 65, '전국', null,
   '가까운 경로당·복지관에서 취미와 건강 프로그램에 참여하세요.',
   '운동, 취미, 식사, 나들이 등 무료·저렴한 프로그램을 운영합니다.',
   '가까운 경로당 · 노인복지관', '129', null, 80);
