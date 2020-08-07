/*
 * @Author: Quayle
 * @Date: 2020-08-06 14:49:53
 * @LastEditTime: 2020-08-07 20:24:23
 * @LastEditors: Please set LastEditors
 * @Description: shallow & deep clone ref 2 lodash.js
 * @FilePath: /Code For Front-end Interview/浅拷贝与深拷贝.js
 */

/** 测试用例 */
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

const target4 = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map: new Map().set('name', 'Diana'),
    set: new Set().add('Wat r u looking 4')
};

/** Object#toString result refs. */
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

/**
 * 用 while 实现的 forEach 函数。
 *   
 * @param {Array} array 需要遍历的数组。
 * @param {Function} iteratee 作为遍历的回调函数，接收每次 epoch 数组的索引和其对应的值。
 * @returns {Array} 返回执行完回调函数的数组。
 */
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

/**
 * 获取 target 的准确引用类型。
 * 
 * 使用 Object.prototype.toString 方法来获取准确的引用类型，返回 '[object type]'，其中type是对象的类型  
 * 事实上，大部分引用类型比如 Array、Date、RegExp 等都重写了自己的 toString 方法，要直接使用 Object.prototype.toString 需要使用 call 来改变 this 的指向。
 * 
 * @param {*} target  需要判断的值。
 * @returns {String} target 的准确类型。
 */
function getType(target) {
    return Object.prototype.toString.call(target);
}

/**
 * 判断是否为引用类型。
 * 
 * 注意：typeof null === 'object', typeof Function === 'function'   
 * 引用类型 target 包含 object 与 function 不包括 null。
 * 
 * @param {*} target 需要判断的值。
 * @returns {Boolean} 引用类型返回 true，否则返回 false。
 */
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

/**
 * 初始化传入值的同类型对象。
 * 
 * @param {*} target 传入值
 * @returns {*} 返回由传入值的 constructor 初始化的一个对象
 */
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

/**
 * 创建一个 target 的浅拷贝。
 * 
 * 创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性依次添加到新对象上，返回。
 * 
 * @param {*} target  需要拷贝的对象。
 * @returns {*} 返回克隆值。
 */
function cloneShallow(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};

/**
 * 创建一个 target 的深拷贝。
 * 
 * 需克隆的对象的层数未知，故使用递归。
 * 如果是原始类型，无需继续拷贝，直接返回；
 * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。
 * 这是最基础版本的深拷贝，只考虑 target 类型为 object。
 * 
 * @param {*} target  需要拷贝的对象。
 * @returns {*} 返回克隆值。
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
 * 创建一个 target 的深拷贝。
 * 
 * 在 cloneDeepV1 方法上，新增兼容 array。
 * 
 * @param {*} target  需要拷贝的对象。
 * @returns {*} 返回克隆值。
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
 * 创建一个 target 的深拷贝。
 * 
 * 在 cloneDeepV2 方法上，解决循环应用报错。
 * 额外开辟一个存储空间，来存储当前调用栈对象和新对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象：
 * 如果有的话返回彼调用栈中的新对象；如果没有的话继续拷贝。
 * 这里 map 的 key 是一个引用类型。
 * 
 * @param {*} target 需要拷贝的值。
 * @param {Object} map  保存拷贝过的对象。
 * @returns {*} 返回克隆值。
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
 * 创建一个 target 的深拷贝。
 * 
 * 在 cloneDeepV3 方法上，用 while 代替 for in 提高遍历效率。
 * 对于需克隆的对象，通过 Object.keys() 获取其键的数组，通过 while 改写的 forEach 方法遍历 keys，并执行回调函数完成拷贝。
 * 
 * @param {*} target  需要拷贝的对象。
 * @param {Object} map 保存拷贝过的对象。
 * @returns {*} 返回克隆值。
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
            cloneTarget[key] = cloneDeepV4(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
}

/**
 * 创建一个 target 的深拷贝。
 * 
 * 在 cloneDeepV4 方法上，除原始的 Object, Array 引用类型的克隆外，新兼容了 Map，Set。
 * 
 * @param {*} target 需要拷贝的值。
 * @param {Object} map 保存拷贝过的对象。
 * @returns {*} 返回克隆值。
 */
function cloneDeepV5(target, map = new Map()) {

    // 直接克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 对于引用类型的初始化
    const type = getType(target);
    let cloneTarget = getInit(target);

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(cloneDeepV5(value,map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, cloneDeepV5(value,map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = cloneDeepV5(target[key], map);
    });

    return cloneTarget;
}

