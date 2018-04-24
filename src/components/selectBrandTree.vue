<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header title="汽车品牌">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="isOpen=false">返回</mt-button>
      </router-link>
    </mt-header>

    <mt-index-list>
      <mt-index-section v-for="(item,index) in navs" :key="index" :index="item.initials">
        <div v-for="(item2,index2) in item.list" :key="index2" @click="sendBrand(item2)">
          <mt-cell :title="item2.BrandName"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
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
    sendBrand(item){
      this.isOpen = false;
      this.$emit("updata",item)
      console.log(item)
    },
    open(id){
      console.log(id)
      // this.isOpen = true;
      // this.getBrand();
    },
    getBrand() {
      this.$http.get('/api/Brand/gh_6297f82da259').then(res => {
        // console.log(JSON.parse(res.data))
        let getData = JSON.parse(res.data);
        let dataList = getData.DataList;

        let conArr = [];
        dataList.forEach(item => {
          if (conArr.indexOf(item.FirstChar) === -1) {
            conArr.push(item.FirstChar);
          }
        });
        // console.log(conArr)

        let newData = [];
        conArr.forEach(item => {
          let list = [];
          dataList.forEach(item2 => {
            if (item == item2.FirstChar) {
              list.push(item2);
            }
          })
          newData.push({
            initials: item,
            list: list
          });
        })
        console.log(newData)

        this.navs = newData;

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
