import Vue from 'vue'
import axios from 'axios'
// Vue.prototype.$http = axios

//http request 封装请求头拦截器
axios.interceptors.request.use(config => {
  //   console.log("request")
  // var token = ''
  // if(typeof Cookies.get('user') === 'undefined'){
  //   //此时为空
  // }else {
  //   token = JSON.parse(Cookies.get('user')).token
  // }//注意使用的时候需要引入cookie方法，推荐js-cookie
  // config.data = JSON.stringify(config.data);
  // config.headers = {
  //   'Content-Type':'application/json'
  // }
  // if(token != ''){
  //  config.headers.token = token;
  // }
  return config;
}, error => {
  return Promise.reject(err);
});

//http response 封装后台返回拦截器
axios.interceptors.response.use(response => {
  //   console.log(response)
  //   console.log(typeof response.data)
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
export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data2);
      })
      .catch(err => {
        reject(err)
      })
  })
}

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
