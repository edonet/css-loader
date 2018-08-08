/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 13:30:23
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    utils = require('../../../../Library/Caches/typescript/2.9/node_modules/@types/loader-utils'),
    cssLoader = require('css-loader'),
    cssLoaderOptions = {
        minimize: process.env.BABEL_ENV === 'production',
        modules: true,
        camelCase: 'dashes',
        localIdentName: '[local]-[hash:base64:8]'
    };


/**
 *****************************************
 * 定义模板
 *****************************************
 */
const code = `
    if (exports.locals) {
        var locals = exports.locals;

        // 更新模块
        exports.locals = {
            __esModule: true,
            default: locals,
            use: require("${ require.resolve('./styled.js') }").default(locals)
        };
    }
`;


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function loader(...args) {
    let options = {
            ...cssLoaderOptions,
            ...utils.getOptions(this),
            ...utils.parseQuery(this.resourceQuery || '?')
        },
        proxy = Object.create(this, {
            query: {
                get() { return options; }
            }
        });


    // 全局样式
    if (options.global) {
        options.modules = false;
    }

    // 拦截返回
    proxy.async = () => {
        let callback = this.async();

        // 返回挂载回调
        return (...result) => {

            // 添加模块对焦
            if (options.modules && result[1]) {
                result[1] += code;
            }

            // 执行回调
            callback.apply(this, result);
        };
    };

    // 加载代码
    return cssLoader.apply(proxy, args);
};
