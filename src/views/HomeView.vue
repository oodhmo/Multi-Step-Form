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
              <div v-if="commonsStore.nowTab === '1'">
                <div class="form form-name">
                  <label for="name">Name</label>
                  <input type="text" id="name" placeholder="e.g.Stephen King" required />
                </div>
                
                <div class="form form-email">
                  <label for="email">Email Address</label>
                  <input type="text" id="email" placeholder="e.g. stephenking@lorem.com" required />
                </div>
                
                <div class="form form-phone">
                  <label for="phone">Phone Number</label>
                  <input type="text" id="phone" placeholder="e.g. +1 234 567 890" required/>
                </div>
              </div>
              <div v-else-if="commonsStore.nowTab === '2'">
                content2
              </div>
              <div v-else-if="commonsStore.nowTab === '3'">
                content3
              </div>
              <div v-else-if="commonsStore.nowTab === '4'">
                content4
              </div>
            </div>
            <div class="btns">
              <button class="lft-btn" v-if="commonsStore.nowTab !== '1'">Go Back</button>
              <button class="rgt-btn">Next Step</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { onMounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { useCommonsStore } from '@/stores/commons'
import { IContent } from '@/types/content'

const tabs = require('@/assets/data/tabs-info.json')
const content = require('@/assets/data/content.json')

const commonsStore = useCommonsStore()

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

// validation check

const formValidation = () => {

}

setTabContent("1")

</script>
