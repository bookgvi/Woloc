import { date } from 'quasar'
export default [
  {
    name: 'number',
    label: 'id',
    field: 'number',
    required: true,
    width: 50,
    active: false
  },
  {
    name: 'docName',
    label: 'Название',
    field: 'docName',
    width: 550,
    align: 'left',
    classes: 'text-primary'
  },
  {
    name: 'date',
    label: 'дата',
    width: 50,
    format: value => date.formatDate(value, 'DD MMM')
  },
  {
    name: 'time',
    label: 'время',
    field: ({ date }) => `${date}`,
    format: value => date.formatDate(value, 'H:mm')
  },
  {
    name: 'download',
    align: 'right'
  }
]
