<template>
  <div class="home">
    <div id="container">
      <div class="box">
        <div class="navbar">
          <ul>
            <li v-for="tab in tabs" :key="tab.id" class="step" @click="setTabContent(tab.id)">
              <div :class="['num', {'clicked':tab.id === commonsStore.nowTab}]">{{ tab.id }}</div>
              <div class="item">
                <div class="step-nm">{{ tab.step }}</div>
                <div class="name">{{ tab.name }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="wrapper">
          <div class="content">
            <div class="title" v-if="nowContent.title">{{nowContent.title}}</div>
            <div class="semi-title" v-if="nowContent.semititle">{{ nowContent.semititle }}</div>
            <div class="forms">

              <!--          STEP 1          -->
              <div v-if="commonsStore.nowTab === '1'">
                <div class="form form-name">
                  <div class="labels">
                    <label for="name">Name</label>
                    <label for="name" v-if="validation.nameVal === false" class="alert">This field is required</label>
                  </div>
                  <input v-model="commonsStore.personalInfo.name" type="text" id="name" placeholder="e.g.Stephen King" :class="[{'error': validation.nameVal === false}]" required />
                </div>
                
                <div class="form form-email">
                  <div class="labels">
                    <label for="email">Email Address</label>
                    <label for="email" v-if="validation.emailVal === false" class="alert">This field is required</label>
                  </div>
                  <input v-model="commonsStore.personalInfo.email" type="text" id="email" placeholder="e.g. stephenking@lorem.com" :class="[{'error': validation.emailVal === false}]" required />
                </div>
                
                <div class="form form-phone">
                  <div class="labels">
                    <label for="phone">Phone Number</label>
                    <label for="phone" v-if="validation.phoneVal === false" class="alert">This field is required</label>
                  </div>
                  <input v-model="commonsStore.personalInfo.phone" type="text" id="phone" placeholder="e.g. +1 234 567 890" :class="[{'error': validation.phoneVal === false}]" required/>
                </div>
              </div>

              <!--          STEP 2          -->
              <div v-else-if="commonsStore.nowTab === '2'">

                <!-- 3 buttons -->
                <div class="options">
                  <button v-for="item in items.STEP2" :key="item.name" :class="['option non-selected', {'selected': item.id === commonsStore.plan}]" @click="commonsStore.setPlanItem(item.id)">
                    <img :src="require(`@/assets/images/${item.icon}`)" class="icon" />
                    <div class="option-nm card-nm">{{ item.name }}</div>
                    <div class="dollar card-des" v-if="!isYearly">{{ item.monthly }}</div>
                    <div class="dollar card-des" v-if="isYearly">{{ item.yearly }}</div>
                    <div v-if="isYearly" class="discount">{{ item.discount }}</div>
                  </button>
                </div>

                <!-- toggle -->
                <div class="select-area">
                  <div class="btn-area">
                    <span :class="['period', {'m-or-y':!isYearly}]">Monthly</span>
                    <span class="toggle">
                      <input type="checkbox" id="toggle" :value="isYearly" @change="setOptions" hidden/>
                      <label for="toggle" class="switch" >
                        <span class="toggle-btn"></span>
                      </label>
                    </span>
                    <span :class="['period', {'m-or-y':isYearly}]">Yearly</span>
                  </div>
                </div>
              </div>

              <!--          STEP 3          -->
              <div v-else-if="commonsStore.nowTab === '3'">
                <div class="addons">
                  <button v-for="addon in items.STEP3" :key="addon.id" :class="['addon non-selected', {'selected':commonsStore.addons.indexOf(addon) !== -1}]" @click="commonsStore.setAddonItems(addon)">
                    <span :class="['checkbox', {'check': commonsStore.addons.indexOf(addon) !== -1}]">
                      <img src="@/assets/images/icon-checkmark.svg">
                    </span>
                    <div class="txts">
                      <div class="card-nm">{{ addon.title }}</div>
                      <div class="card-des">{{ addon.semititle }}</div>
                    </div>
                    <div class="price" v-if="!isYearly">{{ addon.monthly }}</div>
                    <div class="price" v-if="isYearly">{{ addon.yearly }}</div>
                  </button>
                </div>
              </div>

              <!--          STEP 4          -->
              <div v-else-if="commonsStore.nowTab === '4'" class="finishing">
                <div class="costs">

                  <div :class="['plan-wrap', {'plus' : commonsStore.addons.length !== 0}]">
                    <div class="plan">
                      <div class="name impt-txt">
                        <div>{{ nowPlan.name }}</div>
                        <div v-if="!isYearly">(Monthly)</div>
                        <div v-if="isYearly">(Yearly)</div>
                      </div>
                      <div @click="()=>commonsStore.nowTab = '2'" class="change-plan">Change</div>
                    </div>
                    <div class="plan-cost mg-lft impt-txt">
                      <span class="">{{ isYearly ? nowPlan.yearly : nowPlan.monthly }}</span>
                    </div>
                  </div>

                  <div class="addon-wrap" v-if="commonsStore.addons.length !== 0">
                    <div v-for="addon in commonsStore.addons" :key="addon.id" class="addons">
                      <span>{{ addon.title }}</span>
                      <div class="addon-cost mg-lft">
                        <span v-if="!isYearly">{{ addon.monthly }}</span>
                        <span v-if="isYearly">{{ addon.yearly }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="total">
                  <span>Total (per month)</span>
                  <span class="total-cost mg-lft">{{ totalCost }}</span>
                </div>
              </div>

              <!--          Thank you page          -->
              <div v-if="commonsStore.nowTab === '5'">
                <diV class="appreciate">
                  <img src="@/assets/images/icon-thank-you.svg">
                  <div class="thank-you">Thank you!</div>
                  <div class="notice">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                  </div>
                </diV>
              </div>
              
            </div>
            <div class="btns" v-if="commonsStore.nowTab !== '5'">
              <button class="lft-btn" @click="goBack" v-if="commonsStore.nowTab !== '1'">Go Back</button>
              <button class="rgt-btn" v-if="commonsStore.nowTab !== '4'" @click="onSubmit">Next Step</button>
              <button class="rgt-btn confirm" v-else-if="commonsStore.nowTab === '4'" @click="onSubmit">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { reactive, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useCommonsStore } from '@/stores/commons'
import { IContent } from '@/types/content'
import _ from 'lodash'
import { IStep2, IStep3 } from '@/types/items'

const tabs = require('@/assets/data/tabs-info.json')
const content = require('@/assets/data/content.json')
const items = require('@/assets/data/items.json')

const commonsStore = useCommonsStore()

//left nav

let nowContent : IContent = reactive({
  id: "",
  title: "",
  semititle: ""
})

const setTabContent = (tabId:string) => {
  commonsStore.setTabActive(tabId)

  content.forEach((item: IContent)=>{
    if(item.id === commonsStore.nowTab) {
      nowContent = item
    }
  })
}

const onSubmit = () : void => {
  if((commonsStore.nowTab === '1' && checkForm()) || (commonsStore.nowTab === '2' || commonsStore.nowTab === '3' || commonsStore.nowTab === '4')) {
    setTabContent(String(Number(commonsStore.nowTab)+1))
  }
}

const goBack = () : void => {
  setTabContent(String(Number(commonsStore.nowTab)-1))
}

// step2

const isYearly : Ref<boolean> = ref(false)

const setOptions = () => {
  isYearly.value = !isYearly.value
}

// step4
let totalCost: Ref<string> = ref('')
let nowPlan: Ref<IStep2> = ref(_.cloneDeep(items.STEP2[0]))

const setSelectedOptions = () => {
  items.STEP2.forEach((item:IStep2) => {
    if(item.id === commonsStore.plan) {
      nowPlan.value = item
    }
  })
  sumCost()
}

const sumCost = () => {
  const planCost : string = isYearly.value ? _.cloneDeep(nowPlan.value).yearly.replace(/[^0-9]/g, "") : _.cloneDeep(nowPlan.value).monthly.replace(/[^0-9]/g, "")
  let addonCosts : Array<number> = []
  commonsStore.addons.forEach((addon:IStep3)=>{
    isYearly.value ? addonCosts.push(Number(_.cloneDeep(addon).yearly.replace(/[^0-9]/g, ""))) : addonCosts.push(Number(_.cloneDeep(addon).monthly.replace(/[^0-9]/g, "")))
  })

  totalCost.value = isYearly.value ? '$' + String(Number(planCost) + _.sum(addonCosts)) + '/yr' : '$' + String(Number(planCost) + _.sum(addonCosts)) + '/mo'
}

watch(()=>commonsStore.nowTab, ()=>{
  if(commonsStore.nowTab === '4') {
    setSelectedOptions()
  }
})

// validation check

// step1
const validation : any = reactive({
  nameVal: true,
  emailVal: true,
  phoneVal: true
})

const checkForm = () => {
  if(_.isEmpty(commonsStore.personalInfo.name)) {
    validation.nameVal = false
    return false
  }
  else {
    validation.nameVal = true
  }

  if(_.isEmpty(commonsStore.personalInfo.email)) {
    validation.emailVal = false
    return false
  }
  else {
    validation.emailVal = true
  }

  if(_.isEmpty(commonsStore.personalInfo.phone)) {
    validation.phoneVal = false
    return false
  }
  else {
    validation.phoneVal = true
  }

  return true
}

watch(()=> commonsStore.personalInfo, ()=>{
  if(!_.isEmpty(commonsStore.personalInfo.name)) {
    validation.nameVal = true
  }
  if(!_.isEmpty(commonsStore.personalInfo.email)) {
    validation.emailVal = true
  }
  if(!_.isEmpty(commonsStore.personalInfo.phone)) {
    validation.phoneVal = true
  }
}, { deep: true })

// 함수 실행부

setTabContent("1")

</script>
