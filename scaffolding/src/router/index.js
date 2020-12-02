import Vue from 'vue'
import VueRouter from 'vue-router'
// Vue自带测试测试接口
//测试案列
import Button from '../testing/Button.vue'; 
import Field from '../testing/Field.vue'; 
import Header from '../testing/Header.vue'; 
import Cart from '../testing/Cart.vue';
import Me from '../testing/Me.vue';
import Swiper from '../testing/Swiper.vue';
import Navbar from '../testing/Navbar.vue';
import Test from '../testing/test.vue';
// 项目接口
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Article from '../views/Article.vue';
import Home from '../views/Home.vue'




Vue.use(VueRouter)
const routes = [
    {
        path:'/test',
        component:Test
    },
    {
        path:'/article/:id',
        component:Article
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/navbar',
        component:Navbar
    },
    {
        path:'/swiper',
        component:Swiper
    },
    {
        path:'/me',
        component:Me
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/header',
        component:Header
    },
    {
        path:'/field',
        component:Field
    },
    {
        path:'/',
        component:Home
    },
    {
        path:'/button',
        component:Button
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router