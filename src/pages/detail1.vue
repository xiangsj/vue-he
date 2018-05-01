<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201804/LogoImage/gh_6297f82da259.jpg">
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

            <table class="noBorder" style="margin-top:10px;">
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
            </table>
        </div>

        <!-- {{dom}} -->
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            obj: {},
            dom: ''
        }
    },
    created() {
        Indicator.open();
        // console.log(' jjjjjjj ')
        let obj = {}
        try {
            console.log(JSON.parse(this.$route.params.string))
            obj = JSON.parse(this.$route.params.string);
            this.obj = obj;
        } catch (e) {
            this.nothing();
            return;
        }

        // let strArr = this.$route.params.string.split('&&');
        // // console.log(' jjjjjjj ')
        // // console.log(strArr)

        let data = {
            weiXinCode: 'gh_6297f82da259',
            searchWords: obj.keywords,
            brandID: obj.BrandID,
            vehicleID: obj.VehicleID,
            styleID: obj.StyleID,
            mSortNo: obj.mSortNo
        }
        this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
            Indicator.close();
            console.log(" iiiiiiiiiiiiii ")
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
        nothing() {
            MessageBox.alert('没有查到数据，返回重新查询').then(action => {
                this.$router.go(-1);
            });
        },
        openDetail(item){
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