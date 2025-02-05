import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';
const overEvent: Event = {
  title: '공부',
  date: '2025-02-07',
  startTime: '09:00',
  endTime: '18:00',
  description: 'REACT',
  location: '영등포',
  category: '기타',
  repeat: {
    type: 'daily',
    interval: 5,
  },
  notificationTime: 10,
  id: '6',
};
const newEvent: Event = {
  title: '공부',
  date: '2025-02-08',
  startTime: '09:00',
  endTime: '18:00',
  description: 'REACT',
  location: '영등포',
  category: '기타',
  repeat: {
    type: 'daily',
    interval: 5,
  },
  notificationTime: 10,
  id: '6',
};
const event: Event[] = [
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
];
describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    expect(parseDateTime('2024-07-01', '14:30')).toBeInstanceOf(Date);
    expect(parseDateTime('2024-07-01', '14:30')).toEqual(new Date('2024-07-01T14:30'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-02137-01', '14:30')).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-07-01', '1412313:30')).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    expect(parseDateTime('', '14:30')).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    expect(convertEventToDateRange(event[0])).toEqual({
      start: new Date(`${event[0].date} ${event[0].startTime}`),
      end: new Date(`${event[0].date} ${event[0].endTime}`),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    expect(convertEventToDateRange(event[1])).toEqual({
      start: 'Invalid Date',
      end: 'Invalid Date',
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    expect(convertEventToDateRange(event[2])).toEqual({
      start: new Date(`${event[2].date} ${event[2].startTime}`),
      end: 'Invalid Date',
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    expect(isOverlapping(event[3], event[4])).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    expect(isOverlapping(event[1], event[4])).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    expect(findOverlappingEvents(overEvent, event)).toEqual([
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
    ]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    expect(findOverlappingEvents(newEvent, event)).toEqual([]);
  });
});
