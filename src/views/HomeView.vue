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
            <div class="title">{{nowContent.title}}</div>
            <div class="semi-title">{{ nowContent.semititle }}</div>
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
                  <button v-for="item in items.STEP2" :key="item.name" :class="['option', {'now-plan': item.id === commonsStore.plan}]" @click="commonsStore.setPlanItem(item.id)">
                    <img :src="require(`@/assets/images/${item.icon}`)" class="icon" />
                    <div class="option-nm">{{ item.name }}</div>
                    <div class="dollar" v-if="!isYearly">{{ item.monthly }}</div>
                    <div class="dollar" v-if="isYearly">{{ item.yearly }}</div>
                    <div v-if="isYearly" class="discount">{{ item.discount }}</div>
                  </button>
                </div>

                <!-- toggle -->
                <div class="select-area">
                  <div class="btn-area">
                    <span :class="['period', {'selected':!isYearly}]">Monthly</span>
                    <span class="toggle">
                      <input type="checkbox" id="toggle" :value="isYearly" @change="setOptions" hidden/>
                      <label for="toggle" class="switch">
                        <span class="toggle-btn"></span>
                      </label>
                    </span>
                    <span :class="['period', {'selected':isYearly}]">Yearly</span>
                  </div>
                </div>
              </div>

              <!--          STEP 3          -->
              <div v-else-if="commonsStore.nowTab === '3'">
                content3
              </div>

              <!--          STEP 4          -->
              <div v-else-if="commonsStore.nowTab === '4'">
                content4
              </div>
              
            </div>
            <div class="btns">
              <button class="lft-btn" @click="goBack" v-if="commonsStore.nowTab !== '1'">Go Back</button>
              <button class="rgt-btn" @click="onSubmit">Next Step</button>
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
  if(checkForm()) {
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
