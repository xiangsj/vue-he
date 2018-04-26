<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header title="车型">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="isOpen=false">返回</mt-button>
      </router-link>
    </mt-header>

    <ul class="scrollList">
      <li v-for="(item,index) in navs" :key="index" @click="sendBrandTree(item)">
        {{ item.JP }} -
        {{ item.ProdFac }} -
        {{ item.BSX }} -
        {{ item.StyleBrief }}
        </li>
    </ul>

  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  name: 'selectBrand',
  data() {
    return {
      isOpen: false,
      navs: []
    }
  },
  created() {
    // Indicator.open();
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.navs[this.navs.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.navs.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    sendBrandTree(item) {
      this.isOpen = false;
      this.$emit("updata", item)
      // console.log(item)
    },
    open(item) {
      this.isOpen = true;
      Indicator.open();
      console.log(item)
      this.getBrand(item);
    },
    getBrand(item) {
      let url = '/api/Style/gh_6297f82da259/'+item.BrandID+'/'+item.VehicleID;

      this.$http.get(url).then(res => {
        Indicator.close();
        console.log(JSON.parse(res.data))
        let getData = JSON.parse(res.data);
        let dataList = getData.DataList;
        this.navs = dataList;
      }, res => {
        // error callback
      });
    }

  }
}
</script>

<style lang="less">
.selectBrand {
  // border: 1px solid red;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
}
</style>
