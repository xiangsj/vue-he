<template>
    <div class="homePage">
        <div>logo</div>
        <ul>
            <li v-for="(item,index) in homeList" :key="index">
                <img :src="item.SortPath">
                {{item.SortName}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data() {
        return {
            homeList:[],
            //   msg: 'HelloWorld'
        }
    },
    created() {
        this.getMenu();
    },
    methods: {
        getMenu() {
            this.$http.get('/api/ProdSort/gh_6297f82da259').then(res => {
                console.log(JSON.parse(res.data))
                let getData = JSON.parse(res.data);
                this.homeList = getData.DataList;
                // this.msg = res.data.msg;
                // success callback
            }, res => {
                // error callback
            });
        }
    }
}
</script>

<style scoped lang="less">
.homePage{
    border: 1px solid blue;
    height: 100%;
    text-align: center;
    >ul{
        >li{
            border: 1px solid red;
            display: inline-block;
            >img{
                width: 50px;
                height: 50px;
            }
        }
    }
}

</style>
