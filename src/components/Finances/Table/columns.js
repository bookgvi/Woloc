import { date } from 'quasar'

export default [
  {
    name: 'purpose',
    label: 'Описание',
    field: ({ transactions = {} }) => transactions.purpose,
    align: 'left',
    width: 10
  },
  {
    name: 'descriptions',
    field: ({ transactions = {} }) => transactions.descriptions,
    align: 'left',
    width: 250
  },
  {
    name: 'booking_id',
    label: 'ID брони',
    field: ({ transactions: { bookings = {} } }) => bookings.id,
  },
  {
    name: 'created_date',
    label: 'дата',
    field: ({ transactions = {} }) => transactions.created_at,
    format: value => date.formatDate(value, 'D MMM'),
  },
  {
    name: 'created_time',
    label: 'вермя',
    field: ({ transactions = {} }) => transactions.created_at,
    format: value => date.formatDate(value, 'H:mm'),
  },
  {
    name: 'amount',
    label: 'Сумма, ₽',
    field: ({ transactions = {} }) => transactions.amount,
  },
  {
    name: 'commisions',
    label: 'Комииссия, ₽.',
    field: ({ transactions = {} }) => transactions.commissions,
  },
  {
    name: 'balance',
    label: 'остаток',
    field: ({ transactions = {} }) => transactions.balance,
  }
]
