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
    utils = require('loader-utils'),
    cssLoader = require('css-loader'),
    isProduction = process.env.NODE_ENV === 'production',
    cssLoaderOptions = {
        minimize: isProduction,
        modules: true,
        sourceMap: !isProduction,
        camelCase: 'dashes',
        localIdentName: '[local]-[hash:base64:8]'
    };


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

    // 加载代码
    return cssLoader.apply(proxy, args);
};
