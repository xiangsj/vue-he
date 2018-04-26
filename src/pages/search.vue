<template>
    <div class="search">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201804/LogoImage/gh_6297f82da259.jpg">
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
                <br>
                <br>
                <div class="inputRight">
                    <mt-field label="关键字" placeholder="请输入车型关键字直接检索" v-model="search.keywords"></mt-field>
                </div>
                <div @click="$refs.selectBrand.open()">
                    <mt-cell title="汽车品牌" is-link value="请选择汽车品牌">
                        <span v-if="search.brand.BrandName != ''">{{search.brand.BrandName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.selectBrandTree.open(search.brand.BrandID)">
                    <mt-cell title="汽车车系" is-link value="请选择汽车车系">
                        <span v-if="search.tree.VehicleName != ''">{{search.tree.VehicleName}}</span>
                    </mt-cell>
                </div>

                <div @click="SNclick()">
                    <mt-cell title="车型" is-link value="请选择车型"> </mt-cell>
                </div>

                <br>
                <br>
                <div class="text-center">
                    <mt-button size="small" type="primary" @click="oneClick" style="width:80px;margin:0 10px;">搜索</mt-button>
                    <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item id="2">

                <br>
                <br>
                <div class="inputRight">
                    <mt-field label="编号" placeholder="主机编号及厂家供编号" v-model="username"></mt-field>
                </div>
                <br>
                <div class="text-center">
                    <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                    <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item id="3">

                <br>
                <br>
                <div class="inputRight">
                    <mt-field label="Vin码" placeholder="请输入Vin码" v-model="username"></mt-field>
                </div>
                <br>
                <div class="text-center">
                    <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                    <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="index">
                <br>
                <br>
                <div class="inputRight">
                    <mt-field :label="item.ShowCaption" :placeholder="'请输入'+item.ShowCaption" v-model="username"></mt-field>
                </div>
                <br>
                <div class="text-center">
                    <mt-button size="small" type="primary" style="width:80px;margin:0 10px;">搜索</mt-button>
                    <mt-button size="small" style="width:80px;margin:0 10px;">清除</mt-button>
                </div>

            </mt-tab-container-item>
        </mt-tab-container>

        <!-- 选品牌 -->
        <select-brand ref="selectBrand" @updata="updataBrand"></select-brand>

        <!-- 选品牌 -->
        <select-brand-tree ref="selectBrandTree" @updata="updataBrandTree"></select-brand-tree>

        <!-- 选车型 -->
        <select-brand-SN ref="selectBrandSN" @updata="updataBrandSN"></select-brand-SN>
    </div>
</template>

<script>
import selectBrand from '../components/selectBrand'
import selectBrandTree from '../components/selectBrandTree'
import selectBrandSN from '../components/selectBrandSN'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'search',
    data() {
        return {
            selected: '1',
            tabsMore: [],
            pageId: '',

            search: {
                keywords: '',
                brand: {
                    BrandID: '',
                    BrandName: '',
                },
                tree: {
                    VehicleID: '',
                    VehicleName: '',
                },
                SN: {

                }
            },
            username: '',
        }
    },
    created() {
        Indicator.open();
        this.pageId = this.$route.params.id;
        this.getNavs();
    },
    methods: {
        SNclick(){
            if(this.search.tree.VehicleID || this.search.tree.VehicleID !== ''){
                this.$refs.selectBrandSN.open(this.search.tree);//上一级数据传过去
            }else{
                Toast('请先选择车系');
            }
        },
        updataBrandSN(item) {
            this.search.SN = item;
        },
        updataBrandTree(item) {
            console.log(" ooo ")
            console.log(item)
            this.search.tree = item;
            // console.log(" ooo ")
        },
        updataBrand(item) {
            console.log(" jjj ")
            // console.log(item)
            this.search.brand = item;
            // console.log(" ooo ")
        },
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
        oneClick() {
            console.log('  j     jjjjjjj ');
            if (this.search.keywords !== '') {
                // console.log(" 666 ")
                // this.searchByKeywords();
                this.$router.push('/home/detail/' + this.pageId + '&&' + this.search.keywords)
            }
        },
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
        'select-brand': selectBrand,
        'select-brand-tree': selectBrandTree,
        'select-brand-SN': selectBrandSN,
    }
}
</script>

<style lang="less">

</style>
