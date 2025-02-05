import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

const events: Event[] = [
  {
    id: '1',
    title: 'Event 1',
    date: '2025-02-01',
    startTime: '10:00',
    endTime: '12:00',
    description: 'Description 1',
    location: 'Location 1',
    category: 'Work',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 30,
  },
  {
    id: '2',
    title: 'Event 2',
    date: '2025-02-02',
    startTime: '10:00',
    endTime: '12:00',
    description: 'Description 2',
    location: 'Location 2',
    category: 'Work',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 30,
  },
];

describe('getDaysInMonth', () => {
  it('1월은 31일 수를 반환한다', () => {
    expect(getDaysInMonth(2024, 1)).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    expect(getDaysInMonth(2024, 4)).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    expect(getDaysInMonth(2025, 2)).toBe(28);
  });

  it('유효하지 않은 월에 대해 적절히 처리한다', () => {
    expect(() => getDaysInMonth(2024, 0)).toThrow('[ERROR]::: 월은 1~12 사이값이여야 합니다.');
  });
});

describe('getWeekDates', () => {
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2025-02-05');
    const weekDates = getWeekDates(testDate);

    expect(weekDates).toHaveLength(7);

    weekDates.forEach((item, idx) => {
      expect(item).toBeInstanceOf(Date);
      // 2025-02-02 => 일요일
      expect(weekDates[idx].toISOString().split('T')[0]).toBe(`2025-02-0${2 + idx}`);
    });
  });

  it('주의 시작(월요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2025-02-04');
    const weekDates = getWeekDates(testDate);

    expect(weekDates).toHaveLength(7);

    weekDates.forEach((item, idx) => {
      expect(item).toBeInstanceOf(Date);
      // 2025-02-02 => 일요일
      expect(weekDates[idx].toISOString().split('T')[0]).toBe(`2025-02-0${2 + idx}`);
    });
  });

  it('주의 끝(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const testDate = new Date('2025-02-02');
    const weekDates = getWeekDates(testDate);

    expect(weekDates).toHaveLength(7);

    weekDates.forEach((item, idx) => {
      expect(item).toBeInstanceOf(Date);
      // 2025-02-02 => 일요일
      expect(weekDates[idx].toISOString().split('T')[0]).toBe(`2025-02-0${2 + idx}`);
    });
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    const testDate = new Date('2024-12-31');
    const weekDates = getWeekDates(testDate);
    expect(weekDates[3].toISOString().split('T')[0]).toBe(`2025-01-01`);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    const testDate = new Date('2025-01-01');
    const weekDates = getWeekDates(testDate);
    expect(weekDates[2].toISOString().split('T')[0]).toBe(`2024-12-31`);
    expect(weekDates[4].toISOString().split('T')[0]).toBe(`2025-01-02`);
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    const testDate = new Date('2024-02-29');
    const weekDates = getWeekDates(testDate);
    expect(weekDates[5].toISOString().split('T')[0]).toBe(`2024-03-01`);
  });

  //해당 테스트는 이미 앞에서 진행한 테스트 (연초, 연말) 했기 떄문에 skip한다. (불필요한 테스트)
  it.skip('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {});
});

describe('getWeeksAtMonth', () => {
  it('2024년 7월 1일의 올바른 주 정보를 반환해야 한다', () => {
    const weeks = getWeeksAtMonth(new Date('2024-07-01'));

    //5주
    expect(weeks.length).toBe(5);

    //첫번째 주
    expect(weeks[0]).toEqual([null, 1, 2, 3, 4, 5, 6]);

    //마지막주
    expect(weeks[4]).toEqual([28, 29, 30, 31, null, null, null]);
  });
});

describe('getEventsForDay', () => {
  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {
    expect(getEventsForDay(events, 1)).toEqual([
      {
        id: '1',
        title: 'Event 1',
        date: '2025-02-01',
        startTime: '10:00',
        endTime: '12:00',
        description: 'Description 1',
        location: 'Location 1',
        category: 'Work',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 30,
      },
    ]);
  });

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(events, 15)).toEqual([]);
  });

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(events, 0)).toEqual([]);
  });

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(events, 32)).toEqual([]);
  });
});

describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    const result = formatWeek(new Date('2025-02-16'));
    expect(result).toBe('2025년 2월 3주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    // 목요일을 기준으로 새로운 월이 결정됨. 2025-02-01 => 토요일 -> 1월 5주 라고 표시되는 것

    // 기준 일이 목요일 이후 일때,
    const afterThu = formatWeek(new Date('2025-02-01'));
    expect(afterThu).toBe('2025년 1월 5주');

    // 기준일이 목요일 이전 일 떄,
    const beforeThu = formatWeek(new Date('2025-04-01'));
    expect(beforeThu).toBe('2025년 4월 1주');

    // 기준일이 목요일 일 떄,
    const thu = formatWeek(new Date('2025-05-01'));
    expect(thu).toBe('2025년 5월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    // 목요일을 기준으로 새로운 월이 결정됨. 2025-02-01 => 토요일 -> 1월 5주 라고 표시되는 것

    // 기준 일이 목요일 이후 일때,
    const afterThu = formatWeek(new Date('2025-05-31'));
    expect(afterThu).toBe('2025년 5월 5주');

    // 기준일이 목요일 이전 일 떄,
    const beforeThu = formatWeek(new Date('2025-04-30'));
    expect(beforeThu).toBe('2025년 5월 1주');

    // 기준일이 목요일 일 떄,
    const thu = formatWeek(new Date('2024-10-31'));
    expect(thu).toBe('2024년 10월 5주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    // 목요일을 기준으로 새로운 월이 결정됨. 2025-02-01 => 토요일 -> 1월 5주 라고 표시되는 것
    // 기준 일이 목요일 이후 일때,
    const afterThu = formatWeek(new Date('2023-12-29'));
    expect(afterThu).toBe('2023년 12월 4주');

    // 기준일이 목요일 이전 일 떄,
    const beforeThu = formatWeek(new Date('2023-12-28'));
    expect(beforeThu).toBe('2023년 12월 4주');

    // 기준일이 목요일 일 떄,
    const thu = formatWeek(new Date('2023-12-27'));
    expect(thu).toBe('2023년 12월 4주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    // 기준 일이 목요일 이후 일때,
    const afterThu = formatWeek(new Date('2024-02-29'));
    expect(afterThu).toBe('2024년 2월 5주');

    // 기준일이 목요일 이전 일 떄,
    const beforeThu = formatWeek(new Date('2024-02-29'));
    expect(beforeThu).toBe('2024년 2월 5주');

    // 기준일이 목요일 일 떄,
    const thu = formatWeek(new Date('2024-02-29'));
    expect(thu).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    // 기준 일이 목요일 이후 일때,
    const afterThu = formatWeek(new Date('2023-02-24'));
    expect(afterThu).toBe('2023년 2월 4주');

    // 기준일이 목요일 이전 일 떄,
    const beforeThu = formatWeek(new Date('2023-02-22'));
    expect(beforeThu).toBe('2023년 2월 4주');

    // 기준일이 목요일 일 떄,
    const thu = formatWeek(new Date('2023-02-23'));
    expect(thu).toBe('2023년 2월 4주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {
    const result = formatMonth(new Date('2024-07-10'));
    expect(result).toBe('2024년 7월');
  });
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date('2024-07-10'), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date('2024-07-01'), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date('2024-07-31'), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date('2024-06-30'), rangeStart, rangeEnd)).toBe(false);
  });

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date('2024-08-01'), rangeStart, rangeEnd)).toBe(false);
  });

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date('2024-06-30'), rangeEnd, rangeStart)).toBe(false);
  });
});

describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {
    expect(fillZero(5, 2)).toBe('05');
  });

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {
    expect(fillZero(10, 2)).toBe('10');
  });

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {
    expect(fillZero(3, 3)).toBe('003');
  });

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {
    expect(fillZero(100, 2)).toBe('100');
  });

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {
    expect(fillZero(0, 2)).toBe('00');
  });

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {
    expect(fillZero(1, 5)).toBe('00001');
  });

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {
    expect(fillZero(3.14, 5)).toBe('03.14');
  });

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {
    expect(fillZero(0)).toBe('00');
  });

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {
    expect(fillZero(100, 2)).toBe('100');
  });
});

describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {
    expect(formatDate(new Date('2025-02-04'))).toBe('2025-02-04');
  });

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {
    expect(formatDate(new Date('2025-02-04'), 3)).toBe('2025-02-03');
  });

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    expect(formatDate(new Date('2025-2-04'))).toBe('2025-02-04');
  });

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    expect(formatDate(new Date('2025-02-4'))).toBe('2025-02-04');
  });
});
