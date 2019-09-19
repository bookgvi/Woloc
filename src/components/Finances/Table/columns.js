import { date } from 'quasar'

export default [
  {
    name: 'description',
    label: 'Описание',
    /* eslint-disable */
    field: ({ organization_transactions = {} }) => organization_transactions.description,
    /* eslint-enable */
    align: 'left',
    width: 200
  },
  {
    name: 'booking_id',
    label: 'ID брони',
    field: ({ bookings = {} }) => bookings.id,
  },
  {
    name: 'created_date',
    label: 'дата',
    field: 'created_at',
    format: value => date.formatDate(value, 'D MMM'),
  },
  {
    name: 'created_time',
    label: 'вермя',
    field: 'created_at',
    format: value => date.formatDate(value, 'H:mm'),
  },
  {
    name: 'amount',
    label: 'Сумма, Р.',
    fieled: 'amount'
  },
  {
    name: 'commisions',
    label: 'Комииссия, Р.',
    field: 'commisions'
  },
  {
    name: 'balance',
    label: 'остаток',
    field: 'balance'
  }
]
