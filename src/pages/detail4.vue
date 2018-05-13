<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
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

            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <table class="noBorder" style="margin-top:20px;">
                    <tr v-for="(item,index) in dom" :key="index">
                        <td width=100>
                            <img v-if="item.MainImage && item.MainImage !== ''" src="item.MainImage">
                            <div v-else class="text-center">暂无图片</div>
                        </td>
                        <td>
                            {{item.Brand}}<br> {{item.Item_C_Name}}
                            <br> {{item.Item_C_Spec}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="getMore text-center" v-if="loading">
                <span>努力加载中...</span>
                <div class="noMore" v-if="noMore">没有更多了</div>
            </div>

        </div>

        <!-- {{dom}} -->
    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";

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
        }
    },
    created() {

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
            designFieldId: this.obj.designFieldId,
            inputValue: this.obj.inputValue,
            mSortNo: this.obj.mSortNo,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }
        this.$http.get('/api/ProductSeachByDesignField', { params: data }).then(res => {
            Indicator.close();
            // console.log(" iiiiiiiiiiiiii ")
            // console.log(JSON.parse(res.data).DataList)
            // let getData = JSON.parse(res.data);
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
        getLogoUrl() {
            return getCookie("logoUrl");
        },
        loadMore() {
            // console.log(" ddd ")
            this.loading = true;
            this.pageIndex++;

            let data = {
                designFieldId: this.obj.designFieldId,
                inputValue: this.obj.inputValue,
                mSortNo: this.obj.mSortNo,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/ProductSeachByDesignField', { params: data }).then(res => {
                // console.log(JSON.parse(res.data).DataList)
                // let DataList = JSON.parse(res.data).DataList;
                this.dom = this.dom.concat(res.DataList);
                this.loading = false;
                this.noMore = res.DataList.length === 0 ? true : false;
            }, res => {
                // error callback
            });

            // let strArr = this.$route.params.string.split('&&');
            // let data = {
            //     weiXinCode: 'gh_6297f82da259',
            //     inputValue: strArr[0],
            //     mSortNo: strArr[1],
            //     pageIndex: this.pageIndex,
            //     pageSize: this.pageSize
            // }
            // this.$http.get('/api/ProductSearchByNo', { params: data }).then(res => {
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