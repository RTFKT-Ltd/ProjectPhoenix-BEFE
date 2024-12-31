import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { config } from './config/wagmi'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(WagmiPlugin, { config })
app.use(VueQueryPlugin)

app.mount('#app')
