import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch';
import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: '주간 회의',
    date: '2024-02-07',
    startTime: '10:00',
    endTime: '11:00',
    description: '팀 업무 논의',
    location: '회의실A',
    category: 'work',
    repeat: {
      type: 'weekly',
      interval: 1,
    },
    notificationTime: 30,
  },
  {
    id: '2',
    title: '점심 식사',
    date: '2024-02-07',
    startTime: '12:00',
    endTime: '13:00',
    description: '팀 회식',
    location: '레스토랑',
    category: 'personal',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 10,
  },
  {
    id: '3',
    title: '고객 미팅',
    date: '2024-02-14',
    startTime: '15:00',
    endTime: '16:00',
    description: '신규 프로젝트 회의',
    location: '회의실B',
    category: 'work',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 15,
  },
  {
    id: '4',
    title: '고객 미팅',
    date: '2024-02-20',
    startTime: '15:00',
    endTime: '16:00',
    description: '신규 프로젝트 회의',
    location: '회의실B',
    category: 'work',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 15,
  },
];

const currentDate = new Date('2024-02-07');

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));

  expect(result.current.filteredEvents).toHaveLength(mockEvents.length);
  expect(result.current.searchTerm).toBe('');
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents.map((event) => event.id)).toEqual(['1']);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));

  act(() => {
    result.current.setSearchTerm('회의실');
  });

  const filteredEvents = result.current.filteredEvents;
  expect(filteredEvents).toHaveLength(1);
  console.log(filteredEvents);
  expect(filteredEvents).toEqual([
    {
      id: '1',
      title: '주간 회의',
      date: '2024-02-07',
      startTime: '10:00',
      endTime: '11:00',
      description: '팀 업무 논의',
      location: '회의실A',
      category: 'work',
      repeat: { type: 'weekly', interval: 1 },
      notificationTime: 30,
    },
  ]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const currentDate = new Date('2024-02-07');

  const { result: weekResult } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));

  act(() => {
    weekResult.current.setSearchTerm('회의');
  });

  // '회의'로 검색하고 해당 주에 있는 이벤트만 반환
  expect(weekResult.current.filteredEvents).toHaveLength(1);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));

  act(() => {
    result.current.setSearchTerm('회의');
  });
  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].title).toBe('주간 회의');

  act(() => {
    result.current.setSearchTerm('점심');
  });
  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].title).toBe('점심 식사');
});

//추가
it('검색어가 없을 때는 뷰 타입과 관계없이 모든 이벤트를 반환해야 한다', () => {
  const currentDate = new Date('2024-02-07');

  const { result: weekResult } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));
  const { result: monthResult } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

  // 검색어가 없으므로 둘 다 모든 이벤트(4개)를 반환해야 함
  expect(weekResult.current.filteredEvents).toHaveLength(4);
  expect(monthResult.current.filteredEvents).toHaveLength(4);
});
