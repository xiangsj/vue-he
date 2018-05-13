<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header :title="'选择车系（' + BrandName + '）'">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="isOpen=false">返回</mt-button>
      </router-link>
    </mt-header>

    <!-- <div v-for="(item,index) in navs" :key="index" @click="sendBrand(item2)">
              <mt-cell :title="item.VehicleName"></mt-cell>
            </div> -->
    <ul class="scrollList">
      <li v-for="(item,index) in navs" :key="index" @click="sendBrandTree(item)">{{ item.VehicleName }}</li>
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
      BrandName:'',
      navs: []
    }
  },
  created() {
    Indicator.open();
  },
  methods: {
    sendBrandTree(item) {
      this.isOpen = false;
      this.$emit("updata", item);
      // console.log(item.VehicleID)
    },
    open(item) {
      Indicator.open();
      this.isOpen = true;
      this.getBrand(item);
      this.BrandName = item.BrandName;
    },
    getBrand(item) {
      if(!item.BrandID){return;}
      this.$http.get('/api/Vehicle', {params:{brandID:item.BrandID}}).then(res => {
        // console.log(JSON.parse(res.data))
        let dataList = res.DataList;
        this.navs = dataList;
        Indicator.close();
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
