import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
// import router from '../router/index'
import { MessageBox } from 'mint-ui';

//http request 封装请求头拦截器
//http://www.php.cn/js-tutorial-394773.html
import { getCookie } from "@/libs/utils.js";
// console.log(getCookie("code"))
axios.interceptors.request.use(config => {
  // console.log("request")
  // console.log(config)
  //没有 cookie 跳转到初始页
  
  //排除此接口，其他自动加上 cookie
  if (config.url !== "/api/Login") {
    let code = getCookie("code");
    if(!code) {
      // console.log(" )))))))))))00 ");
      MessageBox('未授权', '请授权后重新打开此页');
      // router.push("/home/index" + code);
    }
    //请求方式
    let method = config.method.toLowerCase();
    if (method === 'get' || method === 'delete') {
      Object.assign(config.params, {
        "weiXinCode": code
      });
    }
  }
  return config;
}, error => {
  return Promise.reject(err);
});

//http response 封装后台返回拦截器
axios.interceptors.response.use(response => {
  // console.log(response)
  // console.log(typeof response.data)
  //当返回信息为未登录或者登录失效的时候重定向为登录页面
  //   if (response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！') {
  //     router.push({
  //       path: "/",
  //       querry: {
  //         redirect: router.currentRoute.fullPath
  //       } //从哪个页面跳转
  //     })
  //   }
  if (typeof response.data === 'string') {
    return JSON.parse(response.data);
  } else {
    return response;
  }
}, error => {
  return Promise.reject(error)
});

