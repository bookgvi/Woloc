const EVENT_TYPES = {
  photo: {
    name: 'Фотосъемка',
    value: 'photo',
    icon: 'camera_alt',
    price: 1200,
  },
  video: {
    name: 'Видеосъемка',
    value: 'video',
    icon: 'videocam',
    price: 1500
  },
  event: {
    name: 'Событие',
    value: 'event',
    icon: 'fas fa-calendar-day',
    price: 1300
  }
}

const BOOKING_STATUSES = {
  NEW: {
    value: 0, label: 'Не подтвержденный'
  },
  CANCELED: {
    value: 1, label: 'Отмененный'
  },
  PAID: {
    value: 2, label: 'Подтвержденный'
  },
  DONE: {
    value: 3, label: 'Исполненный'
  },
  EXPIRED: {
    value: 4, label: 'Истекший'
  },
}

export { EVENT_TYPES, BOOKING_STATUSES }
