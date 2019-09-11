import { date } from 'quasar'
export default [
  {
    name: 'number',
    label: 'id',
    field: 'number',
    required: true,
    active: false
  },
  {
    name: 'docName',
    label: 'Название',
    field: 'docName',
    style: 'width: 10px',
    align: 'right'
  },
  {
    name: 'date',
    label: 'дата',
    format: value => date.formatDate(value, 'DD MMM')
  },
  {
    name: 'time',
    label: 'время',
    field: ({ date }) => `${date}`,
    format: value => date.formatDate(value, 'H:mm')
  },
  {
    name: 'download'
  }
]
