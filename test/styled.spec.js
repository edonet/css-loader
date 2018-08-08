/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 15:05:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import styled from '../lib/styled';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【use】', () => {
    test('测试【use】', () => {
        let use = styled({ test: 'test-class' });
        console.log(use());

        // 校验结果
        expect(use('abs', null, 'box', 1, 'test')).toBe('abs box test-class');
        expect(use(['abs', 'box'], 'c1', () => 'c2')).toBe('abs box c1 c2');
        expect(use('abs', { test: true, c1: '', c2: 1 })).toBe('abs test-class c2');
        expect(use(() => 'test', () => ({ c1: false, c2: 1 }))).toBe('test-class c2');
        expect(use('abs', 'box', { abs: true, box: false }, 'c1', 'c1 c2')).toBe('abs box c1 c2');

        // 添加对象
        use = use.styled({ abs: 'abs-class', box: 'box-class' });

        // 校验结果
        expect(use('abs', null, 'box', 1, 'test')).toBe('abs-class box-class test-class');
        expect(use(['abs', 'box'], 'c1', () => 'c2')).toBe('abs-class box-class c1 c2');
        expect(use('abs', { test: true, c1: '', c2: 1 })).toBe('abs-class test-class c2');
        expect(use(() => 'test', () => ({ c1: false, c2: 1 }))).toBe('test-class c2');
        expect(use('abs', 'box', { abs: true, box: false }, 'c1', 'c1 c2')).toBe('abs-class box-class c1 c2');
    });
});
