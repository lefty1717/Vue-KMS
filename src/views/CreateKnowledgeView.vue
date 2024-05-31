<template>
    <div class="card bg-sky-100 m-10 p-2 justify-center rounded-2xl">
        <!-- 選擇公司或學校 -->
        <h1 class="text-xl">知識管理 > <span class="text-blue-700">新增文件</span></h1>
        <div class="flex flex-row content-center my-4">
            <p class="text-nowrap content-center mx-4">知識分類: </p>
            <Dropdown 
                v-model="selectedType" 
                :options="type" 
                optionLabel="name"
                placeholder="選擇部門或科系" 
                checkmark
                :highlightOnSelect="false" 
                class="w-full md:w-14rem" 
            />
        </div>
        <!-- 選擇部門或科系 -->
        <div class="flex flex-row content-center">
            <p class="text-nowrap content-center mx-4">科系部門: </p>
            <Dropdown 
                v-model="selectedDept" 
                :options="deptOptions"
                optionLabel="name"
                placeholder="選擇部門或科系" 
                checkmark
                :highlightOnSelect="false" 
                class="w-full md:w-14rem" 
            />
        </div>
        <div class="flex flex-row content-center my-4">
          <p class="m-4 whitespace-nowrap">
            文件說明:
          </p>
          <Editor
            class="w-full"
            v-model="value" 
            editorStyle="height: 320px" 
          />
        </div>
        <!-- 上傳檔案 -->
        <div class="my-4 flex flex-row">
          <p class="w-fit mx-4 whitespace-nowrap">新增檔案:</p>
          <div class="w-full">
            <Toast />
            <FileUpload
              name="demo[]" 
              url="/api/upload" 
              @upload="onTemplatedUpload($event)" 
              :multiple="true" 
              accept="image/*" 
              :maxFileSize="1000000" 
              @select="onSelectedFiles"
            >
                <template #header="{ chooseCallback, clearCallback, files }">
                    <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                        <div class="flex gap-2 justify-between w-full">
                            <Button
                                class="text-green-400 border-2 border-green-400"
                                @click="chooseCallback()" 
                                icon="pi pi-images" 
                                rounded 
                                outlined 
                            />
                            <Button
                                class="text-red-400 border-2 border-red-400"
                                :disabled="!files || files.length === 0"
                                icon="pi pi-times" 
                                rounded 
                                outlined 
                                severity="danger" 
                                @click="clearCallback()" 
                            />
                        </div>
                        <ProgressBar 
                          :value="totalSizePercent" 
                          :showValue="false" 
                          :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                        >
                            <span class="white-space-nowrap">
                              {{ totalSize }}B / 1Mb
                            </span>
                        </ProgressBar>
                    </div>
                </template>

                <template #content="{ files, removeFileCallback }">
                    <div v-if="files.length > 0">
                        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="flex flex-col justify-center content-center text-center items-center">
                        <i class="flex justify-center pi pi-cloud-upload rounded-full p-5 text-8xl text-400 w-36 text-gray-500 border-2 border-gray-500" />
                        <p class="mt-4 mb-0 text-center">拖曳檔案至此上傳。</p>
                    </div>
                </template>
            </FileUpload>
          </div>
        </div>
        <div class="flex justify-end my-4">
          <Button
            class="text-lg p-2 bg-slate-100 text-gray-700"
            label="上傳檔案"
            raised="true"
            rounded
          />
        </div>
    </div>
</template>

<script setup>
// vue
import { ref, watch } from "vue";
// primevue
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import { usePrimeVue } from "primevue/config";
import Toast from "primevue/toast";
import ProgressBar from "primevue/progressbar";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Editor from "primevue/editor";

// db
import { db } from "@/_firebase/firebase_setting";
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
// 公司或學校選項
const selectedType = ref();
const type = ref([
  {
    name: "公司部門"
  },
  {
    name: "學校科系"
  }
]);
// watch 公司或學校選項
watch(selectedType, async () => {
  deptOptions.value = await getDeptOptions().then((res) => {
    return res;
  });
});
// 取得部門選項資料
const selectedDept = ref();
const deptOptions = ref([]);
const getDeptOptions = async () => {
  console.log(selectedType);
  const q = query(collection(db, "Catalog"), where("cat_cn", "==", selectedType.value.name), orderBy("order", "desc"));
  const querySnapshot = await getDocs(q);

  const deptData = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    deptData.push(data);
  });
  return deptData;
};

// 上傳檔案
import { useToast } from "primevue/usetoast";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const uploadData = () => {
  totalSizePercent.value = totalSize.value / 10;

  // Get a non-default Storage bucket
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://my-custom-bucket");
};

const onTemplatedUpload = () => {
  toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

</script>