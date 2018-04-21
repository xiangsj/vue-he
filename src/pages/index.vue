<template>
    <div class="homePage">
        <img class="logo" :src="logoUrl">
        <ul class="nav">
            <li v-for="(item,index) in homeList" :key="index">
                <img :src="item.SortPath">
                <div>{{item.SortName}}</div>
            </li>
        </ul>
        <div class="footer">{{company}}</div>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data() {
        return {
            homeList:[],
            logoUrl:'',
            company:'',
        }
    },
    created() {
        this.getMenu();
        this.getLogin();
    },
    methods: {
        getMenu() {
            this.$http.get('/api/ProdSort/gh_6297f82da259').then(res => {
                // console.log(JSON.parse(res.data))
                let getData = JSON.parse(res.data);
                this.homeList = getData.DataList;
            }, res => {
                // error callback
            });
        },
        getLogin() {
            this.$http.get('/api/CustomerList?weiXinCode=gh_6297f82da259').then(res => {
                let getData = JSON.parse(res.data);
                // console.log(getData)
                this.logoUrl = getData.DataList[0].LogoPath;
                this.company = getData.DataList[0].CustName;
            }, res => {
                // error callback
            });
        }

    }
}
</script>

<style lang="less">

</style>
