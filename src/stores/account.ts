import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import api from './api'

export const useAccountStore = defineStore('accountStore', {
    state: ()=> {
        return {
            user: null,
            router: useRouter(),
            sideBarState: false
        }
    },

    actions: {

        changeSideBarState(state: boolean) {
            this.sideBarState = state
        },
    
        async login (loginObject: {password: string, email_address: string}) {
            try {
                let response = await api.post('/user/login', loginObject)
                if(response.status == 201 || response.status == 200){
                    this.user = response.data
                    this.router.push('/')
                }
            } catch (error) {
                console.log(error)   
            }
        },
    
        async signup(userObject: {password: string, email_address: string}) {
            try{
                let response = await api.post('/user/signup', userObject)
                if(response.status == 201 || response.status == 200){
                    this.user = response.data
                    this.router.push('/')
                }
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },

        async logout() {
            let response = await api.post('/user/logout')
            if(response.status == 201 || response.status == 200){
                this.user = null
                this.router.push('/')
                return true
            }
        }
    },
    persist: true
})
