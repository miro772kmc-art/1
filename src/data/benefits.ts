import type { Benefit } from '../types'

// Supabase 미연결 시 사용하는 내장 예시 데이터.
// supabase/schema.sql 의 seed 데이터와 동일하게 맞춰 두었습니다.
// 실제 자격·금액은 해마다 달라지므로 앱은 항상 "신청처 확인"을 안내합니다.
export const SEED_BENEFITS: Benefit[] = [
  {
    id: 'seed-1',
    title: '기초연금',
    category: '생활',
    minAge: 65,
    region: '전국',
    requiresBasicPension: true,
    summary: '만 65세 이상 소득 하위 어르신께 매달 연금을 드립니다.',
    supportDetail:
      '소득·재산 기준을 충족하는 만 65세 이상에게 매월 연금을 지급합니다. 금액과 자격은 해마다 바뀔 수 있습니다.',
    applyOrg: '주민센터 · 국민연금공단',
    applyPhone: '1355',
    applyUrl: 'https://www.bokjiro.go.kr',
  },
  {
    id: 'seed-2',
    title: '노인 무임교통(지하철)',
    category: '생활',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '만 65세 이상은 지하철을 무료로 이용할 수 있습니다.',
    supportDetail:
      '경로우대 교통카드를 발급받으면 지하철 요금이 면제됩니다. 지역별로 버스 할인도 있습니다.',
    applyOrg: '주민센터',
    applyPhone: '129',
  },
  {
    id: 'seed-3',
    title: '에너지바우처',
    category: '생활',
    minAge: 65,
    region: '전국',
    requiresBasicPension: true,
    summary: '여름·겨울 냉난방 비용을 도와드립니다.',
    supportDetail:
      '기초생활수급 등 대상 어르신 가구에 전기·가스·연탄 비용을 바우처로 지원합니다.',
    applyOrg: '주민센터',
    applyPhone: '1600-3190',
  },
  {
    id: 'seed-4',
    title: '노인맞춤돌봄서비스',
    category: '건강',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '혼자 지내기 어려운 어르신을 방문해 도와드립니다.',
    supportDetail:
      '안부 확인, 가사·이동 지원, 사회참여 프로그램 등을 형편에 맞게 제공합니다.',
    applyOrg: '주민센터 · 노인맞춤돌봄 수행기관',
    applyPhone: '129',
  },
  {
    id: 'seed-5',
    title: '어르신 무료 독감 예방접종',
    category: '건강',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '만 65세 이상은 독감 예방접종을 무료로 받습니다.',
    supportDetail:
      '지정 병·의원과 보건소에서 무료로 접종합니다. 접종 기간은 매년 가을에 안내됩니다.',
    applyOrg: '보건소 · 지정 병의원',
    applyPhone: '1339',
  },
  {
    id: 'seed-6',
    title: '치과 임플란트·틀니 건강보험',
    category: '건강',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '임플란트와 틀니 비용의 일부를 건강보험으로 지원합니다.',
    supportDetail:
      '만 65세 이상 대상으로 정해진 개수 한도 안에서 본인부담을 낮춰 줍니다.',
    applyOrg: '국민건강보험공단',
    applyPhone: '1577-1000',
  },
  {
    id: 'seed-7',
    title: '노인일자리·사회활동 지원',
    category: '문화',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '활동하실 수 있는 어르신께 일자리와 활동비를 드립니다.',
    supportDetail:
      '공공·사회서비스형 등 다양한 활동에 참여하고 활동비를 받을 수 있습니다.',
    applyOrg: '시니어클럽 · 노인복지관',
    applyPhone: '129',
  },
  {
    id: 'seed-8',
    title: '경로당·노인복지관 프로그램',
    category: '문화',
    minAge: 65,
    region: '전국',
    requiresBasicPension: null,
    summary: '가까운 경로당·복지관에서 취미와 건강 프로그램에 참여하세요.',
    supportDetail: '운동, 취미, 식사, 나들이 등 무료·저렴한 프로그램을 운영합니다.',
    applyOrg: '가까운 경로당 · 노인복지관',
    applyPhone: '129',
  },
]

export const CATEGORIES = ['건강', '생활', '주거', '문화'] as const
