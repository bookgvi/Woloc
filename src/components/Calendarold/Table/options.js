
const objDate = new Date()
const currentDate = objDate.getDate()
const currentDay = objDate.getDay()
const monday = currentDate - -(currentDay - 7)

export default {
  columns: [
    {
      name: 'time',
      label: 'Время',
      align: 'left',
    },
    {
      name: 0,
      label: `ПН ${monday}`,
      align: 'left',
    },
    {
      name: 1,
      label: `ВТ ${monday + 1}`,
      align: 'center',
    },
    {
      name: 2,
      label: `СР ${monday + 2}`,
      align: 'center',
    },
    {
      name: 3,
      label: `ЧТ ${monday + 3}`,
      align: 'center',
    },
    {
      name: 4,
      label: `ПТ ${monday + 4}`,
      align: 'center',
    },
    {
      name: 5,
      label: `СБ ${monday + 5}`,
      align: 'center',
    },
    {
      name: 6,
      label: `ВС ${monday + 6}`,
      align: 'center',
    }
  ],
  visibleColumns: [
    'id',
    'title',
    'images',
    'description',
    'published',
    'created',
    'modified',
    'actions'
  ],
  separator: 'cell',
  pagination: {
    sortBy: 'title',
    descending: false,
    page: 1,
    rowsPerPage: 10
  }
}
