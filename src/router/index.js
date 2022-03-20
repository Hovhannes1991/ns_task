import { createRouter, createWebHistory } from 'vue-router';
const TaskOne = () => import('@/components/TaskOne');
const TaskTwo = () => import('@/components/TaskTwo');
const TaskThree = () => import('@/components/TaskThree');
const routes = [
  {
    path: '/',
    redirect: '/task_1'
  },
  {
    path: '/task_1',
    name: 'task_1',
    component: TaskOne
  },
  {
    path: '/task_2',
    name: 'task_2',
    component: TaskTwo
  },
  {
    path: '/task_3',
    name: 'task_3',
    component: TaskThree
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
