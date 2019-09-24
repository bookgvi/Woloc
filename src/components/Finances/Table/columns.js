import { date } from 'quasar'

export default [
  {
    name: 'purpose',
    field: 'purpose',
    label: 'Описание',
    align: 'left',
    width: 1
  },
  {
    name: 'purposeComment',
    field: 'comment',
    align: 'center'
  },
  {
    name: 'booking_id',
    label: 'ID брони',
    field: ({ booking = {} }) => booking.id,
  },
  {
    name: 'createdAtDay',
    label: 'дата',
    field: 'createdAt',
    format: value => date.formatDate(value, 'D MMM'),
  },
  {
    name: 'createdAtTime',
    label: 'вермя',
    field: 'createdAt',
    format: value => date.formatDate(value, 'H:mm'),
  },
  {
    name: 'amount',
    label: 'Сумма, ₽',
    field: 'amount',
  },
  {
    name: 'commission',
    label: 'Комииссия, ₽.',
    field: 'commission',
    width: 10
  },
  {
    name: 'balance',
    label: 'остаток',
    field: 'balance',
  }
]
