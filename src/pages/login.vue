<template>
    <div class="login">
        <mt-header title="用户登录">
            <!-- <router-link to="" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link> -->
        </mt-header>

        <div style="margin:12px 0 20px;">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>

            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        </div>

        <div class="text-center">
            <mt-button size="small" type="primary" @click="submit()" style="width:180px;">确定</mt-button>
        </div>

    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
    name: 'home',
    data() {
        return {
            username: '',
            pwd: ''
        }
    },
    created() {

    },
    methods: {
        submit(){
            
            //http://120.27.163.36:5568/api/User?weiXinCode=gh_6297f82da259&username=admin&pwd=admin
            if(this.username === ''){
                Toast("请输入用户名")
                return;
            }
            if(this.pwd === ''){
                Toast("请输入密码")
                return;
            }
            let data = {
                username: this.username,
                pwd: this.pwd
            }
            Indicator.open();
            this.$http.get('/api/User',{ params: data }).then(res => {
                Indicator.close();
                // console.log(" login in ")
                if(res.status == 'E'){
                    Toast(res.message);
                }else{
                    this.$router.push('/home/index')
                }
                // console.log(JSON.parse(res.data))
                // let getData = JSON.parse(res.data);
                // this.homeList = getData.DataList;
                // 
            }, res => {
                // error callback
            });
        }
    }
}
</script>

<style lang="less">

</style>