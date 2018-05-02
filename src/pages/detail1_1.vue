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

            <!-- <table class="noBorder" style="margin-top:20px;">
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
            </table> -->

            <table class="detailOnly" style="margin-top:10px;" v-for="(item,index) in dom" :key="index">
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

        let data = {
            weiXinCode: 'gh_6297f82da259',
            fid: obj.FID
        }
        this.$http.get('/api/ProductDetail', { params: data }).then(res => {
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