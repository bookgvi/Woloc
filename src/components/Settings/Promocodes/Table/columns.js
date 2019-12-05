import { date } from 'quasar'

export default [
  {
    name: 'alias',
    label: 'промокод',
    active: true,
  },
  {
    name: 'discount',
    label: 'скидка',
    align: 'right',
    width: 100,
    active: true,
  },
  {
    name: 'rooms',
    label: 'Зал',
    active: true,
  },
  {
    name: 'minPrice',
    label: 'Мин. заказ, ₽.',
    align: 'right',
    width: 100,
    active: true,
  },
  {
    name: 'isPublic',
    label: 'статус',
    active: true,
  },
  {
    name: 'startedAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY в h:mm'),
    active: true,
  },
  {
    name: 'expiredAt',
    label: 'Активен до',
    format: value => date.formatDate(value, 'D MMMM'),
    active: true,
  },
]
