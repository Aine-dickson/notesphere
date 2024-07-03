<template>
    <div class="flex justify-between p-2 items-end bg-gray-400">
        <div class="flex space-x-3">
            <span class="cursor-pointer">File</span>
            <span class="cursor-pointer">Insert Image</span>
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