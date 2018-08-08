/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 14:15:42
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 使用样式
 *****************************************
 */
export default function styled(...args) {
    let locals = Object.assign({}, ...args);

    // 定义使用函数
    function use(...args) {
        var map = {},
            list = [];


        // 获取列表
        classList(args, name => {
            if (name && !(name in map)) {
                map[name] = list.push(locals[name] || name);
            }
        });

        // 返回样式
        return list.join(' ');
    }

    // 定义扩展方法
    use.styled = (...args) => styled(locals, ...args);

    // 返回函数
    return use;
}


/**
 *****************************************
 * 创建样式列表
 *****************************************
 */
function classList(args, add) {
    args.forEach(argv => {
        if (argv) {
            var type = typeof argv;

            // 处理字符串
            if (type === 'string') {
                return argv.split(' ').forEach(add);
            }

            // 处理列表
            if (Array.isArray(argv)) {
                return classList(argv, add);
            }

            // 处理对象
            if (type === 'object') {
                return Object.keys(argv).forEach(key => argv[key] && add(key));
            }

            // 处理函数
            if (type === 'function') {
                return classList([argv()], add);
            }
        }
    });
}
