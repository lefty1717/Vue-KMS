<template>
    <div class="card bg-sky-100 m-10 p-2 justify-content-center flex flex-col h-full rounded-lg">
      <!-- header -->
      <div>
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

      <!-- content -->
      <div>
        <p class="text-xl">
          {{ knowledgeData.content }}
        </p>
      </div>

      <!-- file download -->
      <div>
        <DataTable
          :value="knowledgeData.file"
          tableStyle="min-width: 50rem"
          showGridlines
        >
          <Column 
            v-for="(item, index) in columnConfig" 
            :key="index"
            :header="item.header"
            :field="item.field"
          />
          <Column
            header="下載"
          >
            <template #body="{data}">
                <Button
                  icon="pi pi-download"
                  @click="downloadFile(data.url)"
                  class="boarder-2 p-button-rounded p-button-outlined p-button-text flex justify-center items-center"
                >
                  <i class="pi pi-file text-sky-600" />
                  <p class="text-sky-600">下載檔案</p>
                </Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
</template>

<script setup>
// vue
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// primevue
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";   // optional
import Row from "primevue/row";                   // optional
// firebase
import { db } from "@/_firebase/firebase_setting";
import { getDoc, doc } from "firebase/firestore";
import { getStorage, ref as firebaseRef, getDownloadURL } from "firebase/storage";
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
onMounted(async () => {
  knowledgeId.value = getKnowledgeId();
  knowledgeData.value = await getKnowledgeBaseData();

  console.log("knowledgeId", knowledgeId.value);
  console.log("knowledgeData", knowledgeData.value);
});

const storage = getStorage();
const columnConfig = [
  {
    header: "檔案名稱",
    field: "name"
  },
  {
    header: "檔案大小",
    field: "size"
  }
];
const downloadFile = async (path) => {
  const storageRef = firebaseRef(storage, path);
  console.log(storageRef);
  const url = await getDownloadURL(storageRef);
  window.open(url, "_blank");
};
</script>
