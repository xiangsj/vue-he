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

            <table class="noBorder" style="margin-top:20px;">
                <tr v-for="(item,index) in dom" :key="index">
                    <td width=100>
                        <img v-if="item.MainImage && item.MainImage !== ''" src="item.MainImage">
                        <div v-else class="text-center">暂无图片</div>
                    </td>
                    <td>
                        {{item.Brand}}<br>
                        {{item.Item_C_Name}}<br>
                        {{item.Item_C_Spec}}
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
        
        let obj = {}
        try {
            console.log(JSON.parse(this.$route.params.string))
            obj = JSON.parse(this.$route.params.string);
            this.obj = obj;
        } catch (e) {
            this.nothing();
            return;
        }

        let data = {
            weiXinCode: 'gh_6297f82da259',
            designFieldId: obj.designFieldId,
            inputValue: obj.inputValue,
            mSortNo: obj.mSortNo,
        }
        this.$http.get('/api/ProductSeachByDesignField', { params: data }).then(res => {
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
        }
    }
}
</script>

<style lang="less">

</style>