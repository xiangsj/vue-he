<template>
    <div class="search">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201805/LogoImage/gh_6297f82da259.jpg">
        </div>
        <mt-navbar class="navbar" v-model="selected">
            <mt-tab-item id="1">车型</mt-tab-item>
            <mt-tab-item id="2">编号</mt-tab-item>
            <mt-tab-item id="3">Vin码</mt-tab-item>
            <mt-tab-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="index">{{item.ShowCaption}}</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <search-body-1 :mSortNo="mSortNo"></search-body-1>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <search-body-2 :mSortNo="mSortNo"></search-body-2>
            </mt-tab-container-item>

            <mt-tab-container-item id="3">
                <search-body-3 :mSortNo="mSortNo"></search-body-3>
            </mt-tab-container-item>

            <mt-tab-container-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="index">
                <search-body-4 :mSortNo="mSortNo" :itemData="item"></search-body-4>
            </mt-tab-container-item>
        </mt-tab-container>

    </div>
</template>

<script>
import searchBody1 from './searchBody1'
import searchBody2 from './searchBody2'
import searchBody3 from './searchBody3'
import searchBody4 from './searchBody4'

import { Indicator } from 'mint-ui';
export default {
    name: 'search',
    data() {
        return {
            selected: '1',
            tabsMore: [],

            mSortNo: '',
            username: '',
        }
    },
    created() {
        Indicator.open();
        if(!this.$route.params.id){
            alert(" no id ");
            return;
        }
        this.mSortNo = this.$route.params.id;
        this.getNavs();
        // console.log(this.mSortNo)
    },
    methods: {
        getNavs() {
            this.$http.get('/api/DesignField', {params:{}}).then(res => {
                Indicator.close();
                // console.log(" 自定义导航 ")
                // console.log(JSON.parse(res.data))
                // let getData = JSON.parse(res.data);
                this.tabsMore = res.DataList;
            }, res => {
                // error callback
            });
        },
    },
    components: {
        'search-body-1': searchBody1,
        'search-body-2': searchBody2,
        'search-body-3': searchBody3,
        'search-body-4': searchBody4,
    }
}
</script>

<style lang="less">

</style>
