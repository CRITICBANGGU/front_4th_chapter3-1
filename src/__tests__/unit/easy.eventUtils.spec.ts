import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
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
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const result = getFilteredEvents(events, '이벤트 2', new Date('2025-02-08'), 'month');
    expect(result).toEqual([
      {
        title: '이벤트 2',
        date: '2025-02-08',
        startTime: '20:00',
        endTime: '22:00',
        description: '',
        location: '여의도',
        category: '기타',
        repeat: { type: 'daily', interval: 5 },
        notificationTime: 10,
        id: '5',
      },
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    expect(getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week')).toEqual([
      {
        title: '이벤트 1',
        date: '2024-06-30',
        startTime: '20:00',
        endTime: '22:00',
        description: '',
        location: '여의도',
        category: '기타',
        repeat: { type: 'daily', interval: 5 },
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
        repeat: { type: 'daily', interval: 5 },
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
        repeat: { type: 'daily', interval: 5 },
        notificationTime: 10,
        id: '8',
      },
    ]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'month')).toEqual([
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
    ]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    expect(getFilteredEvents(events, '이벤트 1', new Date('2024-07-01'), 'week')).toEqual([
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
    ]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(events, '', new Date(), 'month')).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    //전체 키워드
    expect(getFilteredEvents(events, 'React', new Date('2025-02-05'), 'month')).toEqual([
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
    ]);

    //소문자만
    expect(getFilteredEvents(events, 'java', new Date('2025-02-05'), 'month')).toEqual([
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
    ]);
    //대문자만
    expect(getFilteredEvents(events, 'JAVA', new Date('2025-02-05'), 'month')).toEqual([
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
    ]);
    //대소문자 합쳐서
    expect(getFilteredEvents(events, 'JavA', new Date('2025-02-05'), 'month')).toEqual([
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
    ]);
  });

  // (질문) : 이전 테스트에서 이미 검증을 했다면, 해당 추가로 안해도 되지않나요?
  // 이전 테스트 ->'주간 뷰에서 2024-07-01 주의 이벤트만 반환한다' 이미 2024/07/01은 월의 경계임
  // 2024/06/30 일까지 같이 표시되기 떄문에 해당 테스트 케이스에 대해서는 검증이 완료되었다.
  // (고민되는 부분) : 이전에 검증을 했다 하더라도, '테스트 코드 역시 하나의 문서'라는 부분에서 말했다 싶이
  // 경계값 테스트를 진행해줘야 하는것인가요?
  // 물론 소요되는 시간이 매우 짧아서 테스트를 진행해도 상관이 없다고 생각이 되지만, 경계값 이면서 소요되는 시간이 매우 오래 걸리는 경우에는
  // 어떤 기준으로 테스트 코드를 작성해야하나요?
  it.skip('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {});

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    expect(getFilteredEvents([], '', new Date(), 'month')).toEqual([]);
  });
});
