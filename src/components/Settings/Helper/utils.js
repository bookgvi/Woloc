export function Util () {
}
Util.prototype = {
  clearExtras (payload) {
    if (!payload.length) return payload
    for (let i = 0; i < payload.length; i++) {
      this.clearData(payload[i])
    }
    return payload
  },

  clearData (payload) {
    for (let key in payload) {
      if (typeof payload[key] !== 'object') {
        if (key === 'presentsInStudio' || key === 'isChecked') {
          payload[key] = false
        }
      } else {
        this.clearExtras(payload[key])
      }
    }
  },

  cloneObject (obj) {
    if (!obj) return []
    return JSON.parse(JSON.stringify(obj))
  },

  hasRequiredFields (requiredFields, obj) {
    return requiredFields.map(item => !!obj[item]).filter(item => !item)
  },

  /*
  * Метод подсветки незаполненных обязательных полей
  * Поля, для которых стоят правила валидации использую аттрибут lazy-rules,
  * которое срабатывает при потере фокуса
  * */
  highLightRequired (fieldClass) {
    const field = document.querySelector(`.${fieldClass} input`)
    field.focus()
    field.blur()
  },

  /*
  * Метод валидации полей тэга Input - допустим ввод только цифр
  * */
  inputPrice (e, val) {
    val = e.target.value.match(/\d*/)[0]
    e.target.value = val
  },

  /*
  * Валидация десятичных дробей или целых чисел
  * */
  floatOrInteger (val) {
    const res = String(val).match(/\d*\.\d*/g) || String(val).match(/\d*/)
    return res[0]
  },
}

Object.defineProperty(Util.prototype, 'constructor', {
  value: 'Util',
  enumerable: false
})
