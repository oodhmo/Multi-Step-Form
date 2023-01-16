import { defineStore } from 'pinia'
import { IPersonal } from '@/types/personal'

export const useCommonsStore = defineStore('commonsStore', {
    state: () => ({
        nowTab: '1' as string,
        personalInfo: {
            name: '',
            email: '',
            phone: ''
        } as IPersonal,
        plan: '1' as string,
        addon: '1' as string
    }),
    actions: {
        setTabActive(tabId:string) {
            this.nowTab = tabId
        },
        setPlanItem(planId:string) {
            this.plan = planId
        },
        setAddonItems(addonId:string) {
            this.addon = addonId
        }
    }
})