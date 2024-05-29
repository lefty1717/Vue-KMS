<template>
    <div class="card flex flex-col justify-content-center bg-sky-100 m-10 p-2 h-full rounded-lg">
        <p class="text-4xl text-sky-800">
          {{ knowledgeData.title }}
        </p>
        <div class="flex flex-row justify-between text-gray-500 m-2">
          <p class="text-2xl">
            {{ knowledgeData.category_cn }}
          </p>
          <p>由 {{ knowledgeData.creator }} 於 {{ knowledgeData.create_time }} 建立</p>
        </div>
    </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/_firebase/firebase_setting";
// tools
import { fromUnixTime, format } from "date-fns";

const route = useRoute();

const knowledgeId = ref("");
const getKnowledgeId = () => {
  return route.params.id;
};

const timeStampToDate = (timestamp) => {
  return format(fromUnixTime(timestamp), "yyyy-MM-dd HH:mm:ss");
};

const getKnowledgeBaseData = async () => {
  const snapShop = await getDoc(doc(db, "KnowledgeBase", knowledgeId.value));
  let knowledgeData = snapShop.data();
  knowledgeData.create_time = format(new Date(timeStampToDate(snapShop.data().create_time.seconds)), "yyyy-MM-dd");
  console.log("knowledgeData", knowledgeData);
  return knowledgeData;
};
const knowledgeData = ref({});
const getData = onMounted(async () => {
  knowledgeId.value = getKnowledgeId();
  knowledgeData.value = await getKnowledgeBaseData();

  console.log("knowledgeId", knowledgeId.value);
  console.log("knowledgeData", knowledgeData.value);
});
</script>
