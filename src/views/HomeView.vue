<template>
  <div class="home">
    <div id="container">
      <div class="box">
        <div class="navbar">
          <ul>
            <li v-for="tab in tabs" :key="tab.id" class="step" @click="commonsStore.setTabActive(tab.id)">
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
            <div class="title">title</div>
            <div class="semi-title">semi-title</div>
            <div v-if="commonsStore.nowTab === '1'">
              content1
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useCommonsStore } from '@/stores/commons'

const tabs = require('@/assets/data/tabs-info.json')

const commonsStore = useCommonsStore()

let nowTab : Ref<string> = ref('1')
const setTabActive = (tabId:string) => {
  nowTab.value = tabId
}

</script>
