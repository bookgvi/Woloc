const EVENT_TYPES = {
  photo: {
    name: 'Фотосъемка',
    icon: 'camera_alt',
  },
  video: {
    name: 'Видеосъемка',
    icon: 'videocam'
  },
  event: {
    name: 'Событие',
    icon: 'fas fa-calendar-day'
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
