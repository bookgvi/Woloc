import { ApiObject } from './abstractAPI'
const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const refunds = new ApiObject(`${API_URL}/refunds`)
export default {
  refunds
}
