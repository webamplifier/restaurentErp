import React from 'react';
import DayWiseProfit from './screens/Reports/DayWiseProfit';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));


//Manual Imports
const CompanyList = React.lazy(()=>import('./screens/companies/CompanyList'));
const CreateCompany = React.lazy(()=>import('./screens/companies/CreateCompany'));
const EditCompany = React.lazy(()=>import('./screens/companies/EditCompany'));
const ProductList = React.lazy(()=>import('./screens/Products/index'));
const CreateProduct = React.lazy(()=>import('./screens/Products/create'));
const EditProduct = React.lazy(()=>import('./screens/Products/edit'));



const SalesReport = React.lazy(()=>import('./screens/Reports/SalesReport'));
const DayWiseSales = React.lazy(()=>import('./screens/Reports/DayWiseSales'));
const createExpense = React.lazy(()=>import('./screens/Expense/create'));
const editExpense = React.lazy(()=>import('./screens/Expense/Edit'));
const expenseReport = React.lazy(()=>import('./screens/Reports/ExpenseReport'));
//subcategory Imports
const CreateSalesEntry = React.lazy(()=>import('./screens/Sales/Sales Entry/Create'));
const EditSalesEntry = React.lazy(()=>import('./screens/Sales/Sales Entry/Edit'));


//restaurant imports

const RestaurantList = React.lazy(()=>import('./screens/Restaurants/Index'));
const CreateRestaurant = React.lazy(()=>import('./screens/Restaurants/Create'));
const EditRestaurant = React.lazy(()=>import('./screens/Restaurants/Edit'));

//user imports

const UserList = React.lazy(()=>import('./screens/User/Index'));
const CreateUser = React.lazy(()=>import('./screens/User/Create'));
const EditUser = React.lazy(()=>import('./screens/User/Edit'));

const SalePrintBill = React.lazy(()=>import('./screens/Reports/SalePrintBill'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  //manual routes

  {path : '/companyList',exact : true,name : 'Company List',component:CompanyList},
  {path : '/create/company',exact : true,name : 'Create Company',component:CreateCompany},
  {path : '/edit/company',exact : true,name : 'Company List',component:EditCompany},
  {path : '/products',exact : true,name : 'Product List',component:ProductList},
  {path : '/create/products',exact : true,name : 'Create Product',component:CreateProduct},
  {path : '/edit/products/:id',exact : true,name : 'Edit Product',component:EditProduct},  
  {path : '/salesReport',exact : true,name : 'Sales Report',component : SalesReport},
  {path : '/DayWiseSales',exact : true,name : 'Day Wise Sales Report',component : DayWiseSales},
  {path : '/DayWiseProfit',exact : true,name : 'Day Wise Profit Report',component : DayWiseProfit},
  {path : '/create/expense',exact : true,name : 'Create Expense',component : createExpense},
  {path : '/expenseReport',exact : true,name : 'Expense Report',component : expenseReport},
  {path : '/edit/expense/:id',exact : true,name : 'Edit Expense',component : editExpense},
  
  //Sub category routes
  
  {path : '/create/sales',exact : true,name : 'Create Sales',component:CreateSalesEntry},
  {path : '/edit/sales/:id',exact : true, name : 'Edit Sales',component : EditSalesEntry},
  //restaurant routes

  {path : '/restaurantList', exact : true, name : 'Restaurant List',component: RestaurantList},
  {path : '/create/restaurant', exact : true, name : 'Create Restaurant',component: CreateRestaurant},
  {path : '/edit/restaurant/:id', exact : true, name : 'Edit Restaurant',component: EditRestaurant},
  
  //user Routes
  {path : '/userList',exact : true,name : 'User List',component: UserList},
  {path : '/create/user',exact : true,name : 'Create User',component: CreateUser},
  {path : '/edit/user/:id',exact : true,name : 'Edit User',component:EditUser},
  {path : '/printBill/:id',exact : true,name : 'Edit User',component:SalePrintBill},
];


export default routes;
