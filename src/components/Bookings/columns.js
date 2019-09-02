import { date } from 'quasar'

const columns = [
  {
    name: 'id',
    label: 'id',
    field: 'id',
    style: 'width: 70px'
  },
  {
    name: 'customer',
    label: 'клиент',
    field: ({ customer: { firstName, lastName } }) => `${firstName} ${lastName}`
  },
  {
    name: 'room',
    label: 'зал',
    field: 'room',
    style: 'width: 120px'
  },
  {
    name: 'eventType',
    label: 'цель',
    field: 'eventType',
    style: 'width: 50px'
  },
  {
    name: 'amount',
    label: 'оплата, р.',
    field: row => [row.prepayment, row.amount].join(' / '),
    style: 'width: 100px'
  },
  {
    name: 'isPaid',
    field: 'isPaid',
    style: 'width: 10px'
  },
  {
    name: 'guestsCount',
    label: 'гости',
    field: 'guestsCount',
    style: 'width: 60px'
  },
  {
    name: 'servicesCount',
    label: 'допы',
    field: 'servicesCount',
    format: value => value || '—',
    style: 'width: 60px'
  },
  {
    name: 'date',
    label: 'дата',
    field: 'reservedFrom',
    format: value => date.formatDate(value, 'D MMM'),
    style: 'width: 60px'
  },
  {
    name: 'time',
    label: 'время',
    format: (value, { reservedFrom, reservedTo }) => [reservedFrom, reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    style: 'width: 120px'
  },
  {
    name: 'promo',
    label: 'промо',
    field: 'promo',
  },
  {
    name: 'comment',
    label: 'коммент',
    field: 'comment',
  },
  {
    name: 'actions',
    style: 'width: 40px'
  }
].map(col => ({
  ...col,
  align: 'left'
}))

export default columns
