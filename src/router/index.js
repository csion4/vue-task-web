import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../frame/Frame'
import Task from '../views/TaskView.vue'
import DashBoard from '../views/DashBoard.vue'
import TaskCenter from '../views/TaskCenter.vue'
import TaskInfo from '../views/TaskInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/websocket.vue')
  },
  {
    path: '/',
    component: Frame,
    children: [ // 路由嵌套
      {
        path: 'task',
        name: 'Task',
        component: Task
      },
      {
        path: 'dashBoard',
        name: 'DashBoard',
        component: DashBoard
      },
      {
        path: 'taskCenter',
        name: 'TaskCenter',
        component: TaskCenter
      },
      {
        path: 'taskInfo',
        name: 'TaskInfo',
        component: TaskInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 防止push当前页路由导致报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/test') {
    next()
  } else {
    const token = localStorage.getItem('Authorization')

    if (token === null || token === '') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
