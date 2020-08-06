/*
 * @Author: your name
 * @Date: 2020-08-06 14:49:53
 * @LastEditTime: 2020-08-06 17:15:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Code For Front-end Interview/浅拷贝与深拷贝.js
 */
// 测试样例
const target = {
    field1: 1,
    field2: undefined,
    field3: 'Quayle',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
};

/**
 * 创建一个 target 的浅拷贝
 * 
 * 创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性依次添加到新对象上，返回
 * 
 * @param {*} target  需要拷贝的对象
 */
function cloneShallow(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};

/**
 * 创建一个 target 的深拷贝
 * 
 * 需克隆的对象的层数未知，故使用递归
 * 如果是原始类型，无需继续拷贝，直接返回；
 * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
 * 
 * 这是最基础版本的深拷贝，只考虑 target 类型为 object
 * 
 * @param {*} target  需要拷贝的对象
 */
function cloneDeepV1(target) {
    if(typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = cloneDeepV1(target[key]);
        }
        return cloneTarget;
    }
    else {
        return target;
    }
}


