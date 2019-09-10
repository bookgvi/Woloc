import { date } from 'quasar'

export default [
  {
    name: 'id',
    field: 'id',
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
    name: 'reservedDate',
    label: 'Дата',
    field: 'reservedDate',
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'reservedTime',
    label: 'Время',
    field: 'reservedTime',
    format: (value, { reservedDate, reservedTo }) => [reservedDate, reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    width: 120
  },
  {
    name: 'expiredDate',
    label: 'Просрочено',
    field: 'expiredDate',
    format: value => date.formatDate(value, 'D MMM H:mm'),
    width: 120
  },
  {
    name: 'price',
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
    name: 'hasConfirm',
    field: 'hasConfirm',
    width: 40
  }
]
