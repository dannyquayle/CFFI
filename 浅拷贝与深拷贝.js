/*
 * @Author: Quayle
 * @Date: 2020-08-06 14:49:53
 * @LastEditTime: 2020-08-06 21:01:16
 * @LastEditors: Please set LastEditors
 * @Description: code about clone
 * @FilePath: /Code For Front-end Interview/浅拷贝与深拷贝.js
 */

// 测试样例
const target1= {
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

const target2 = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};

const target3 = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
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

/**
 * 创建一个 target 的深拷贝
 * 
 * 在 cloneDeepV1 方法上，新增兼容 array
 * 
 * @param {*} target  需要拷贝的对象
 */
function cloneDeepV2(target) {
    if(typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = cloneDeepV2(target[key]);
        }
        return cloneTarget;
    }
    else {
        return target;
    }
}

/**
 * 创建一个 target 的深拷贝
 * 
 * 在 cloneDeepV2 方法上，解决循环应用报错
 * 额外开辟一个存储空间，来存储当前调用栈对象和新对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象  
 * 如果有的话返回彼调用栈中的新对象；如果没有的话继续拷贝  
 * 这里 map 的 key 是一个引用类型
 * 
 * @param {*} target 需要拷贝的对象
 * @param {Object} map  保存拷贝过的对象
 */
function cloneDeepV3(target, map = new Map()) {
    if(typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = cloneDeepV3(target[key], map);
        }
        return cloneTarget;
    }
    else {
        return target;
    }
}

/**
 * 创建一个 target 的深拷贝
 * 
 * 在 cloneDeepV3 方法上，用 while 代替 for in 提高遍历效率
 * 对于需克隆的对象，通过 Object.keys() 获取其键的数组，通过 while 改写的 forEach 方法遍历 keys，并执行回调函数完成拷贝 
 * 
 * @param {*} target  需要拷贝的对象
 * @param {Object} map 保存拷贝过的对象
 */
function cloneDeepV4(target, map = new Map()) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};

        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = clone(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
}

/**
 * 用 while 实现的 forEach 函数
 *   
 * @param {Array} array 需要遍历的数组
 * @param {Function} iteratee 作为遍历的回调函数，接收每次 epoch 数组的索引和其对应的值
 */
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

