import {createRouter, createWebHistory} from 'vue-router'

import start_POS from '../components/start_POS.vue'

import admin_login from '../components/admin_login.vue'
import customer_login from '../components/customer_login.vue'
import staff_login from '../components/staff_login.vue'
import chef_login from '../components/chef_login.vue'

import menu_page from '../components/menu_page.vue'
import chart_list from '../components/chart_list.vue'
import admin_display from '../components/admin_display.vue'

const routes = [
    { path: '/', name: 'start_POS', component: start_POS },
    { path: '/admin_login', name: 'admin_login', component: admin_login },
    { path: '/staff_login', name: 'staff_login', component: staff_login },
    { path: '/customer_login', name: 'customer_login', component: customer_login },
    { path: '/chef_login', name: 'chef_login', component: chef_login },
    { path: '/menu_page', name: 'menu_page', component: menu_page,},
    { path: '/chart_list', name: 'chart_list', component: chart_list},
    { path: '/admin_display', name: 'admin_display', component: admin_display },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router 