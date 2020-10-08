import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    return res
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
// 对get和post进行集成

function http(configOptions) {
  var config = {}
  config.url = configOptions.url
  if (configOptions.method.toLowerCase() == 'get') {
    // 针对get处理 参数应该放到params中
    config.method = 'get'
    config.params = configOptions.data
  } else if (configOptions.method.toLowerCase() == 'post') {
    config.method = 'post'
    // post提交设置请求头
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // 需要用qs对数据进行序列化处理
    // 思考: 不处理会出现什么情况?以及数据提交的多种格式分别是什么?
    // 1.  { a: { b: { c: 'd', e: 'f' } } } ==> 'a.b.c=d&a.b.e=f'
    // 2. { a: ['b', 'c'] } ==> 'a=b&a=c'
    config.data = qs.stringify(configOptions.data, { allowDots: true, arrayFormat: 'repeat' })
  }
  // 转换后的config注入到axios中
  return service(config)
}

export default http
