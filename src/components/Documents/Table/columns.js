import { date } from 'quasar'
export default [
  {
    name: 'number',
    label: 'id',
    field: 'number',
    required: true,
    width: 1300,
    active: false
  },
  {
    name: 'docName',
    label: 'Название',
    field: 'docName',
    width: 13
  },
  {
    name: 'date',
    label: 'дата',
    format: value => date.formatDate(value, 'DD MMM'),
    width: 13
  },
  {
    name: 'time',
    label: 'время',
    field: ({ date }) => `${date}`,
    format: value => date.formatDate(value, 'H:mm'),
    width: 13
  }
]
