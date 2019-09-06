export default [
  {
    name: 'customer',
    required: true,
    label: 'Имя',
    field: ({ firstName, lastName } = {}) => `${firstName} ${lastName}`
  },
  {
    name: 'rating',
    align: 'center',
    label: 'Рейтинг',
    sortable: true,
  },
  {
    name: 'chat',
    label: 'Чат',
    sortable: true,
  },
  {
    name: 'actions',
    width: 40
  }
]
