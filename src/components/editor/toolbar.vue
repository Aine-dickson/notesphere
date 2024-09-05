<template>
    <div class="flex justify-between p-2 items-end bg-gray-400">
        <div class="flex space-x-3">
            <span id="fileDropdownLink" data-dropdown-toggle="fileDropdown" class="cursor-pointer">File</span>
            <div id="fileDropdown" class="z-10 hidden font-normal divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <files_tab/>
            </div>
            <span  id="insertDropdownLink" data-dropdown-toggle="insertDropdown" class="cursor-pointer">Insert</span>
            <div id="insertDropdown" class="z-10 hidden font-normal divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <insert_tab/>
            </div>
            <div v-if="loaded_file.name.length > 0" id="fileNameField" @focusout="save_as" data-tooltip-target="file_name" contenteditable="true" class="hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-slate-300">
                {{ fileName }} h
            </div>
            <div id="file_name" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Rename file
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>

        <form class="max-w-xl">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search document..." required />
            </div>
        </form>

        <div class="flex space-x-1 bg-gray-300 rounded-md">
            <button type="button" class="text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium text-sm px-2 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Edit</button>
            <button type="button" class="text-gray-900 hover:text-white hover:bg-gray-900 font-medium text-sm px-2 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Preview</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import files_tab from './files_tab.vue';
    import insert_tab from './insert_tab.vue'

    import { computed, onMounted, ref } from 'vue';
    import { initDropdowns, initTooltips } from 'flowbite';
    import { useFileStore } from '@/stores/fileStore';

    let fileStore = useFileStore()
    let fileNameElement: HTMLElement | null;
    let loaded_file = computed(() => fileStore.loaded_file)
    let fileName: string | undefined = loaded_file.value.name;

    onMounted(() => {
      initDropdowns()  
      initTooltips()

      fileNameElement = document.querySelector('#fileNameField')
      fileNameElement?.addEventListener('input', ()=> {
        fileName = fileNameElement?.innerText
      })
    })

    let save_as = () => {
        if (fileName == undefined || fileName.length < 1) {
            return
        }

        if (loaded_file.value != undefined) {
            
            fileStore.save_file_as(fileName)
        }
    }
</script>