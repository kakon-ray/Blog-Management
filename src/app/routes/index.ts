import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { BlogRoutes } from '../modules/Blog/blog.route'



const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: UserRoutes,
  },
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})


export default router