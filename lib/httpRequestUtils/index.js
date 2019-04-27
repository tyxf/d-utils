"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const index_1 = require("./../logUtils/index");
require('promise.prototype.finally').shim();
/**
 * 网页请求的操作
 * axios
 */
class HttpRequestUtils {
    /**
     * @description 初始化axios的基础信息以及 axios的响应拦截的操作
     * @param fn
     * 方法内部有两个参数，一个是axios，另外一个是 HttpRequestUtils 的class
     * @return { class } HttpRequestUtils 返回一个构造函数
     */
    static init(fn) {
        index_1.default.logInfo('https://github.com/IFmiss/d-js-utils/blob/typescript/src/lib/httpRequestUtils/axiosConfig.ts', `HttpRequestUtils.init 需要自定义aixos的响应拦截以及基本配置 =>`);
        if (fn && typeof fn === 'function') {
            fn.call(null, axios_1.default, HttpRequestUtils);
        }
        HttpRequestUtils.isInit = true;
        return HttpRequestUtils;
    }
    /**
     * @description get的请求操作
     * @param { string } url 请求的url
     * @param { object } config 相关axios的配置信息
     * @return { Promise }
     */
    static get(url, config) {
        if (!HttpRequestUtils.isInit) {
            index_1.default.logError('需要执行HttpRequestUtils.isInit()方法，才可以执行请求操作', `http-request: => error`);
            return;
        }
        index_1.default.logWarning('请求开始', `http-request: [get] start => ${url}`);
        axios_1.default.get(url, config).then((res) => {
            index_1.default.logSuccess(res, `http-request: [get] success => ${url}`);
            return Promise.resolve(res);
        }).catch((e) => {
            index_1.default.logError(e, `http-request: [get] error => ${url}`);
            return Promise.reject(e);
        }).finally(() => {
            index_1.default.logInfo('请求结束', `http-request: [get] complete => ${url}`);
        });
    }
    /**
     * @description post的请求操作
     * @param { string } url 请求的url
     * @param { object } data 请求的参数
     * @param { object } config 相关axios的配置信息
     * @return { Promise }
     */
    static post(url, data, config) {
        if (!HttpRequestUtils.isInit) {
            index_1.default.logError('需要执行HttpRequestUtils.isInit()方法，才可以执行请求操作', `http-request: => error`);
            return;
        }
        const postInfo = Object.assign({}, { data: data }, config);
        index_1.default.logWarning('请求开始', `http-request: [post] start => ${url}`);
        axios_1.default.post(url, postInfo).then((res) => {
            index_1.default.logSuccess(res, `http-request: [post] success => ${url}`);
            return Promise.resolve(res);
        }).catch((e) => {
            index_1.default.logError(e, `http-request: [post] error => ${url}`);
            return Promise.reject(e);
        }).finally(() => {
            index_1.default.logInfo('请求结束', `http-request: [post] complete => ${url}`);
        });
    }
}
/**
 * 设置默认成功的CODE码
 */
HttpRequestUtils.successCode = 200;
/**
 * 基础url
 */
HttpRequestUtils.baseUrl = '';
/**
 * timeout时长
 */
HttpRequestUtils.timeOut = 15000;
/**
 * 是否初始化了
 */
HttpRequestUtils.isInit = false;
exports.default = HttpRequestUtils;