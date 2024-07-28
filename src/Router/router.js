import { createRouter, createWebHistory } from "vue-router";
import CartPage from "@/Pages/CartPage.vue";
// import App from "@/App.vue";
import HomePage from "@/Pages/HomePage.vue";
import ProductsComponent from "@/components/ProductsComponent.vue";
import MainPage from "@/Pages/MainPage.vue";
const routesUrl = [
  // in router.js add all pages path and routes to that page
  {path:'/',component:MainPage,},
  {path:'/ProductsComponent',ProductsComponent},
  {path:'/HomePage',component:HomePage,},
  { path: "/CartPage", component: CartPage },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes: routesUrl,
});
export default router;
