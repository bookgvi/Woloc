export default [
  {
    name: 'name',
    required: true,
    label: 'ИМЯ',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'rating',
    align: 'center',
    label: 'РЕЙТИНГ',
    sortable: true,
    field: row => row.rating
  },
  {
    name: 'chat',
    label: 'ЧАТ',
    field: 'chat',
    sortable: true,
    align: 'left'
  }
]
