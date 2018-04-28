<template>
    <div class="search">
        <!--<div class="text-center">
                    <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201804/LogoImage/gh_6297f82da259.jpg">
                </div>
                <mt-navbar class="navbar" v-model="selected">
                    <mt-tab-item id="1">车型</mt-tab-item>
                    <mt-tab-item id="2">编号</mt-tab-item>
                    <mt-tab-item id="3">Vin码</mt-tab-item>
                    <mt-tab-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="index">{{item.ShowCaption}}</mt-tab-item>
                </mt-navbar>-->

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <search-body-1></search-body-1>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="tabContent">
                    <div class="inputRight">
                        <mt-field label="编号" placeholder="主机编号及厂家供编号" v-model="username"></mt-field>
                    </div>
                    <div class="text-center">
                        <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                        <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="tabContent">
                    <div class="inputRight">
                        <mt-field label="Vin码" placeholder="请输入Vin码" v-model="username"></mt-field>
                    </div>
                    <div class="text-center">
                        <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                        <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="index">
                <div class="tabContent">
                    <div class="inputRight">
                        <mt-field :label="item.ShowCaption" :placeholder="'请输入'+item.ShowCaption" v-model="username"></mt-field>
                    </div>
                    <div class="text-center">
                        <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                        <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>

        
    </div>
</template>

<script>


import searchBody1 from './searchBody1'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'search',
    data() {
        return {
            selected: '1',
            tabsMore: [],
            pageId: '',

            
            username: '',
        }
    },
    created() {
        Indicator.open();
        this.pageId = this.$route.params.id;
        this.getNavs();
    },
    methods: {
        
        getNavs() {
            this.$http.get('/api/DesignField/gh_6297f82da259').then(res => {
                Indicator.close();
                // console.log(" 自定义导航 ")
                // console.log(JSON.parse(res.data))
                let getData = JSON.parse(res.data);
                this.tabsMore = getData.DataList;
            }, res => {
                // error callback
            });
        },
        //
        
        // searchByKeywords(){
        //     let data = {
        //         keywords: this.search.keywords,
        //         weiXinCode: 'gh_6297f82da259',
        //         mSortNo: this.pageId,
        //     }
        //     this.$http.get('/api/ProductSearchByStyleWord', {params:data}).then(res => {
        //         console.log(" ^^^^ ")
        //         console.log(JSON.parse(res.data))
        //         let getData = JSON.parse(res.data);
        //         // this.tabsMore = getData.DataList;
        //         // Indicator.close();
        //     }, res => {
        //         // error callback
        //     });
        // }
    },
    components: {
        'search-body-1': searchBody1,
    }
}
</script>

<style lang="less">

</style>
