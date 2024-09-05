<template>
  <div class="spaceMessage w-64 flex flex-col leading-1.5 p-2 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
    <div class="flex items-center justify-between rtl:space-x-reverse">
      <span class="text-xs font-normal text-gray-500 dark:text-white">{{ sender }}</span>
      <img class="w-5 h-5 rounded-full" src="/assets/face2.webp" alt="Jese image" />
    </div>
    <p class="text-xs font-normal text-gray-900 dark:text-white">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
    let props = defineProps({
        message: String,
        sender: String
    })
</script>
