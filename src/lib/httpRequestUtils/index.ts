import axios from 'axios'
import LogUtils from './../logUtils/index'
require('promise.prototype.finally').shim()
/**
 * 网页请求的操作
 * axios
 */
export default class HttpRequestUtils {
  /**
   * 设置默认成功的CODE码
   */
  static successCode:number = 200
  
  /**
   * 基础url
   */
  static baseUrl: string = ''

  /**
   * timeout时长
   */
  static timeOut: number = 15000

  /**
   * 是否初始化了
   */
  private static isInit: boolean = false

  /**
   * @description 初始化axios的基础信息以及 axios的响应拦截的操作
   * @param fn 
   * 方法内部有两个参数，一个是axios，另外一个是 HttpRequestUtils 的class
   * @return { class } HttpRequestUtils 返回一个构造函数
   */
  static init (fn?: Function): any {
    LogUtils.logInfo('https://github.com/IFmiss/d-js-utils/blob/typescript/src/lib/httpRequestUtils/axiosConfig.ts',
                       `[d-utils] http_request HttpRequestUtils.init 需要自定义aixos的响应拦截以及基本配置 => `)
    if (fn && typeof fn === 'function') {
      fn.call(null, axios, HttpRequestUtils)
    }
    HttpRequestUtils.isInit = true
    return HttpRequestUtils
  }

  /**
   * @description get的请求操作
   * @param { string } url 请求的url
   * @param { object } config 相关axios的配置信息
   * @return { Promise }
   */
  static get (url: string, config?: any): Promise<any> {
    if (!HttpRequestUtils.isInit) {
      LogUtils.logError('需要执行HttpRequestUtils.isInit()方法，才可以执行请求操作', `[d-utils] http_request: => error`)
      return
    }
    axios.get(url, config).then((res: any) => {
      LogUtils.groupCollapsed(`[d-utils] http_request get 请求成功 => ${url}`, LogUtils.successColor)
      LogUtils.logInfo(res, `http_request response => `)
      LogUtils.groupEnd()
      return Promise.resolve(res)
    }).catch((e: any) => {
      LogUtils.groupCollapsed(`[d-utils] http_request get 请求成功 ${url}`, LogUtils.successColor)
      LogUtils.logInfo(e, `http_request error => `)
      LogUtils.groupEnd()
      return Promise.reject(e)
    })
  }

  /**
   * @description post的请求操作
   * @param { string } url 请求的url
   * @param { object } data 请求的参数
   * @param { object } config 相关axios的配置信息
   * @return { Promise }
   */
  static post (url: string, data?: any, config?: any): Promise<any> {
    if (!HttpRequestUtils.isInit) {
      LogUtils.logError('需要执行HttpRequestUtils.isInit()方法，才可以执行请求操作', `[d-utils] http_request error => `)
      return
    }
    const postInfo:any = Object.assign({}, {data: data}, config)
    axios.post(url, postInfo).then((res: any) => {
      LogUtils.groupCollapsed(`[d-utils] http_request post 请求成功 => ${url}`, LogUtils.successColor)
      LogUtils.logInfo(res, `http_request response => `)
      LogUtils.groupEnd()
      return Promise.resolve(res)
    }).catch((e: any) => {
      LogUtils.groupCollapsed(`[d-utils] http_request post 请求失败 => ${url}`, LogUtils.errorColor)
      LogUtils.logInfo(e, `http_request error => `)
      LogUtils.groupEnd()
      return Promise.reject(e)
    })
  }
}