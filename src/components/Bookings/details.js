import find from 'lodash/find'
import columns from './columns'
import eventTypes from '../../common/eventTypes'

export default [
  {
    fields: [
      {
        name: 'room',
        label: 'Зал',
        field: row => row.room.name,
      },
      find(columns, { name: 'date' }),
      find(columns, { name: 'time' }),
      {
        ...find(columns, { name: 'eventType' }),
        format: (value) => eventTypes[value].name
      },
      {
        ...find(columns, { name: 'guestsCount' }),
        label: 'Количество гостей'
      }
    ]
  },
  {
    name: 'Данные клиента',
    fields: [
      {
        ...find(columns, { name: 'customer' }),
        name: 'customerName',
        label: 'Имя'
      },
      {
        name: 'customerPhone',
        label: 'Телефон',
        field: row => row.customer.phone
      },
      {
        name: 'customerEmail',
        label: 'Эл. почта',
        field: row => row.customer.email
      },
    ]
  },
  {
    name: 'Комментарий',
    fields: [
      {
        ...find(columns, { name: 'comment' }),
        label: undefined,
        inputType: 'textarea'
      },
    ]
  }
]
