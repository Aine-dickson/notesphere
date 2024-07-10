import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useInnerRouter = defineStore('innerRouter', () => {
    let ulrContainer: Ref<string[]> = ref([]);
    
    const push = (url: string)=> {
      ulrContainer.value.push(url)
    }

    const pop = ()=> {
      ulrContainer.value.pop()
    }

    const rebuild = (url: string) => {
      ulrContainer.value.splice(0, ulrContainer.value.length, url)
    }

    const replaceLast = (url: string) => {
      ulrContainer.value.splice(ulrContainer.value.length-1, 1, url)
    }
  return { push, pop, rebuild, replaceLast, ulrContainer }
})
