<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header title="汽车品牌">
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
export default {
  name: 'selectBrand',
  data() {
    return {
      isOpen: false,
      navs: []
    }
  },
  created() {

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
    open(id) {
      console.log(id)
      this.isOpen = true;
      this.getBrand(id);
    },
    getBrand(id) {

      this.$http.get('/api/Vehicle/gh_6297f82da259/' + id).then(res => {
        console.log(JSON.parse(res.data))
        let getData = JSON.parse(res.data);
        let dataList = getData.DataList;
        this.navs = dataList;
        // let conArr = [];
        // dataList.forEach(item => {
        //   if (conArr.indexOf(item.FirstChar) === -1) {
        //     conArr.push(item.FirstChar);
        //   }
        // });
        // // console.log(conArr)

        // let newData = [];
        // conArr.forEach(item => {
        //   let list = [];
        //   dataList.forEach(item2 => {
        //     if (item == item2.FirstChar) {
        //       list.push(item2);
        //     }
        //   })
        //   newData.push({
        //     initials: item,
        //     list: list
        //   });
        // })
        // console.log(newData)

        // this.navs = newData;

        // Indicator.close();
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
