import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shiritori from "../views/Shiritori.vue";
import MonsterSlayer from "../views/MonsterSlayer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shiritori",
    name: "Shiritori",
    component: Shiritori,
  },
  {
    path: "/monster_slayer",
    name: "MonsterSlayer",
    component: MonsterSlayer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
