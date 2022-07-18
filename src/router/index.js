import Vue from "vue";
import VueRouter from "vue-router";
import ProductsView from "../views/ProductsView.vue";
import HomeView from "../views/HomeView.vue";
import AddProducts from "../views/AddProducts.vue";
import CheckoutView from "../views/CheckoutView.vue";
import ShoppingView from "../views/ShoppingView.vue";
import ProductsInfo from "../views/InfoProduct.vue"
import HomeInfo from "../views/InfoHome.vue"
import { currentUserPromise } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home/:id",
    name: "home/:id",
    component: HomeInfo,
  },
  //SOLO PUEDE TENER ACCESO EL ADMIN
  {
    path: "/addproducts",
    name: "addproducts",
    component: AddProducts,
    meta: {
      admin: true,
      auth: true,
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/",
    name: "products",
    component: ProductsView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/products/:id",
    name: "products/:id",
    component: ProductsInfo,
    meta: {
      auth: true,
    },
  },
  {
    path: "/shopping",
    name: "shopping",
    component: ShoppingView,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.auth;
  const requireAdmin = to.meta.admin;
  const user = await currentUserPromise();
  //USUARIOS REGISTRADO
  if (requireAuth) {
    if (user) {
      next();
    } else {
      next("/home");
    }
  } else {
    next();
  }
  //ADMIN
  if (requireAdmin) {
    if (user.email == "thea@test.com") {
      next();
    } else {
      next("/home");
    }
  } else {
    next();
  }
});



export default router;
