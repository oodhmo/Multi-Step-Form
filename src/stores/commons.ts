import { defineStore } from 'pinia'
import { IPersonal, IStep2, IStep3 } from '@/types/items'

export const useCommonsStore = defineStore('commonsStore', {
    state: () => ({
        nowTab: '1' as string,
        personalInfo: {
            name: '',
            email: '',
            phone: ''
        } as IPersonal,
        plan: {} as IStep2,
        addons: [] as Array<IStep3>
    }),
    actions: {
        setTabActive(tabId:string) {
            this.nowTab = tabId
        },
        setPlanItem(plan:IStep2) {
            this.plan = plan
        },
        setAddonItems(addon:IStep3) {
            if(this.addons.indexOf(addon) === -1) {
                this.addons.push(addon)
            }
            else {
                this.addons.splice(this.addons.indexOf(addon), 1)
            }
        }
    }
})