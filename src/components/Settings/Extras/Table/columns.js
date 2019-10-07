import { date } from 'quasar'

export default [
  {
    name: 'name',
    label: 'Название',
    width: 150,
  },
  {
    name: 'room',
    label: 'Зал',
    width: 120
  },
  {
    name: 'price',
    label: 'цена, Р.',
    width: 120
  },
  {
    name: 'limit',
    label: 'лимит',
    width: 120
  },
  {
    name: 'createDate',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'extrasControls',
    width: 40
  }
]
