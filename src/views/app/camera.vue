<template>
  <div class="h-full home_container grid">
    <!-- Header -->
    <header class="home_header p-2">
      <nav class="flex" aria-label="Breadcrumb">
        <div class="mr-3 flex items-center space-x-1">
          <svg
            class="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
          <svg
            class="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </div>

        <Breadcrumb />
      </nav>

      <div class="flex justify-between items-end">
        <span class="font-bold text-xl my-3">Camera</span>
      </div>
    </header>

    <!-- Main content -->
    <div class="main h-full grid border-t border-t-gray-300">
      <!-- Shared files panel -->
      <div class="shared_panel w-56 border-r border-r-gray-300">
        <!-- Navigator tabs -->
        <ul
          class="flex justify-evenly text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        >
          <li class="border-r flex-1 cursor-pointer">
            <span class="shared_panel_tab w-full inline-block p-4">Shared files</span>
          </li>
          <li class="flex-1 cursor-pointer">
            <span class="shared_panel_tab w-full inline-block p-4">Pinned</span>
          </li>
        </ul>

        <ul>
          <li @click="spaceSelector(item.name)" v-for="(item, index) in items" :key="index"></li>
        </ul>
      </div>

      <!-- Video body -->
      <div class="body h-full relative">
        <!-- Controls -->
        <div class="flex space-x-3 relative z-20 max-w-fit m-auto mt-3">
            <span @click="control('voice')" class="flex justify-center items-center bg-slate-500 bg-opacity-50 rounded-full w-10 h-10 cursor-pointer">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                    <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z"/>
                </svg>
            </span>
            <span @click="control('endCall')" class="flex justify-center items-center bg-red-500 rounded-full w-10 h-10 cursor-pointer">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.693 16.013H7.31a1.685 1.685 0 0 0 1.685-1.684v-.645A1.684 1.684 0 0 1 10.679 12h2.647a1.686 1.686 0 0 1 1.686 1.686v.646c0 .446.178.875.494 1.19.316.317.693.495 1.14.495h1.685a1.556 1.556 0 0 0 1.597-1.016c.078-.214.107-.776.088-1.002.014-4.415-3.571-6.003-8-6.004-4.427 0-8.014 1.585-8.01 5.996-.02.227.009.79.087 1.003a1.558 1.558 0 0 0 1.6 1.02Z"/>
                </svg>
            </span>
            <span @click="control('video')" class="flex justify-center items-center bg-slate-500 bg-opacity-50 rounded-full w-10 h-10 cursor-pointer">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clip-rule="evenodd"/>
                </svg>
            </span>
        </div>

        <!-- Messages body -->
        <div class="messages absolute top-0 bottom-0 w-full overflow-hidden">
            <video class="video w-full h-full object-cover" autoplay muted>
                <source src="/assets/rust_in_vid.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>

        <!-- Participants avatars -->
        <div class="absolute right-0 top-6 z-20">
          <participantAvatars />
        </div>

        <!-- Message viewport -->
        <div class="absolute bottom-0 w-full">
          <div
            class="messageContainer h-80 min-w-1/4 w-[26rem] bg-transparent relative overflow-hidden overflow-y-auto scrollbar-hide"
          >
            <div class="space-y-4 px-4 py-2 items-end">
              <spaceMessage
                v-for="(message, index) in loadedSpace.space_messages"
                :key="index"
                :message="message.body"
                :sender="message.sender"
              />
            </div>
          </div>
          <div class="w-3/4 m-auto">
            <messageInput />
          </div>
        </div>
      </div>

      <!-- Aside panel -->
      <div class="side_panel hidden border-l h-full relative border-l-gray-300 w-64">
        <div class="flex justify-between items-center">
          <span class="font-bold text-md p-2">{{ panelTitle }}</span>
          <div
            @click="togglePanes('right')"
            class="w-6 h-6 text-opacity-50 text-gray-800 dark:text-white cursor-pointer"
          >
            <svg
              class="h-full w-full"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import messageInput from '@/components/inbox/msg_input.vue'
import participantAvatars from '@/components/camera/participants.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import spaceMessage from '@/components/camera/space_message.vue'

import { initTooltips } from 'flowbite'
import { useInnerRouter } from '@/stores/router'
import { useCameraStore } from '@/stores/cameraStore'
import { computed, onMounted, ref, watch } from 'vue'

let items = [{ name: 'channel 45' }, { name: 'Hello world' }]
let shared_panel: HTMLElement | null
let side_panel: HTMLElement | null
let innerRouter = useInnerRouter()
let cameraStore = useCameraStore()
let isSidePanel = computed(() => cameraStore.is_sidePanel)
let loadedSpace = computed(() => cameraStore.loaded_space)

