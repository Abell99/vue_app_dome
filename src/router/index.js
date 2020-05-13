import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/home.vue'
// import Ganged from '../components/ganged.vue'
import Test from '../components/test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
