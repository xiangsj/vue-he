<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" src="http://120.27.163.36:5568/downloadImages/gh_6297f82da259/201804/LogoImage/gh_6297f82da259.jpg">
        </div>
        <div class="tableWrap">
            <div>

            </div>
            <table class="noBorder" style="margin-top:20px;" v-for="(item,index) in dom" :key="index">
                <tr>
                    <td width=100>
                        <!-- <img v-if="item.MainImage && item.MainImage !== ''" src="item.MainImage">
                        <div v-else class="text-center">暂无图片</div> -->
                        产品名
                    </td>
                    <td>
                        {{item.Brand}}{{item.Item_C_Name}}
                    </td>
                </tr>
                <tr>
                    <td>Item_C_Spec</td>
                    <td>{{item.Item_C_Spec}}</td>
                </tr>
                <tr>
                    <td>ProvItemNo</td>
                    <td>{{item.ProvItemNo}}</td>
                </tr>
                <tr>
                    <td>单位</td>
                    <td>{{item.Unit}}</td>
                </tr>
                <tr>
                    <td>EngineNo</td>
                    <td>{{item.EngineNo}}</td>
                </tr>
                <tr>
                    <td>BoxQty</td>
                    <td>{{item.BoxQty}}</td>
                </tr>
                <tr>
                    <td>CarQty</td>
                    <td>{{item.CarQty}}</td>
                </tr>
            </table>
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
            dom: ''
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
            mSortNo: strArr[1]
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