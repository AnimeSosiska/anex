import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import VueDatePicker from '@vuepic/vue-datepicker'
import { createYmaps } from 'vue-yandex-maps'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-final-modal/style.css'
import './assets/style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const vfm = createVfm()
app.use(router)
app.use(vfm)
app.use(createYmaps({
    apikey: 'cdd63560-e0b8-4746-86d9-10587df73f42'
}))
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')