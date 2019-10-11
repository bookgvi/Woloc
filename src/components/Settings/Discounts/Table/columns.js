import { date } from 'quasar'

export default [
  {
    name: 'room',
    label: 'Зал',
    active: true
  },
  {
    name: 'percent',
    label: 'процент',
    align: 'right',
    width: 100,
    format: value => `${value}%`,
    active: true
  },
  {
    name: 'dayOfWeek',
    label: 'день',
    format: value => ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].filter((
      item, index) => value === index + 1).pop(),
    width: 100,
    active: true
  },
  {
    name: 'hoursFrom',
    label: 'время',
    format: (value, { hourFrom, hourTo }) => [hourFrom, hourTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    active: true
  },
  {
    name: 'minHours',
    label: 'Мин. часы',
    active: true
  },
  {
    name: 'expiredAt',
    label: 'Активна до',
    format: value => date.formatDate(value, 'D MMMM'),
    active: true,
  },
]
