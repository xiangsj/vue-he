<template>
<div>
    <div class="tabContent searchBody1">
        <div class="inputRight">
            <mt-field label="关键字" placeholder="请输入车型关键字直接检索" v-model="search.keywords"></mt-field>
        </div>
        <div @click="$refs.selectBrand.open()">
            <mt-cell title="汽车品牌" is-link value="请选择汽车品牌">
                <span v-if="search.brand.BrandName != ''">{{search.brand.BrandName}}</span>
            </mt-cell>
        </div>
        <div @click="treeClick()">
            <mt-cell title="汽车车系" is-link value="请选择汽车车系">
                <span v-if="search.tree.VehicleName != ''">{{search.tree.VehicleName}}</span>
            </mt-cell>
        </div>

        <div @click="SNclick()">
            <mt-cell title="车型" is-link value="请选择车型">
                <span v-if="search.SN.BSX != ''">{{search.SN.BSX}}</span>
            </mt-cell>
        </div>
        <div class="text-center">
            <mt-button size="small" type="primary" @click="oneClick" style="width:80px;margin:0 10px;">搜索</mt-button>
            <mt-button size="small" @click="clearTab1" style="width:80px;margin:0 10px;">清除</mt-button>
        </div>
    </div>

    <!-- 选品牌 -->
        <select-brand ref="selectBrand" @updata="updataBrand"></select-brand>

        <!-- 选品牌 -->
        <select-brand-tree ref="selectBrandTree" @updata="updataBrandTree"></select-brand-tree>

        <!-- 选车型 -->
        <select-brand-SN ref="selectBrandSN" @updata="updataBrandSN"></select-brand-SN>
</div>
</template>

<script>
import selectBrand from '../components/selectBrand'
import selectBrandTree from '../components/selectBrandTree'
import selectBrandSN from '../components/selectBrandSN'
export default {
    name: 'searchBody1',
    data() {
        return {
            search: {
                keywords: '',
                brand: {
                    BrandID: '',
                    BrandName: '',
                },
                tree: {
                    VehicleID: '',
                    VehicleName: '',
                },
                SN: {
                    BSX: ''
                }
            },
        }
    },
    created() {

    },
    methods: {
        treeClick(){
            if(this.search.brand.BrandID != ''){
                this.$refs.selectBrandTree.open()
            }else{
                Toast('请先选择品牌');
            }
        },
        //clearTab1
        clearTab1() {
            this.search = {
                keywords: '',
                brand: {
                    BrandID: '',
                    BrandName: '',
                },
                tree: {
                    VehicleID: '',
                    VehicleName: '',
                },
                SN: {
                    BSX: ''
                }
            }
        },
        SNclick() {
            if (this.search.tree.VehicleID != '') {
                this.$refs.selectBrandSN.open(this.search.tree);//上一级数据传过去
            } else {
                Toast('请先选择车系');
            }
        },
        updataBrandSN(item) {
            this.search.SN = item;
            console.log(item)
        },
        updataBrandTree(item) {
            console.log(" ooo ")
            console.log(item)
            this.search.tree = item;
            // console.log(" ooo ")
        },
        updataBrand(item) {
            console.log(" jjj ")
            // console.log(item)
            this.search.brand = item;
            // console.log(" ooo ")
        },
        oneClick() {
            console.log('  j     jjjjjjj ');
            if (this.search.keywords !== '') {
                // console.log(" 666 ")
                // this.searchByKeywords();
                this.$router.push('/home/detail/' + this.pageId + '&&' + this.search.keywords)
            }
        },
    },
    components: {
        'select-brand': selectBrand,
        'select-brand-tree': selectBrandTree,
        'select-brand-SN': selectBrandSN,
    }
}
</script>

<style lang="less">

</style>