import { defineStore } from 'pinia'
import { IPersonal } from '@/types/personal'

export const useCommonsStore = defineStore('commonsStore', {
    state: () => ({
        nowTab: '1' as string,
        personalInfo: {
            name: '',
            email: '',
            phone: ''
        } as IPersonal
    }),
    actions: {
        setTabActive(tabId:string) {
            this.nowTab = tabId
        }
    }
})