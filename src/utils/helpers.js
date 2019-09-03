import { moment } from '../boot/moment'

export function dtFormat (v) {
  return moment(v).format(moment.defaultFormatUtc)
}
