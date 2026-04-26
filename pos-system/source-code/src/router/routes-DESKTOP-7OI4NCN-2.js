import {createRouter, createWebHistory} from 'vue-router'
import admin_login from '../components/admin_login.vue'
import customer_login from '../components/customer_login.vue'
import chef_login from '../components/chef_login.vue'

const routes = [
    { path: '/admin_login', name: 'admin_login', component: admin_login },
    { path: '/customer_login', name: 'customer_login', component: customer_login },
    { path: '/chef_login', name: 'chef_login', component: chef_login },
    { path: '/menu_page', name: 'menu_page', component: menu_page }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router 