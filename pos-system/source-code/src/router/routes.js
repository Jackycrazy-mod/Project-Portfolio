import {createRouter, createWebHistory} from 'vue-router'

import start_POS from '../components/start_POS.vue'

import admin_login from '../components/admin_login.vue'
import staff_login from '../components/staff_login.vue'


import menu_page from '../components/menu_page.vue'
import chart_list from '../components/chart_list.vue'
import order_confirmed from '../components/order_confirmed.vue'
import chef_display_list from '../components/chef_display_list.vue'


// import admin
import admin_dashboard from '../components/admin_dashboard.vue'
//import admin_display from '../components/admin_display.vue'
import admin_menu from '../components/admin_menu.vue'
import admin_user from '../components/admin_user.vue'
import admin_order from '../components/admin_order.vue'
import admin_staff from '../components/admin_staff.vue'

const routes = [
    { path: '/start_POS', name: 'start_POS', component: start_POS },
    { path: '/admin_login', name: 'admin_login', component: admin_login },
    { path: '/staff_login', name: 'staff_login', component: staff_login },


    //customer
    { path: '/', name: 'menu_page', component: menu_page, props:(route)=>({shoppingChart : route.params.shoppingChart}) },
    { path: '/chart_list', name: 'chart_list', component: chart_list},
    { path: '/order_confirmed', name: 'order_confirmed', component: order_confirmed},

    //admin
    { path: '/admin_staff', name: 'admin_staff', component: admin_staff},
    { path: '/admin_order', name: 'admin_order', component: admin_order},
    { path: '/admin_dashboard', name: 'admin_dashboard', component: admin_dashboard },
    { path: '/admin_menu', name: 'admin_menu', component: admin_menu },
    { path: '/admin_user', name: 'admin_user', component: admin_user },
    //{ path: '/admin_display', name: 'admin_display', component: admin_display },

    //chef
    { path: '/chef_display_list', name: '/chef_display_list', component: chef_display_list},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router 