<template>
    <div class="h-full container grid grid-row-2">
        <header class="header p-2">
            <nav class="flex" aria-label="Breadcrumb">
                <div class="mr-3 flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </div>
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <span class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Profile
                        </span>
                    </li>
                    <li>
                    <div class="flex items-center">
                        /
                        <span class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Privacy</span>
                    </div>
                    </li>
                    <li aria-current="page">
                        /
                        <span class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">my_file</span>
                    </li>
                </ol>
            </nav>
            <div class="flex justify-between items-end">
                <span class="font-bold text-xl">Home</span>
                <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                </button>
            </div>
        </header>
        <div class="main grid grid-col-2 border-t border-t-gray-300">
            <div class="body p-2"></div>
            <div class="side_panel border-l border-l-gray-300 p-2 w-64"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .container{
        grid-template-rows: auto 1fr;
        grid-template-areas: "header" "main";
    }
    .header{
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
</style>