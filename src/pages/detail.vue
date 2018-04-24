<template>
    <div class="home">
        {{dom}}

    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            pageId:'',          
            keywords:'',
            dom:''
        }
    },
    created() {
        let strArr = this.$route.params.string.split('&&');
        console.log(strArr)
        this.pageId = strArr[0];
        this.keywords = strArr[1];
        this.searchByKeywords();

    },
    methods: {
        searchByKeywords(){
            let data = {
                keywords: this.keywords,
                weiXinCode: 'gh_6297f82da259',
                mSortNo: this.pageId,
            }
            this.$http.get('/api/ProductSearchByStyleWord', {params:data}).then(res => {
                console.log(" ^^^^ ")
                console.log(JSON.parse(res.data))
                let getData = JSON.parse(res.data);
                this.dom = getData.DataList;
                // this.tabsMore = getData.DataList;
                // Indicator.close();
            }, res => {
                // error callback
            });
        }
       
    }
}
</script>

<style lang="less">

</style>