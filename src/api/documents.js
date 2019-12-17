import { ApiObject } from './abstractAPI'
const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const documents = new ApiObject(`${API_URL}/documents`)
export default {
  documents
}
