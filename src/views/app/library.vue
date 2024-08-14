<template>
    <div class="h-full lib_container grid">

        <!-- Header -->
        <header class="lib_home p-2">
            <nav class="flex" aria-label="Breadcrumb">
                <div class="mr-3 flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </div>

                <Breadcrumb/>
            </nav>
            <div class="flex justify-between items-end">
                <span class="font-bold text-xl">Library</span>
                <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">
            <div class="body h-full overflow-y-auto">

                <!-- Lib menu(tabs) -->
                <div class="sticky top-0 z-20 bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 shadow-sm shadow-gray-300 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                        <li @click="libraryNavigator('videos')" class="me-2 cursor-pointer">
                            <span id="videos" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg" aria-current="page">Videos</span>
                        </li>
                        <li @click="libraryNavigator('photos')" class="me-2 cursor-pointer">
                            <span id="photos" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Photos</span>
                        </li>
                        <li @click="libraryNavigator('archives')" class="me-2 cursor-pointer">
                            <span id="archives" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Archives</span>
                        </li>
                        <li @click="libraryNavigator('documents')" class="me-2 cursor-pointer">
                            <span id="documents" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Documents</span>
                        </li>
                        <li @click="libraryNavigator('trash')" class="cursor-pointer">
                            <span id="trash" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Trash</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <folders/>
                </div>
            </div>

            <!-- Aside panel -->
            <div class="side_panel relative border-l border-l-gray-300 h-full p-2 w-64">
                <span class="font-bold text-md p-2">Starred files</span>
                <div class="absolute top-0 bottom-0 w-full overflow-y-auto">
                    <ul class="mt-10 p-2">
                        <li v-for="(item, index) in items" :key="index" class="mb-4">
                            <file/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import folders from '@/components/library/folders.vue'
    import file from '@/components/library/file.vue'
    import Breadcrumb from '@/components/breadcrumb.vue';

    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted } from 'vue';

    let innerRouter = useInnerRouter();
    let url = computed(() => innerRouter.ulrContainer)
    let libraryTabs: Array<HTMLElement> | null;

    onMounted(() => {
        innerRouter.rebuild("Library");
        libraryTabs = document.querySelectorAll(".libTab");
        let initTab = document.querySelector("#videos")
        innerRouter.push("videos")
        initTab?.parentElement?.dispatchEvent(new Event('click'));
    })

    let libraryNavigator = (tabName: string) => {
        libraryTabs?.forEach(tab => {
            if(tab.classList.contains("activeLibTab")){
                tab.classList.replace("activeLibTab", "inactiveLibTab")
            }
        })

        libraryTabs?.forEach(tab => {
            if(tab.id == tabName){
                tab.classList.replace("inactiveLibTab","activeLibTab")
                innerRouter.replaceLast(tabName)
            }
        });
    }

    let items = [{}, {}]

</script>

<style scoped>
    .lib_container{
        grid-template-rows: 13% 87%;
        grid-template-areas: "header" "main";
    }
    .lib_home{
        grid-area: header;
    }
    .main{
        grid-area: main;
        grid-template-columns:1fr auto;
        grid-template-areas: "body side_panel";
    }
    .body{
        grid-area: body;
    }
    .side_panel {
        grid-area: side_panel;
    }

    .activeLibTab {
        @apply text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
    }
    .inactiveLibTab {
        @apply border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300
    }
</style>