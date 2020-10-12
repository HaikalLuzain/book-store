import { RouteType } from 'src/config/types'
import Login from 'src/pages/auth/Login'
import Register from 'src/pages/auth/Register'
import BookPage from 'src/pages/book'
import AddBook from 'src/pages/book/Add'
import Starter from 'src/pages/starter/starter'
// ui components
// import Alerts from 'src/pages/ui-components/alert'
// import Badges from 'src/pages/ui-components/badge'
// import Buttons from 'src/pages/ui-components/button'
// import Cards from 'src/pages/ui-components/cards'
// import LayoutComponent from 'src/pages/ui-components/layout'
// import PaginationComponent from 'src/pages/ui-components/pagination'
// import PopoverComponent from 'src/pages/ui-components/popover'
// import TooltipComponent from 'src/pages/ui-components/tooltip'

// Pages

export const authRoutes: RouteType[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]

export const dashboardRoutes: RouteType[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'far fa-clock',
    component: Starter,
    isSidebar: true,
  },
  {
    path: '/book',
    name: 'Book Page',
    icon: 'fas fa-book',
    component: BookPage,
    exact: true,
    isSidebar: true,
  },
  {
    path: '/book/add',
    name: 'Add Book',
    component: AddBook,
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true },
]
