import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'
import api from './api'

export const useAccountStore = defineStore('accountStore', {
    state: ()=> {
        let user: Ref<User> | Ref<null> = ref(null)
        let router = useRouter()
    
        let login = async (loginObject: {password: string, emailAddress: string})=> {
            try {
                let response = await axios.post('/user/login', loginObject)
                console.log(response.data)
            } catch (error) {
                console.log(error)   
            }
        }
    
        let signup = async (userObject: {password: string, emailAddress: string})=> {
            try{
                let response = await api.post('/user/signup', userObject)
                if(response.status == 201){
                    router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        }

        return {user, login, signup}
    },
    persist: true
})

type User = {
    emailAddress: string,
    avatar: string
}
