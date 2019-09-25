import { date } from 'quasar'

export default [
  {
    name: 'purpose',
    field: ({ purpose } = {}) => purpose.name,
    label: 'Описание',
    align: 'right',
    width: 250
  },
  {
    name: 'purposeComment',
    field: 'comment',
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
    field: ({ amount, purpose } = {}) => {
      if (purpose.id === 8 || purpose.id === 11) {
        amount = '—'
      } else {
        amount = `${amount} ₽`
      }
      return amount
    },
    align: 'right'
  },
  {
    name: 'commission',
    label: 'Комиссия, ₽.',
    field: ({ commission, amount, purpose } = {}) => {
      if (purpose.id === 8 || purpose.id === 11) {
        commission = -amount
        commission = `${commission.toFixed(2)} ₽`
      }
      if (!commission) {
        commission = '—'
      }
      return commission
    },
    align: 'right',
    width: 10
  },
  {
    name: 'balance',
    label: 'остаток, ₽',
    field: ({ balance } = {}) => `${balance} ₽`,
    align: 'right'
  }
]
