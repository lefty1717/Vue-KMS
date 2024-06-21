<template>
    <div>
        <Dialog 
            v-model:visible="visible"
            modal
            :style="{ width: '25rem' }"
        >
            <template #header>
                <div class="justify-center items-center w-full">
                    <p class="text-2xl">成就達成</p>
                </div>
            </template>

            <div class="flex flex-col justify-center">
                <p class="text-3xl text-center">恭喜獲得！</p>
                <div class="flex justify-center items-center">
                    <i class="pi pi-gift mr-2" />
                    <p class="text-2xl my-4 text-center">100點</p>
                </div>
                <p class="text-gray-500 text-center">分享第一篇文章。</p>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import Dialog from "primevue/dialog";

import { ref } from "vue";

const visible = ref(true);

</script>