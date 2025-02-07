import { act, renderHook } from '@testing-library/react';

import { useNotifications } from '../../hooks/useNotifications.ts';
import { Event } from '../../types.ts';
import { formatDate } from '../../utils/dateUtils.ts';
import { parseHM } from '../utils.ts';
const createEventWithNotification = (
  id: string,
  minutesFromNow: number,
  notificationMinutes: number
): Event => {
  const eventTime = new Date(Date.now() + minutesFromNow * 60 * 1000);

  return {
    id,
    title: `테스트 이벤트 ${id}`,
    date: formatDate(eventTime),
    startTime: parseHM(eventTime.getTime()),
    endTime: parseHM(eventTime.getTime() + 60 * 60 * 1000), // 1시간 후
    description: '',
    location: '',
    category: '',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: notificationMinutes,
  };
};
it('초기 상태에서는 알림이 없어야 한다', () => {
  const { result } = renderHook(() => useNotifications([]));

  expect(result.current.notifications).toHaveLength(0);
  expect(result.current.notifiedEvents).toHaveLength(0);
});

it('지정된 시간이 된 경우 알림이 새롭게 생성되어 추가된다', () => {
  const events = [
    createEventWithNotification('1', 10, 5), // 10분 후 이벤트, 5분 전 알림
  ];

  const { result } = renderHook(() => useNotifications(events));

  // 4분 경과
  act(() => {
    vi.advanceTimersByTime(4 * 60 * 1000);
  });
  expect(result.current.notifications).toHaveLength(0);

  // 1분 더 경과 (총 5분) - 알림이 생성되어야 함
  act(() => {
    vi.advanceTimersByTime(1 * 60 * 1000);
  });
  expect(result.current.notifications).toHaveLength(1);
  expect(result.current.notifications[0].id).toBe('1');
});

it('index를 기준으로 알림을 적절하게 제거할 수 있다', () => {
  const events = [
    createEventWithNotification('1', 10, 10),
    createEventWithNotification('2', 20, 20),
  ];

  const { result } = renderHook(() => useNotifications(events));

  // 알림 생성
  act(() => {
    vi.advanceTimersByTime(0);
    result.current.setNotifications([
      { id: '1', message: '테스트 알림 1' },
      { id: '2', message: '테스트 알림 2' },
    ]);
  });

  expect(result.current.notifications).toHaveLength(2);

  // 첫 번째 알림 제거
  act(() => {
    result.current.removeNotification(0);
  });

  expect(result.current.notifications).toHaveLength(1);
  expect(result.current.notifications[0].id).toBe('2');
});

it('이미 알림이 발생한 이벤트에 대해서는 중복 알림이 발생하지 않아야 한다', () => {
  const events = [
    createEventWithNotification('1', 10, 5), // 10분 후 이벤트, 5분 전 알림
  ];

  const { result } = renderHook(() => useNotifications(events));

  // 알림 시점까지 시간 진행
  act(() => {
    vi.advanceTimersByTime(5 * 60 * 1000);
  });
  expect(result.current.notifications).toHaveLength(1);

  // 추가 시간 진행
  act(() => {
    vi.advanceTimersByTime(1 * 60 * 1000);
  });
  // 알림이 중복으로 생성되지 않아야 함
  expect(result.current.notifications).toHaveLength(1);
  expect(result.current.notifiedEvents).toContain('1');
});
