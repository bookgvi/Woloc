import { date } from 'quasar'

export default [
  {
    name: 'alias',
    label: 'промокод',
    width: 150
  },
  {
    name: 'discount',
    label: 'скидка',
    width: 150
  },
  {
    name: 'room',
    label: 'Зал',
    width: 120
  },
  {
    name: 'minPrice',
    label: 'Мин. заказ, ₽.',
    width: 120
  },
  {
    name: 'isPublic',
    label: 'статус',
    width: 120
  },
  {
    name: 'createdAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY в h:mm'),
    width: 60
  },
  {
    name: 'expiredAt',
    label: 'Активен до',
    format: value => date.formatDate(value, 'D MMMM'),
    width: 60
  }
]
