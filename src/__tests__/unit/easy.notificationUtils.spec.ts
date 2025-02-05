import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';
const events: Event[] = [
  {
    title: '산책하기',
    date: '2025-02-05',
    startTime: '18:30',
    endTime: '19:30',
    description: '운동',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'weekly',
      interval: 5,
    },
    notificationTime: 5,
    id: '1',
  },
  {
    title: '항해',
    date: '2025-00-00',
    startTime: '13:00',
    endTime: '18:00',
    description: '항해',
    location: '영등포',
    category: '공부',
    repeat: {
      type: 'weekly',
      interval: 5,
    },
    notificationTime: 5,
    id: '2',
  },
  {
    title: '친구들 만나기',
    date: '2025-02-06',
    startTime: '09:00',
    endTime: '100:100',
    description: '술',
    location: '구로디지털',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '3',
  },
  {
    title: '출근',
    date: '2025-02-07',
    startTime: '09:00',
    endTime: '18:00',
    description: '출근ㅠ',
    location: '여의도',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '4',
  },
  {
    title: '출근',
    date: '2025-02-07',
    startTime: '09:00',
    endTime: '18:00',
    description: '출근ㅠ',
    location: '여의도',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '5',
  },
  {
    title: '이벤트 2',
    date: '2025-02-08',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '5',
  },
  {
    title: '이벤트 1',
    date: '2024-06-30',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '6',
  },
  {
    title: '이벤트 3',
    date: '2024-07-01',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '7',
  },
  {
    title: '이벤트 4',
    date: '2024-07-05',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '8',
  },
  {
    title: '이벤트 5',
    date: '2024-07-07',
    startTime: '20:00',
    endTime: '22:00',
    description: '',
    location: '여의도',
    category: '기타',
    repeat: {
      type: 'daily',
      interval: 5,
    },
    notificationTime: 10,
    id: '9',
  },
  {
    title: 'JavaScript 스터디',
    date: '2025-02-05',
    startTime: '14:00',
    endTime: '16:00',
    description: '자바스크립트 공부',
    location: '여의도',
    category: '공부',
    repeat: { type: 'weekly', interval: 1 },
    notificationTime: 10,
    id: '10',
  },
  {
    title: 'React와 TypeScript',
    date: '2025-02-05',
    startTime: '16:00',
    endTime: '18:00',
    description: 'FrontEnd 스터디',
    location: '강남',
    category: '공부',
    repeat: { type: 'weekly', interval: 1 },
    notificationTime: 10,
    id: '11',
  },
];
describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    expect(getUpcomingEvents(events, new Date('2025-02-05T15:50'), [])).toEqual([
      {
        category: '공부',
        date: '2025-02-05',
        description: 'FrontEnd 스터디',
        endTime: '18:00',
        id: '11',
        location: '강남',
        notificationTime: 10,
        repeat: {
          interval: 1,
          type: 'weekly',
        },
        startTime: '16:00',
        title: 'React와 TypeScript',
      },
    ]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    expect(getUpcomingEvents(events, new Date('2025-02-05T15:50'), ['11'])).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    expect(getUpcomingEvents(events, new Date('2025-02-05T15:49'), [])).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    expect(getUpcomingEvents(events, new Date('2025-02-05T16:01'), ['11'])).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {});
});
