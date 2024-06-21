<template>
    <div class="card m-4 rounded-2xl">
      <DataTable
        class="p-4 rounded-lg"
        :value="shareData" 
        :rows="5" 
        :rowsPerPageOptions="[5, 10, 20, 50]" 
        tableStyle="min-width: 50rem"
        paginator
      >
        <Column
          :header="`排名`"
          class="border-2 border-gray-400 p-4 bg-sky-100"
        >
          <template #body="slotProps">
            <div class="flex items-center">
              <p>
                {{ slotProps.data.rank }}
              </p>
              <div class="mx-2">
                <i
                  v-if="slotProps.data.rank === 1"
                  class="pi pi-trophy text-amber-400 text-3xl"
                />
                <i
                  v-else-if="slotProps.data.rank === 2"
                  class="pi pi-trophy text-gray-400 text-2xl"
                />
                <i
                  v-else-if="slotProps.data.rank === 3"
                  class="pi pi-trophy text-yellow-700 text-xl"
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          :header="`姓名`"
          :field="`name`"
          class="border-2 border-gray-400 p-4 bg-sky-100"
        >
          <template #body="slotProps">
            <div class="flex items-center">
              <Avatar
                v-if="slotProps.data.image"
                :image="slotProps.data.image"
                class="mr-2"
                shape="circle" 
              />
              <Avatar
                v-else
                icon="pi pi-user"
                class="mr-2"
                shape="circle"
              />
              <p>
                {{ slotProps.data.name }}
              </p>
            </div>
          </template>
        </Column>
        <Column
          v-for="col of columns" 
          :key="col.field" 
          :field="col.field" 
          :header="col.header"
          class="border-2 border-gray-400 p-4 bg-sky-100"
        >
        </Column>
      </DataTable>
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
import cloneDeep from "lodash/cloneDeep";

onMounted(async () => {
  shareData.value = await getShareData();
  console.log(shareData.value);
});

const shareData = ref();
const getShareData = async () => {
  const q = query(collection(db, "Rank"), orderBy("shared", "desc"));
  const querySnapshot = await getDocs(q);
  const knowledgeBaseData = [];
  let rank = 1;
  querySnapshot.forEach((doc) => {
    const cloneData = cloneDeep({
      id: doc.id,
      rank: rank++,
      ...doc.data()
    });
    // cloneData.create_time = format(doc.data().create_time.seconds * 1000, "yyyy-MM-dd HH:mm");
    knowledgeBaseData.push(cloneData);
  });
  return knowledgeBaseData;
};

const columns = [
  { field: "dept", header: "部門" },
  { field: "shared", header: "分享數" }
];
</script>

<style scoped>
.p-paginator {
	background-color: rgb(224 242 254) !important;
}
</style>