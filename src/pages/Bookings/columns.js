import { date } from 'quasar'
import eventTypes from 'src/common/eventTypes'

export default [
  {
    name: 'id',
    label: 'id',
    width: 70,
    active: true,
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ customer: { firstName, lastName } = {} }) => `${firstName} ${lastName}`,
    active: true,
  },
  {
    name: 'room',
    label: 'Зал',
    field: 'room',
    width: 120
  },
  {
    name: 'eventType',
    label: 'Цель',
    field: 'eventType',
    format: (value) => value && eventTypes[value],
    width: 50,
  },
  {
    name: 'amount',
    label: 'Оплата, р.',
    field: ({ amount, price }) => `${amount} / ${price}`,
    width: 100
  },
  {
    name: 'isPaid',
    width: 10,
  },
  {
    name: 'guestsCount',
    label: 'Гости',
    width: 60
  },
  {
    name: 'servicesCount',
    label: 'Допы',
    format: value => value || '—',
    width: 60
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
    name: 'promo',
    label: 'Промо',
  },
  {
    name: 'comment',
    label: 'Коммент',
  },
  {
    name: 'controls',
    width: 40
  }
]
