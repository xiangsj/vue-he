<template>
    <div class="index">
        <div class="text-center">
            <img class="logo" :src="logoUrl">
            <ul class="nav">
                <li v-for="(item,index) in homeList" :key="index" @click="goSearch(item.FID)">
                    <img :src="item.SortPath">
                    <div>{{item.SortName}}</div>
                </li>
            </ul>
            <div class="footer">{{company}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { getCookie, setCookie } from "@/libs/utils.js";

import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';

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
        // console.log(this.$route.query);
        let urlPar = this.$route.query;
        setCookie("code", urlPar.weiXinCode);

        Indicator.open();

        this.isPower();
    },
    methods: {
        isPower() {
            this.$http.get('/api/Login', { params: {} }).then(res => {
                Indicator.close();
                console.log(res)
                if (res.status == "S") {
                    this.getMenu();
                    this.getLogin();
                } else {
                    // console.log(res.DataList[0].CanAnonymous)
                    if (!res.DataList[0].CanAnonymous) {
                                    this.$router.push('/login')

                    } else {
                        MessageBox.alert(res.message).then(action => {
                            this.$router.go(-1);
                        });
                    }
                }
            }, res => {
                // error callback
            });
        },
        goSearch(FID) {
            this.$router.push('/home/search/' + FID)
        },
        // console.log(" 首页产品按钮 ")
        getMenu() {
            this.$http.get('/api/ProdSort/gh_6297f82da259', { params: {} }).then(res => {
                this.homeList = res.DataList;
                Indicator.close();
            }, res => {
                // error callback
            });
        },
        // console.log(" 登录信息 ")
        getLogin() {
            this.$http.get('/api/CustomerList', { params: {} }).then(res => {
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

