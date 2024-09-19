import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { verifyLogin } from '../utils/api'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      isLogin: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/ChatLogin.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/chat',
    component: () => import('../views/ChatIndex.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      isLogin: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 掛載在進入每一個router地址前都執行以下func
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)

  // 獲取使用者登入成功後儲存的登入標誌
  const token = localStorage.getItem('token')
  // console.log('存儲的token:', token)

  // 驗證token是否過期
  verifyLogin(token)
    .then((res) => {
      console.log('token驗證結果:', res)
      // 如果登入標誌存在和Token有效且為isLogin，即使用者已登入
      if (token !== null && res) {
        // 設定vuex登入狀態為已登入
        store.state.isLogin = true
        // 如果已登入，還想想進入登入註冊介面，則定向回首頁
        if (to.name === 'Login') {
          ElMessage('請先退出登入')
          next({
            path: '/'
          })
        } else {
          next()
        }
      } else { // 如果登入標誌不存在或驗證失敗，即未登入
        // 使用者想進入需要登入的頁面，則定向回登入介面
        if (to.meta.isLogin) {
          console.log('重新導向login頁面')
          ElMessage('請先登入')
          next({
            path: '/login'
          })
        } else { // 使用者進入無需登入的介面，則跳轉繼續
          next()
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

// 掛載在進入每一個router地址後都執行以下func
router.afterEach((route) => {
  window.scroll(0, 0)
})

export default router
