<template>
    <div class="index">
        <div class="text-center">
            <!--<img class="logo" :src="logoUrl">-->
            <ul class="nav">
                <li v-for="(item,index) in homeList" :key="index" @click="goSearch(item.FID)">
                    <!--<img :src="item.SortPath">-->
                    <div>{{item.SortName}}</div>
                </li>
            </ul>
            <div class="footer">{{company}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
    name: 'index',
    data() {
        return {
            homeList: [],
            logoUrl: '',
            company: '',
        }
    },
    created() {
        Indicator.open();
        // this.getMenu();
        // this.getLogin();

        this.isPower();
    },
    methods: {
        isPower() {
            this.axios.get('/api/Login' + '?weiXinCode=gh_6297f82da259').then(res => {
                // console.log(" login ")
                console.log(res)
                // let getData = JSON.parse(res.data);
                // this.homeList = getData.DataList;
                // Indicator.close();
            }, res => {
                // error callback
            });
        },
        goSearch(FID) {
            this.$router.push('/home/search/' + FID)
        },
        // console.log(" 首页产品按钮 ")
        getMenu() {
            this.$http.get('/api/ProdSort/gh_6297f82da259').then(res => {
                this.homeList = res.DataList;
                Indicator.close();
            }, res => {
                // error callback
            });
        },
        // console.log(" 登录信息 ")
        getLogin() {
            this.$http.get('/api/CustomerList?weiXinCode=gh_6297f82da259').then(res => {
                this.logoUrl = res.DataList[0].LogoPath;
                this.company = res.DataList[0].CustName;
            }, res => {
                // error callback
            });
        }

    }
}
</script>

<style lang="less">

</style>

