import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commonsStore', {
    state: () => ({
        nowTab: '1' as string,
    }),
    actions: {
        setTabActive(tabId:string) {
            this.nowTab = tabId
        }
    }
})