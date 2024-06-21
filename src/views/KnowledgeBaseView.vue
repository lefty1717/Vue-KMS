
<template>
    <div class="card mx-14">
        <DataView 
          class="p-4 rounded-lg border-2"
          :value="knowledgeBaseData" 
          paginator 
          :rows="5"
        >
          <!-- header -->
          <template #header>
            <div class="flex justify-between border-b-2 border-gray-400 pb-4">
              <div>
                <p class="text-3xl">
                  {{ identifyDeptType() }}
                </p>
              </div>
              <div class="">
                <InputText 
                  class="border-2 p-2 border-gray-200 rounded-3xl"
                  type="text" 
                  v-model="search"
                  placeholder="Search..." 
                />
                <!-- <i class="pi pi-search" /> -->
              </div>
            </div>
          </template>

          <!-- content -->
          <template #list="slotProps">
            <div class="border-b-2 border-gray-200">
              <div 
                v-for="(item, index) in slotProps.items" 
                :key="index" 
                class="border-gray-300 border-b-2 py-4"
              >
                <router-link :to="`/knowledge-detail/${item.id}`">
                  <Button>
                        <img
                          class="border-round w-20" 
                          :src="`https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png`" 
                          :alt="item.title" 
                        />
                        <div class="flex flex-col">
                          <p class="flex text-xl font-bold">
                            {{ item.title }}
                          </p>
                          <p class="flex">
                            {{ item.category_cn }}
                          </p>
                          <p class="flex">
                            {{ item.creator }} 於 {{ item.create_time }} 建立
                          </p>
                          <div class="flex flex-row">
                            <p
                              v-for="(tag, index) in item.tag" 
                              :key="index"
                              class="mx-2 text-gray-400"
                            >
                              #  {{ tag }}
                            </p>
                          </div>
                        </div>
                  </Button>
                </router-link>
              </div>
            </div>
          </template>
        </DataView>
    </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// primevue
import DataView from "primevue/dataview";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
// db
import { db } from "@/_firebase/firebase_setting";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// tools
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";

const route = useRoute();
const knowledgeBaseData = ref([]);
const getKnowledgeBaseData = async () => {
  const q = query(collection(db, "KnowledgeBase"), where("category", "==", route.params.catalogName), orderBy("create_time", "desc"));
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

onMounted(async () => {
  await getKnowledgeBaseData().then((data) => {
    knowledgeBaseData.value = data;
  });
  console.log("knowledgeBaseData", knowledgeBaseData.value);
});

const search = ref("");


const identifyDeptType = () => {
  const dept = route.params.catalogName;
  if (dept == "HR")
    return "人事部門";
  else if (dept == "sales")
    return "銷售部門";
  else if (dept == "IT")
    return "資訊部門";
  else if (dept == "marketing")
    return "行銷部門";
  else if (dept == "R&D")
    return "研發部門";
  else if (dept == "finance")
    return "財務部門";
  else if (dept == "procurement")
    return "採購部門";
  else (dept == "s-other");
  return "其他";
};
</script>
