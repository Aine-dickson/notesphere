import { defineStore } from "pinia";
import api from "./api";
import { ref, type Ref } from "vue";


export const useFileStore = defineStore('fileStore', {
    state: ()=> {
        let loaded_file = ref({
            name: "hello",
            content: "",
            id: ""
        })
        console.log(loaded_file.value)

        let open_files: [];
        let owned_files: [];
        let active_modal: Ref<null> | Ref<string> = ref(null);

        let load_file = (file_name: string, file_id: string)=> {
            let file = owned_files.find(file => file.name == file_name && file.id == file_id)
            
            if(file != undefined) loaded_file.value = file
        }

        let write_to_file = (content: string) => {
            if(loaded_file == null) return
            loaded_file.value.content = content
        }

        let open_file = (file_name: string, file_id: string) => {
            let file = owned_files.find(file => file.name = file_name && file.id)

            if(file != undefined) open_files.push(file)
        }

        let activate_modal = (modal_name: string) => {
            active_modal.value = modal_name
        }

        let close_modal = () => {
            active_modal.value = null
        }

        let create_newFile = async (file_type: string, file_name: string) => {
            try {
                let response = await api.post('create_file', {name: file_name, file_type: file_type})
                if (response.status != 201) throw new Error()

                loaded_file = response.data
            } catch(error) {
                console.log(error)
            }
        }

        let save_file = async (file_id: string, file_content: string) => {
            try{
                let response = await api.post('save_file', {file_content, file_id})
            } catch (error){
                console.log(error)
            }
        }

        let save_file_as = async (new_name: string)=> {
            try {
                let response = await api.put('save_as', {id: loaded_file.value.id, new_name})
            } catch (error) {
                console.log(error)
            }
        }

        return {
            load_file, open_file, activate_modal, write_to_file,
            active_modal, loaded_file, close_modal, create_newFile, 
            save_file, save_file_as
        }
    },
    persist: true
})
