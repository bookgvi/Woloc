import Vue from 'vue'

export const eventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $eventBus: { get: () => eventBus }
})
