<template>
    <div class="detail">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" style="height:88px;">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            loading:false,
            list: [1, 2, 2, 2, 2, 2, 2, 2],
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
            mSortNo: obj.mSortNo,
            pageIndex: 1,
            pageSize: 3
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
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                    this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
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