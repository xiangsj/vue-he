<template>
  <div class="selectBrand">
    <mt-index-list>
  <mt-index-section index="A">
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
  </mt-index-section>
  <mt-index-section index="B">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="Z">
    <mt-cell title="Zack"></mt-cell>
    <mt-cell title="Zane"></mt-cell>
  </mt-index-section>
</mt-index-list>
  </div>
</template>

<script>
export default {
  name: 'selectBrand',
  data() {
    return {
      
    }
  },
  created(){
    this.getBrand();
  },
  methods: {
    getBrand(){
      this.$http.get('/api/Brand/gh_6297f82da259').then(res => {
        console.log(JSON.parse(res.data))
        let getData = JSON.parse(res.data);
        let conArr = [];
        getData.forEach(item=>{
          if(conArr.indexOf(item.FirstChar === -1)){
            conArr.push(item.FirstChar);
          }
        });
        console.log(conArr)
        // this.homeList = getData.DataList;

        // Indicator.close();
    }, res => {
        // error callback
    });
    }
    
  }
}
</script>

<style lang="less">
.selectBrand{
  border: 1px solid red;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
}
</style>
