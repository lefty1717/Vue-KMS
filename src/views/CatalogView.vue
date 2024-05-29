<template>
    <div class="card m-10 bg-sky-100 p-4 flex flex-col rounded-2xl">
        <div>
            <p class="text-2xl">公司部門</p>
        </div>
        <div class="flex flex-row m-4 flex-wrap">
            <div 
                v-for="(item, index) in catalogData" 
                :key="index" 
                class="flex flex-row m-2"
            >
                <router-link :to="`/catalog/${item.route}`">
                <Button
                    class="flex flex-row flex-nowrap text-nowrap border-2 border-neutral-400 p-1"
                >
                    <span class="pi pi-folder mx-2 content-center" />
                    <p>{{ item.name }}</p>
                </Button>
                </router-link>
            </div>
        </div>

        <div>
            <p class="text-2xl">學校科系</p>
        </div>
        <div class="flex flex-row m-4 flex-wrap">
            <div 
                v-for="(item, index) in schoolData" 
                :key="index" 
                class="flex flex-row m-2"
            >
                <router-link :to="`/catalog/${item.route}`">
                <Button
                    class="flex flex-row flex-nowrap text-nowrap border-2 border-neutral-400 p-1"
                >
                    <span class="pi pi-folder mx-2 content-center" />
                    <p>{{ item.name }}</p>
                </Button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
// vue
import { onMounted, ref } from "vue";
// primevue
import Button from "primevue/button";
// firebase
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db } from "@/_firebase/firebase_setting";

const getCompanyCat = async () => {
  const q = query(collection(db, "Catalog"), where("category", "==", "company"), orderBy("order", "desc"));
  const querySnapshot = await getDocs(q);
    
  const catalogData = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    catalogData.push(data);
  });
  return catalogData;
};
const getSchoolCat = async () => {
  const q = query(collection(db, "Catalog"), where("category", "==", "school"));
  const querySnapshot = await getDocs(q);
    
  const schoolData = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    schoolData.push(data);
  });
  return schoolData;
};

const catalogData = ref([]);
const schoolData = ref([]);
onMounted(async () => {
  await getCompanyCat().then((data) => {
    catalogData.value = data;
  });
  console.log("catalogData", catalogData.value);
  await getSchoolCat().then((data) => {
    schoolData.value = data;
  });
  console.log("schoolData", schoolData.value);
});
</script>
