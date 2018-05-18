<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>
        <div class="tableWrap">
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <table class="detailOnly" style="margin:15px 0 30px;" v-for="(item,index) in dom" :key="index">
                    <caption>
                        <span v-if="item.MainPath">
                            <img :src="item.MainPath">
                        </span>
                        <span v-else class="noPic">暂无主图</span>

                        <span v-if="item.SubPath">
                            <img :src="item.SubPath">
                        </span>
                        <span v-else class="noPic">暂无辅图</span>
                    </caption>

                    <tbody>
                        <tr>
                            <td style="width:88px;">产品名称</td>
                            <td>{{item.Item_C_Name}}</td>
                        </tr>
                        <tr>
                            <td>厂家编号</td>
                            <td>{{item.ProvItemNo}}</td>
                        </tr>
                        <tr>
                            <td>规格型号</td>
                            <td>{{item.Item_C_Spec}}</td>
                        </tr>

                        <tr>
                            <td>每箱数量</td>
                            <td>{{item.BoxQty}}</td>
                        </tr>
                        <tr>
                            <td>单车用量</td>
                            <td>{{item.CarQty}}</td>
                        </tr>
                        <tr>
                            <td>替代品牌</td>
                            <td>
                                <div class="maxWidth">{{item.ProdItemReplace}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>主机编号</td>
                            <td>
                                <div class="maxWidth">{{item.ZhujiNo}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>适用车型</td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
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
            console.log(res)
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