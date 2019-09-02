const data = []
const mocks = [
  {
    id: 55799,
    customer: {
      name: 'Андрей Ревин'
    },
    room: {
      name: 'Зал №13 капотня хуётня',
      color: 'orange',
    },
    eventType: 'photo',
    prepayment: 4800,
    amount: 4800,
    isPaid: true,
    guestsCount: 6,
    servicesCount: 2,
    reservedFrom: '2019-10-15 13:30',
    reservedTo: '2019-10-15 18:00',
    comment: 'Подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то'
  },
  {
    id: 55778,
    customer: {
      name: 'Джим кэмп'
    },
    room: {
      name: 'Зал №11 капотня',
      color: 'red',
    },
    eventType: 'event',
    prepayment: 2400,
    amount: 4800,
    isPaid: false,
    guestsCount: 3,
    reservedFrom: '2019-10-14 12:15',
    reservedTo: '2019-10-14 19:00',
    comment: 'Удалено',
    removed: true,
  },
  {
    id: 55779,
    customer: {
      name: 'Андрей Куранов'
    },
    room: {
      name: 'Зал №11 капотня',
      color: 'cyan',
    },
    eventType: 'video',
    prepayment: 2400,
    amount: 4800,
    isPaid: false,
    guestsCount: 3,
    reservedFrom: '2019-10-14 12:15',
    reservedTo: '2019-10-14 19:00'
  },
]

for (let i = 0; i < 100; i += 1) {
  data.push(...mocks)
}

export default data
