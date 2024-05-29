
<template>
    <div class="card mx-14">
        <DataView :value="knowledgeBaseData" paginator :rows="5">
            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                      <router-link :to="`/knowledge-detail/${item.id}`">
                      <Button class="w-full">
                        <div class="flex flex-column w-full sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="md:w-10rem relative">
                                <img class="block xl:block mx-auto border-round w-full" :src="`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-iNLZ5A_dQOywQy8KwIW6c8T1HqRpxtQ38T8qtFbiA&s`" :alt="item.title" />
                            </div>
                            <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                <div class="flex flex-column md:flex-col justify-content-between align-items-start gap-2">
                                    <div>
                                        <div class="text-lg font-bold text-900 mt-2 ">
                                          {{ item.title }}
                                        </div>
                                        <span class="font-medium text-secondary text-sm">
                                          {{ item.category_cn }}
                                        </span>
                                    </div>
                                    <div class="">

                                    </div>
                                </div>
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
// db
import { db } from "@/_firebase/firebase_setting";
import { collection, getDocs, query, where } from "firebase/firestore";

const route = useRoute();
const knowledgeBaseData = ref([]);
const getKnowledgeBaseData = async () => {
  const q = query(collection(db, "KnowledgeBase"), where("category", "==", route.params.catalogName));
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

onMounted(async () => {
  await getKnowledgeBaseData().then((data) => {
    knowledgeBaseData.value = data;
  });
  console.log("knowledgeBaseData", knowledgeBaseData.value);
});
</script>
