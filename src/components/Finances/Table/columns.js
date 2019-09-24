import { date } from 'quasar'

export default [
  {
    name: 'purpose',
    label: 'Описание',
    field: 'purpose',
    align: 'left',
    width: 10
  },
  {
    name: 'descriptions',
    field: 'purposeDescription',
    align: 'left',
    width: 250
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
  },
  {
    name: 'balance',
    label: 'остаток',
    field: 'balance',
  }
]
