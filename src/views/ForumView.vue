<template>
  <div class="card m-4 rounded-2xl">
      <DataTable
        :value="shareData" 
        :rows="5" 
        :rowsPerPageOptions="[5, 10, 20, 50]" 
        class="p-4 rounded-lg border-2 border-gray-400"
        tableStyle="min-width: 50rem"
        paginator
      >
        <!-- 類型 -->
        <Column
            class="border-b-2 whitespace-nowrap font-semibold text-lg"
        >
            <template #header>
                <div>
                    <p class="text-xl">
                        類型
                    </p>
                </div>
            </template>
            <template #body="slotProps">
                <div class="flex justify-center items-end h-full content-end">
                    {{ slotProps.data.category_cn }}
                </div>
            </template>
        </Column>
        <!-- 內容 -->
        <Column
            class="border-b-2"
        >
            <template #header>
                <div>
                    <p class="text-xl">
                        
                    </p>
                </div>
            </template>
            <template #body="slotProps">
                <div class="flex">
                    <img
                        :src="slotProps.data.image"
                        class="w-24 mx-2"
                    >
                    <div>
                        <p class="text-2xl mb-2">
                            {{ slotProps.data.title }}
                        </p>
                        <p class="text-gray-400">
                            {{ slotProps.data.content }}
                        </p>
                    </div>
                </div>
            </template>
        </Column>
        <!-- 討論數 -->
        <Column
            class="border-b-2 whitespace-nowrap"
        >
            <template #header>
                <div>
                    <p class="text-xl">
                        討論數
                    </p>
                </div>
            </template>
            <template #body="slotProps">
                <div>
                    {{ slotProps.data.comments.length }}
                </div>
            </template>
        </Column>
        <!-- 評價 -->
        <Column
            class="border-b-2 whitespace-nowrap"
        >
            <template #header>
                <div>
                    <p class="text-xl">
                        評價
                    </p>
                </div>
            </template>
            <template #body="slotProps">
                <div class="flex items-end h-full content-end">
                    <i 
                        v-for="n in slotProps.data.stars"
                        :key="n" 
                        class="pi pi-star-fill text-yellow-400"
                    />
                </div>
            </template>
        </Column>
        <!-- 時間 -->
        <Column
            class="border-b-2 whitespace-nowrap"
        >
            <template #header>
                <div>
                    <p class="text-xl">
                        建立時間
                    </p>
                </div>
            </template>
            <template #body="slotProps">
                <div>
                    <p>
                        由 {{ slotProps.data.creator }}
                    </p>
                    <p>
                        於 {{ slotProps.data.create_time }} 建立
                    </p>
                </div>
            </template>
        </Column>
      </DataTable>
      
      <GainCredits />
    </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
// primevue
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";   // optional
import Row from "primevue/row";                   // optional
import Avatar from "primevue/avatar";
// db
import { db } from "@/_firebase/firebase_setting";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
// tools
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";
// components
import GainCredits from "../components/GainCredits.vue";

onMounted(async () => {
  shareData.value = await getShareData();
  console.log(shareData.value);
});


const shareData = ref();
const getShareData = async () => {
  const q = query(collection(db, "KnowledgeShare"), orderBy("create_time", "desc"));
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

const columns = [
  { field: "dept", header: "部門" },
  { field: "shared", header: "分享數" }
];
</script>