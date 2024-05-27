import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import KnowledgeBaseView from "@/views/KnowledgeBaseView.vue";
import KnowledgeDetailVue from "@/views/DetailView.vue";
// import CreateKnowledgeView from "@/views/CreateKnowledgeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
      // component: () => import("../views/HomeView.vue")
    },
    {
      path: "/knowledge-base",
      name: "KnowledgeBase",
      component: KnowledgeBaseView
    },
    {
      path: "/knowledge-detail/:id",
      name: "KnowledgeDetail",
      component: KnowledgeDetailVue
    }
  ]
});

export default router;
