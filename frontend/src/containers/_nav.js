import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Masters',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Restaurant',
        to: '/restaurantList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/userList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Products',
        to: '/products',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inventory',
        to: '/inventoryList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reciept',
        to: '/recieptList',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Purchase',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Purchase Entry',
        to: '/create/purchase',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Purchase Return',
        to: '/create/purchaseReturn',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Sales',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Sales Entry',
        to: '/create/sales',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sales Return',
        to: '/create/salesReturn',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Expense',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Expense Entry',
        to: '/create/expense',
      },
      
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Purchase Report',
        to: '/purchaseReport',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Purchase Return Report',
        to: '/purchaseReturnReport',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sales Report',
        to: '/salesReport',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sales Return Report',
        to: '/salesReturnReport',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Expense Report',
        to: '/expenseReport',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Day Wise Sales',
        to: '/DayWiseSales',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Day Wise Profit Report',
        to: '/DayWiseProfit',
      },
      
    ],
  }
]

export default _nav
