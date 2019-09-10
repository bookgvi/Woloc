import { date } from 'quasar'

export default [
  {
    name: 'id',
    field: 'id',
    required: true,
    label: 'Бронь',
    width: 80,
    active: false,
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ booking: { customer = {} } }) => `${customer.firstName} ${customer.lastName}`,
    width: 150,
    active: false,
  },
  {
    name: 'name',
    label: 'Зал',
    field: ({ booking: { room = {} } }) => `${room.name}`,
    width: 120
  },
  {
    name: 'reservedFrom',
    label: 'Дата',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'reservedTime',
    label: 'Время',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: value => date.formatDate(value, 'H:mm'),
    width: 120,
  },
  {
    name: 'returnedAt',
    label: 'Просрочено',
    field: 'returnedAt',
    format: value => date.formatDate(value, 'D MMM'),
    width: 120
  },
  {
    name: 'amount',
    label: 'Сумма, Р.',
    field: 'amount',
    width: 120
  },
  {
    name: 'status',
    label: 'Статус возврата',
    field: 'status',
    width: 120
  },
  {
    name: 'controls',
    width: 40
  }
]
