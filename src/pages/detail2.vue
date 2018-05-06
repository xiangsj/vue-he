<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201805/LogoImage/gh_6297f82da259.jpg">
        </div>
        <div class="tableWrap">
            <div>

            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <table class="noBorder" style="margin-top:20px;" v-for="(item,index) in dom" :key="index">
                <caption>
                    <span v-if="item.MainPath">
                        <img :src="item.MainPath">
                    </span>
                    <span v-if="item.SubPath">
                        <img :src="item.SubPath">
                    </span>
                </caption>
                <tbody>
                <tr>
                    <td style="width:100px;">产品名称</td>
                    <td>{{item.Brand}} {{item.Item_C_Name}}</td>
                </tr>
                <tr>
                    <td>主机编号</td>
                    <td>{{item.EngineNo}}</td>
                </tr>                
                <tr>
                    <td>厂家供货编号</td>
                    <td>{{item.ProvItemNo}}</td>
                </tr>
                <tr>
                    <td>配件规格</td>
                    <td>{{item.Item_C_Spec}}</td>
                </tr>
                <tr>
                    <td>单车用量</td>
                    <td>{{item.CarQty}}</td>
                </tr>
                <tr>
                    <td>单箱数量</td>
                    <td>{{item.BoxQty}}</td>
                </tr>
                <tr>
                    <td>可替换产品</td>
                    <td>{{item.ProdItemReplace}}</td>
                </tr>
                <tr>
                    <td>单位</td>
                    <td>{{item.Unit}}</td>
                </tr>
                <tr>
                    <td>ZhujiNo</td>
                    <td><div style="max-width:200px;">{{item.ZhujiNo}}</div></td>
                </tr>
                </tbody>
            </table>
            </div>

            <!-- <ul >
                <li v-for="(item,index) in list" :key="index" style="height:88px;">{{ item }}</li>
            </ul> -->
            <div class="getMore text-center" v-if="loading">
                <span>努力加载中...</span>
                <div class="noMore" v-if="noMore">没有更多了</div>
            </div>
            
        </div>

        <!-- {{dom}} -->
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            loading: false,
            noMore: false,
            dom:[],
            pageIndex: 1,
            pageSize: 5,
                        // list: [1, 2, 2, 2, 2, 2, 2, 2],

        }
    },
    created() {
        Indicator.open();
        let strArr = this.$route.params.string.split('&&');
        console.log(' jjjjjjj ')
        console.log(strArr)

        let data = {
            weiXinCode: 'gh_6297f82da259',
            inputValue: strArr[0],
            mSortNo: strArr[1],
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }
        this.$http.get('/api/ProductSearchByNo', { params: data }).then(res => {
            Indicator.close();

            console.log(" ^^^^ ")
            console.log(JSON.parse(res.data).DataList)
            let getData = JSON.parse(res.data);
            try {
                if (getData.DataList.length > 0) {
                    this.dom = getData.DataList;
                } else {
                    this.nothing();
                }
            } catch (e) {
                this.nothing();
            }
        }, res => {
            // error callback
        });
    },
    methods: {
        loadMore() {
            console.log(" ddd ")
            this.loading = true;

            this.pageIndex++;
            let strArr = this.$route.params.string.split('&&');
            let data = {
                weiXinCode: 'gh_6297f82da259',
                inputValue: strArr[0],
                mSortNo: strArr[1],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/ProductSearchByNo', { params: data }).then(res => {
                console.log(JSON.parse(res.data).DataList)
                let DataList = JSON.parse(res.data).DataList;
                this.dom = this.dom.concat(DataList);
                this.loading = false;
                this.noMore = DataList.length === 0 ? true : false;

            }, res => {
                // error callback
            });
            
            // let data = {
            //     weiXinCode: 'gh_6297f82da259',
            //     searchWords: this.obj.keywords,
            //     brandID: this.obj.BrandID,
            //     vehicleID: this.obj.VehicleID,
            //     styleID: this.obj.StyleID,
            //     mSortNo: this.obj.mSortNo,
            //     pageIndex: this.pageIndex,
            //     pageSize: this.pageSize
            // }
            // this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
            //     // Indicator.close();
            //     // console.log(" iiiiiiiiiiiiii ")
            //     console.log(JSON.parse(res.data).DataList)
            //     let DataList = JSON.parse(res.data).DataList;
            //     this.dom = this.dom.concat(DataList);
            //     this.loading = false;
            //     this.noMore = DataList.length === 0 ? true : false;

            // }, res => {
            //     // error callback
            // });
        },
        nothing() {
            MessageBox.alert('没有查到数据，返回重新查询').then(action => {
                this.$router.go(-1);
            });
        }
    }
}
</script>

<style lang="less">

</style>