let panelTitle = ref('')
let routerLevel = computed(() => innerRouter.getLevel())
let shared_panel_tabs: NodeListOf<Element> | null

onMounted(() => {
  innerRouter.rebuild('Camera')
  initTooltips()
  shared_panel = document.querySelector('.shared_panel')
  side_panel = document.querySelector('.side_panel')
  shared_panel_tabs = document.querySelectorAll('.shared_panel_tab')
  attachToggleListner()
  attachScrollListner()
})

let attachToggleListner = () => {
  shared_panel_tabs?.forEach((element) => {
    element.addEventListener('click', () => {
      shared_panel_tabs?.forEach((laterElement) => {
        if (laterElement.classList.contains('activeSharedTab')) {
          laterElement.classList.replace('activeSharedTab', 'inactiveSharedTab')
        } else {
          laterElement.classList.add('inactiveSharedTab')
        }
      })

      element.classList.replace('inactiveSharedTab', 'activeSharedTab')
    })
  })
  if (shared_panel_tabs != null) shared_panel_tabs[0].dispatchEvent(new Event('click'))
}

let attachScrollListner = () => {
  let messageContainer = document.querySelector('.messageContainer')
  let messages = document.querySelectorAll('.spaceMessage')
  let containerRect = messageContainer?.getBoundingClientRect()
  let maxDisplacement = 200 // Adjust this value to control the maximum displacement

  messages.forEach((message) => {
    let messageRect = message.getBoundingClientRect()
    let distanceFromContainerTop = messageRect.top - containerRect?.top
    let displacement = Math.min(distanceFromContainerTop / 2, maxDisplacement)
    message.style.transform = `translateX(${displacement}px)`

    let opacity = Math.min(Math.max(distanceFromContainerTop / 300, 0), 1)
    message.style.opacity = opacity.toFixed(2)
  })

  messageContainer?.addEventListener('scroll', () => {
    messages.forEach((message) => {
      let messageRect = message.getBoundingClientRect()
      let distanceFromContainerTop = messageRect.top - containerRect?.top
      let opacity = Math.min(Math.max(distanceFromContainerTop / 300, 0), 1)
      message.style.opacity = opacity.toFixed(2)

      let displacement = Math.min(distanceFromContainerTop / 2, maxDisplacement)
      message.style.transform = `translateX(${displacement}px)`
    })
  })
}

watch(isSidePanel, (newVal) => {
  if (newVal.on) togglePanes('right')
  else togglePanes('left')

  if (newVal.in_preview == 'participants') {
    panelTitle.value = 'Participants'
  } else {
    panelTitle.value = 'Messages'
  }
})

const togglePanes = (direction: string) => {
  if (direction == 'left') {
    console.log(shared_panel)
    if (!shared_panel?.classList.contains('hidden')) {
      shared_panel?.classList.add('hidden')
    } else {
      shared_panel.classList.remove('hidden')
    }
  } else if (direction == 'right') {
    console.log(side_panel)
    if (!side_panel?.classList.contains('hidden')) {
      side_panel?.classList.add('hidden')
      togglePanes('left')
    } else {
      side_panel.classList.remove('hidden')
      togglePanes('left')
    }
  }
}

const control = (target: string) => {
    let video = document.querySelector('.video')
    switch (target) {
        case 'voice':
            video.muted = !video?.muted
            break;
        case 'endCall': 
            video?.pause()
            video.currentTime = 0
        default:
            video?.pause()
            break;
    }
}

const cameraRouter = (routeName: string) => {
  while (routerLevel.value > 2) {
    innerRouter.pop()
  }
  if (routerLevel.value < 2) {
    innerRouter.push(routeName)
  }
  innerRouter.replaceLast(routeName)
}

const spaceSelector = (spaceName: string) => {
  if (routerLevel.value < 3) {
    innerRouter.push(spaceName)
  } else {
    innerRouter.replaceLast(spaceName)
  }
}
</script>

<style scoped>
.home_container {
  grid-template-rows: 13% 87%;
  grid-template-areas: 'header' 'main';
}
.home_header {
  grid-area: header;
}
.main {
  grid-area: main;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'shared_panel body side_panel';
}
.body {
  grid-area: body;
}
.shared_panel {
  grid-area: shared_panel;
}
.side_panel {
  grid-area: side_panel;
}
/* .spaceMessage {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    } */
.activeSharedTab {
  @apply text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500;
}
.inactiveSharedTab {
  @apply hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300;
}
</style>
