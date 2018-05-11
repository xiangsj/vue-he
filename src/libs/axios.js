import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

//http request 封装请求头拦截器
//http://www.php.cn/js-tutorial-394773.html
axios.interceptors.request.use(config => {
  console.log("request")
  console.log(config)
  //请求方式
  let method = config.method.toLowerCase();
  if (method === 'get' || method === 'delete') {
    Object.assign(config.params, {
      "weiXinCode": "gh_6297f82da259"
    });
  }

  return config;
}, error => {
  return Promise.reject(err);
});

//http response 封装后台返回拦截器
axios.interceptors.response.use(response => {
  console.log(response)
  console.log(typeof response.data)
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
  }
  //   return response;
}, error => {
  return Promise.reject(error)
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
// export function fetch(url,params={}){
//   return new Promise((resolve,reject) => {
//     axios.get(url,{
//       params:params
//     })
//       .then(response => {
//         resolve(response.data2);
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// export function fetch(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     // let aa = {
//     //   aa: "aa1"
//     // };
//     axios.get(url, {
//     //   params: Object.assign(params, aa)
//     }).then(response => {
//     //   resolve(response.data);
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }
