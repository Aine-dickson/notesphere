import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import api from './api'

export const useCameraStore = defineStore('cameraStore', {
    state: ()=> {
        let loaded_space = ref({
            participants: [
                {name: 'face1'},{name: 'face2'},
                {name: 'face3'},{name: 'face4'},
                {name: 'face1'}
            ],
            space_messages: [
                {body: 'Hello there, how are you doing', sender: 'Aine Dixon'},
                {body: "Yoo, what's going on guys", sender: "Ssekyene Robert"},
                {body: "Hallelujah, hallelujah hallelujah",sender: "Ssekyene Robert"},
                {body: "You want me, but i don't",sender: "Ssenono Henry"},
                {body: "Am a raster farian",sender: "Kyeyune Habib"},
                {body: "I saw that coming",sender: "Aine Dixon"},
                {body: "Mwe, byemukola bwemwasomerera",sender: "Kafeero John"},
            ],
            pins: []
        })

        let is_sidePanel = ref({on: false, in_preview: null});

        let preview_participants = () => {
            is_sidePanel.value = {on: true, in_preview: 'participants'}
        }
        
        let preview_messages = () => {
            is_sidePanel.value = {on: true, in_preview: 'messages'}
        }


        return {loaded_space, preview_messages, preview_participants, is_sidePanel}
    },
    persist: true
})
