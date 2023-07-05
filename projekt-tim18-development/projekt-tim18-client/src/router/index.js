import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import firebase from 'boot/projekt-tim18-SystemSetup.js'

const isUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(theUser => {
      resolve(theUser)
      unsubscribeOnAuthStateChanged()
    }, err => {
      console.error(err)
      resolve(null)
      unsubscribeOnAuthStateChanged()
    })
  })
}

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

router.beforeEach(async (to, from, next) => {
  console.log(firebase.auth().currentUser)
  if (to.matched.some(record => record.meta.auth)) {
    await isUserLoggedIn()
      .then(res => {
        if (res) {
          next()
        } else {
          next('/')
        }
      })
  } else {
    next()
  }
})

export default router
