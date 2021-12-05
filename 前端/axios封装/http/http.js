import axios from "axios";
import qs from "qs";

// 创建一个axios实例对象
let instance = axios.create({
    baseURL: 'http://localhost:9001/',
    timeout: 3000,
});

// 添加axios实例请求拦截器，在请求头中添加用户登录的token信息
instance.interceptors.request.use(
    config => {
      if (sessionStorage.getItem('token')) {
          config.headers["token"] = sessionStorage.getItem('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// 定义一个http请求类，封装各种类型的axios请求
class http {
  // 使用async ... await
  static async awaitGet(url, params) {
    // console.log(params)
    return await instance.get(url, { params });
  }
  static async awaitPost(url, params) {
    // console.log(params)
    return await instance.post(url, qs.stringify(params));
  }
  static get(url, params) {
    // console.log(params)
    return new instance.get(url, { params });
  }
  static post(url, params) {
      // eslint-disable-next-line no-console
    console.log(params)
    return instance.post(url, qs.stringify(params));
  }
  static post2(url, params) {
    // eslint-disable-next-line no-console
    console.log(params)
    return instance.post(url, params);
  }
}
// 导出
export default http;
