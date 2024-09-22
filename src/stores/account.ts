import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import api from './api'

export const useAccountStore = defineStore('accountStore', {
    state: ()=> {
        let user = ref(null)
        let router = useRouter()
        let sideBarState: Ref<Boolean> = ref(false)

        let changeSideBarState = (state: boolean)=>{
            sideBarState.value = state
        }
    
        let login = async (loginObject: {password: string, email_address: string})=> {
            try {
                let response = await api.post('/user/login', loginObject)
                if(response.status == 201 || response.status == 200){
                    user.value = response.data
                    router.push('/')
                }
            } catch (error) {
                console.log(error)   
            }
        }
    
        let signup = async (userObject: {password: string, email_address: string})=> {
            try{
                let response = await api.post('/user/signup', userObject)
                if(response.status == 201 || response.status == 200){
                    user.value = response.data
                    router.push('/')
                }
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        return {user, sideBarState, login, signup, changeSideBarState}
    },
    persist: true
})
