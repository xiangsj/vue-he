<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201805/LogoImage/gh_6297f82da259.jpg">
        </div>
        <div class="tableWrap">
            <table class="hasBorder">
                <tr>
                    <td width=100>品牌</td>
                    <td>{{obj.BrandName}}</td>
                </tr>
                <tr>
                    <td>车型</td>
                    <td>{{obj.VehicleName}}</td>
                </tr>
                <tr>
                    <td>车系</td>
                    <td>{{obj.BSX}}</td>
                </tr>
            </table>

            <table class="noBorder" style="margin-top:10px;" 
            v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
                <tr v-for="(item,index) in dom" :key="index" @click="openDetail(item)">
                    <td width=100>
                        <!-- <img v-if="item.MainImage && item.MainImage !== ''" src="item.MainImage"> -->
                        <img class="listPic" v-if="item.MainPath && item.MainPath !== ''" :src="item.MainPath">
                        <div v-else class="text-center noPic">暂无图片</div>
                    </td>
                    <td>
                        <div>{{item.Brand}}</div>
                        <div>{{item.Item_C_Name}}</div>
                        <div>{{item.Item_C_Spec}}</div>
                    </td>
                </tr>
                <!-- <ul>
                            <li v-for="(item,index) in list" :key="index" style="height:88px;">{{ index }}</li>
                        </ul> -->
                <!-- <tfoot v-if="loading">
                        <tr>
                            <td align="center">努力加载中...</td>
                        </tr>
                    </tfoot> -->
            </table>

            <div class="getMore text-center" v-if="loading">
                <span>努力加载中...</span>
                <div class="noMore" v-if="noMore">没有更多了</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            loading: false,
            noMore: false,
            obj: {},
            dom: [],
            pageIndex: 1,
            pageSize: 5,
            // list: [1, 2, 2, 2, 2, 2],

        }
    },
    created() {
        Indicator.open();
        // console.log(' jjjjjjj ')
        let obj = {}
        try {
            // console.log(JSON.parse(this.$route.params.string))
            obj = JSON.parse(this.$route.params.string);
            this.obj = obj;
        } catch (e) {
            this.nothing();
            return;
        }

        let data = {
            searchWords: this.obj.keywords,
            brandID: this.obj.BrandID,
            vehicleID: this.obj.VehicleID,
            styleID: this.obj.StyleID,
            mSortNo: this.obj.mSortNo,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }
        this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
            Indicator.close();
            // console.log(" iiiiiiiiiiiiii ")
            try {
                if (res.DataList.length > 0) {
                    this.dom = res.DataList;
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
            // console.log(" ddd ")
            this.loading = true;

            this.pageIndex++;
            let data = {
                searchWords: this.obj.keywords,
                brandID: this.obj.BrandID,
                vehicleID: this.obj.VehicleID,
                styleID: this.obj.StyleID,
                mSortNo: this.obj.mSortNo,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
                // Indicator.close();
                // console.log(" iiiiiiiiiiiiii ")
                // console.log(JSON.parse(res.data).DataList)
                // let DataList = JSON.parse(res.data).DataList;
                this.dom = this.dom.concat(res.DataList);
                this.loading = false;
                this.noMore = res.DataList.length === 0 ? true : false;

            }, res => {
                // error callback
            });
        },
        nothing() {
            MessageBox.alert('没有查到数据，返回重新查询').then(action => {
                this.$router.go(-1);
            });
        },
        openDetail(item) {
            console.log(item)
            let data = {
                FID: item.FID,
                BrandName: this.obj.BrandName,
                VehicleName: this.obj.VehicleName,
                BSX: this.obj.BSX,
            }
            let url = '/home/detail1_1/' +
                JSON.stringify(data);
            this.$router.push(url)
        }
    }
}
</script>

<style lang="less">

</style>