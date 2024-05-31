
<template>
  <div class="bg-blue-100 mx-8 rounded-xl">
    <div class="flex flex-row">
      <div class="w-1/2">
        <p class="mx-4 text-lg">最新文件</p>
        <div
        v-for="(item, index) in knowledgeBaseData"
        :key="index"
        class="flex flex-column align-items-center justify-content-between m-4"
        >
          <Avatar
            class="flex align-items-center justify-content-center mr-2"
            image="data:image/jpeg;base64,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"
            size="large"
            shape="circle"
          />
          <a
            :href="`/knowledge-detail/${item.id}`"
            class="!items-center justify-content-center"
          >
            <p class="text-lg text-blue-500">{{ item.title }}</p>
            <p class="text-sm">{{ item.category_cn }}</p>
            <p class="text-sm text-slate-500">本文由 {{ item.creator }} 建立</p>
          </a>
        </div>
      </div>
      
      <div>
        <p class="mx-4 text-lg">使用統計</p>
        <p>本日登入人數：</p>
        <p>本日新增文件數：</p>
        <p>本日更新文件數：</p>
        <p>本日文件下載數：</p>
      </div>
    </div>

    <div>
      <h1 class="mx-4 text-lg">最新討論</h1>

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

const getKnowledgeBaseData = async () => {
  const q = query(collection(db, "KnowledgeBase"), orderBy("create_time", "desc"), limit(5));
  const querySnapshot = await getDocs(q);
  const knowledgeBaseData = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    knowledgeBaseData.push(data);
  });
  return knowledgeBaseData;
};
  
const knowledgeBaseData = ref([]);
onMounted(async () => {
  await getKnowledgeBaseData().then((data) => {
    knowledgeBaseData.value = data;
  });
  console.log("knowledgeBaseData", knowledgeBaseData.value);
});
</script>