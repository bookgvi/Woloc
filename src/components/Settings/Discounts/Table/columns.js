import { date } from 'quasar'

export default [
  {
    name: 'room',
    label: 'Зал',
    active: true,
    discount: true
  },
  {
    name: 'percent',
    label: 'процент',
    align: 'right',
    width: 100,
    format: value => `${value}%`,
    active: true,
    discount: true
  },
  {
    name: 'dayOfWeek',
    label: 'день',
    format: value => {
      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
      const shortDaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      const getDays = value.map(item => daysOfWeek[item - 1])
      const getShortDays = value.map(item => shortDaysOfWeek[item - 1])
      return getDays.length > 1 ? getShortDays.join(', ') : getDays.join(', ')
    },
    active: true,
    discount: true
  },
  {
    name: 'hourFrom',
    label: 'время',
    format: (value, { hourFrom, hourTo }) => [hourFrom, hourTo].map(
      item => `${item}:00`
    ).join(' — '),
    active: true,
    discount: true
  },
  {
    name: 'minHours',
    label: 'Мин. часы',
    active: true,
    discount: true
  },
  {
    name: 'expiredAt',
    label: 'Активна до',
    format: value => date.formatDate(value, 'D MMMM'),
    active: true,
    discount: true
  }
]
