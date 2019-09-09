import { date } from 'quasar'

export default [
  {
    name: 'id',
    required: true,
    label: 'Бронь',
    width: 80,
    active: true,
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ customer: { firstName, lastName } = {} }) => `${firstName} ${lastName}`,
    width: 220,
    active: false,
  },
  {
    name: 'room',
    label: 'Зал',
    field: 'room',
    width: 150
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
  {
    name: 'confirm',
    width: 40
  }
]
