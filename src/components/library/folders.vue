<template>
    <div>
        <div>
            <div class="relative inline-flex items-center justify-center w-full z-1">
                <span class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">Folders</span>
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <div class="px-3 absolute right-0 bg-white dark:text-white dark:bg-gray-900">

                    <!-- Folder addition button -->
                    <svg @click="libraryStore.changeCreationState(true, 'folder')" data-tooltip-target="create_folder" data-tooltip-placement="left" class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                    </svg>
                    <div id="create_folder" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip text-nowrap dark:bg-gray-700">
                        Create new
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>
            <div class="p-2 px-4" :class="{'grid grid-cols-3 gap-2': selectedLibrary.value.folders.length > 0}">

                <!-- Folder card component -->
                <div @click="libraryStore.selectFolder(folder.id)" v-if="selectedLibrary.value.folders.length > 0" v-for="folder in selectedLibrary.value.folders" class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <svg class="w-6 h-6 mb-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
                    </svg>
                    <h2 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{{ folder.name }}</h2>
                    <p v-if="selectedTab == 'videos'" class="font-normal text-gray-500 dark:text-gray-400">{{ folder.library }} videos</p>
                    <p v-if="selectedTab == 'photos'" class="font-normal text-gray-500 dark:text-gray-400">{{ folder.library }} photos</p>
                    <p v-if="selectedTab == 'documents'" class="font-normal text-gray-500 dark:text-gray-400">{{ folder.library }} documents</p>
                </div>
                <div v-else class="flex flex-col items-center justify-center">
                    <span>No folders in {{ libraryStore.selectedLibrary.value.name }} yet</span>
                    <span @click="libraryStore.changeCreationState(true, 'folder')" class="text-blue-600 cursor-pointer">Create one?</span>
                </div>
            </div>
        </div>

        <!-- On folder selection, only the content of the selected folder shall be acessed here -->
        <div v-if="selectedFolder.name.length > 0">
            <div class="relative inline-flex items-center justify-center w-full z-1">
                <span v-if="selectedTab == 'videos'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All Videos</span>
                <span v-if="selectedTab == 'documents'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All documents</span>
                <span v-if="selectedTab == 'photos'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All photos</span>
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <span v-if="selectedTab == 'video'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ selectedFolder.videos.length }} videos</span>
                <span v-if="selectedTab == 'documents'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ selectedFolder.documents.length }} documents</span>
                <span v-if="selectedTab == 'photos'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ selectedFolder.photos.length }} photos</span>
            </div>
            <div class="p-2 px-4 grid grid-cols-3 gap-2">
                
                <!-- Video card component -->
                <div v-if="selectedTab == 'videos'" v-for="(video, index) in selectedFolder.videos" :key="index" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="h-24 border-b">
                        <img class="rounded-t-lg h-full" src="https://imgs.search.brave.com/Xq35KI1zrPnfbP_MZ7WB3aIXfEdJIwrcKLdjDzBSx4s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9nb3Zi/ZXJnLXNmY2MuaW1n/aXgubmV0L3Bvc3Rl/ZC1wcm9kdWN0LWlt/YWdlcy90dWRvcl93/YXRjaF9hc3NldHNf/dXByaWdodF93YXRj/aF90cmFuc3BhcmVu/dF9iYWNrZ3JvdW5k/X3pvb21lZF9pbi9N/MjU2MDBUTi0wMDAx/LnBuZz9hdXRvPWZv/cm1hdCxjb21wcmVz/cyZiZy1yZW1vdmU9/dHJ1ZSZmaXQ9Zmls/bCZmaWxsPXNvbGlk/JnRyaW09YXV0byZw/YWQ9ODgmcGFkLWxl/ZnQ9NTkmcGFkLXJp/Z2h0PTExJnc9MTQ4/MCZoPTE0ODAmcT0x/MDA" alt="" />
                    </div>
                    <div class="p-4 pb-2">
                        <button type="button" class="text-gray-900 font-semibold bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-md text-sm px-1 me-2 mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">4 min</button>
                        <h5 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Meeting video title-2021</h5>
                        <div class="flex justify-between text-sm font-bold text-gray-400">
                            <div class="flex space-x-3 items-center">
                                <div class="flex space-x-1 items-center">
                                    <svg class="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    <span>4</span>
                                </div>
                                <div class="flex space-x-1 items-center">
                                    <svg class="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                    </svg>
                                    <span>2</span>
                                </div>
                            </div>
                            <div>12 min ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useLibraryStore } from '@/stores/libraryStore';
    import { initTooltips } from 'flowbite';
    import { computed, onMounted } from 'vue';

    let libraryStore = useLibraryStore()
    let selectedLibrary = computed(() => libraryStore.selectedLibrary)
    let selectedTab = computed(() => libraryStore.selectedLibtab)
    let selectedFolder = computed(() => libraryStore.selectedFolder)

    let folders = Array.from({length: 3})

    onMounted(() => {
        initTooltips()
    })
</script>