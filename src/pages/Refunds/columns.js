import { date } from 'quasar'

export default [
  {
    name: 'booking',
    required: true,
    label: 'Бронь',
    width: 60,
    active: true,
  },
  {
    name: 'customer',
    required: true,
    label: 'Клиент',
    field: ({ firstName, lastName } = {}) => `${firstName} ${lastName}`,
    width: 270,
    active: true,
  },
  {
    name: 'room',
    label: 'Зал',
    field: 'room',
    width: 120
  },
  {
    name: 'date',
    label: 'Дата',
    field: 'reservedFrom',
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'time',
    label: 'Время',
    format: (value, { reservedFrom, reservedTo }) => [reservedFrom, reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    width: 120
  },
  {
    name: 'expired',
    label: 'Просрочено',
    field: 'expiredDate',
    format: value => date.formatDate(value, 'D MMM H:mm'),
    width: 120
  },
  {
    name: 'Price',
    label: 'Сумма, Р.',
    field: 'price',
    width: 120
  },
  {
    name: 'refundStatus',
    label: 'Статус возврата',
    field: 'refundStatus',
    width: 120
  },
]
