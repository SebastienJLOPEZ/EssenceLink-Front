import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import AboutView from '../views/AboutView.vue';
import ProfileView from '../views/ProfileView.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: "/login",
    name: "LoginView", 
    component: LoginView,
},
{
    path: "/signup",
    name: "SignupView", 
    component: SignupView,
},
{
  path: "/profile",
  name: "ProfileView", 
  component: ProfileView,
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
