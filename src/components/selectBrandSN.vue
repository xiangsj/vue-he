<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header :title="'选择车型（' + name + '）'">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="isOpen=false">返回</mt-button>
      </router-link>
    </mt-header>

    <ul class="scrollList">
      <li v-for="(item,index) in navs" :key="index" @click="sendBrandTree(item)">
        {{ item.JP }} - {{ item.ProdFac }} - {{ item.BSX }} - {{ item.StyleBrief }}
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
      name: '',
      navs: []
    }
  },
  created() {
  },
  methods: {
    sendBrandTree(item) {
      this.isOpen = false;
      this.$emit("updata", item)
      console.log(item.StyleID)
    },
    open(item, brand) {
      Indicator.open();
      this.isOpen = true;
      // console.log(item)
      this.getBrand(item);
      this.name = brand.BrandName + ' - ' + item.VehicleName;
    },
    getBrand(item) {
      this.$http.get('/api/Style', {
        params: {
          brandID: item.BrandID,
          vehicleID: item.VehicleID
        }
      }).then(res => {
        Indicator.close();
        let dataList = res.DataList;
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
