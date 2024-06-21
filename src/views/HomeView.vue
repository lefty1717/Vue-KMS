
<template>
  <div class="bg-blue-100 mx-8 rounded-xl p-4">
    <div class="flex flex-row">
      <!--  最新文件  -->
      <div class="w-1/2">
        <p class="pi pi-file m-4 text-2xl">最新文件</p>
        <div
        v-for="(item, index) in knowledgeBaseData"
        :key="index"
        class="flex flex-column align-center items-center content-center m-4"
        >
          <Avatar
            class="flex align-items-center justify-content-center mr-2 content-center items-center"
            image="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
            size="large"
            shape="circle"
          />
          <a
            :href="`/knowledge-detail/${item.id}`"
            class="!items-center justify-content-center"
          >
            <p class="text-lg text-blue-500">
              {{ item.title }}
            </p>
            <p class="text-sm">
              {{ item.category_cn }}
            </p>
            <p class="text-sm text-slate-500">
              本文由 {{ item.creator }} 於 {{item.create_time}} 建立
            </p>
          </a>
        </div>
      </div>
      <!-- 使用統計 -->
      <div>
        <p class="pi pi-chart-line my-4 text-2xl">使用統計</p>
        <p>本日登入人數： 234</p>
        <p>本日新增文件數：60</p>
        <p>本日更新文件數：8</p>
        <p>本日文件下載數：75</p>
      </div>
    </div>
    <!-- 最新討論 -->
    <div>
      <div class="w-1/2">
        <h1 class="mx-4 text-2xl pi pi-comments">
          最新討論
        </h1>
        <div
          v-for="(item, index) in shareData"
          :key="index"
          class="flex flex-column align-center items-center content-center m-4"
        >
          <Avatar
            class="flex align-items-center justify-content-center mr-2 content-center items-center"
            image="https://media.istockphoto.com/id/1452740305/zh/%E5%90%91%E9%87%8F/forum-icon-in-vector-logotype.jpg?s=612x612&w=0&k=20&c=9cMV5tOXSJRP_-R_LthRKcnqVYlf_xNdrjguKdw_Uoo="
            size="large"
            shape="circle"
          />
          <a
            :href="`/knowledge-detail/${item.id}`"
            class="!items-center justify-content-center"
          >
          <p class="text-lg text-blue-500">
              {{ item.title }}
            </p>
            <p class="text-sm">
              {{ item.category_cn }}
            </p>
            <p class="text-sm text-slate-500">
              本文由 {{ item.creator }} 於 {{item.create_time}} 建立
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
// primevue
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";   //Optional for grouping
// db
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import { db } from "@/_firebase/firebase_setting";
// tools
import { fromUnixTime, format } from "date-fns";
import { cloneDeep } from "lodash";

const getKnowledgeBaseData = async () => {
  const q = query(collection(db, "KnowledgeBase"), orderBy("create_time", "desc"), limit(5));
  const querySnapshot = await getDocs(q);
  const knowledgeBaseData = [];
  querySnapshot.forEach((doc) => {
    const cloneData = cloneDeep({
      id: doc.id,
      ...doc.data()
    });
    cloneData.create_time = format(doc.data().create_time.seconds * 1000, "yyyy-MM-dd HH:mm");
    knowledgeBaseData.push(cloneData);
  });
  return knowledgeBaseData;
};

const shareData = ref([]);
const getShareData = async () => {
  const q = query(collection(db, "KnowledgeShare"), orderBy("create_time", "desc"), limit(7));
  const querySnapshot = await getDocs(q);
  const knowledgeBaseData = [];
  querySnapshot.forEach((doc) => {
    const cloneData = cloneDeep({
      id: doc.id,
      ...doc.data()
    });
    cloneData.create_time = format(doc.data().create_time.seconds * 1000, "yyyy-MM-dd HH:mm");
    knowledgeBaseData.push(cloneData);
  });
  return knowledgeBaseData;
};
  
const knowledgeBaseData = ref([]);
onMounted(async () => {
  await getKnowledgeBaseData().then((data) => {
    knowledgeBaseData.value = data;
  });
  await getShareData().then((data) => {
    shareData.value = data;
  });
  console.log("knowledgeBaseData", knowledgeBaseData.value);
  console.log("shareData", shareData.value);
});
</script>