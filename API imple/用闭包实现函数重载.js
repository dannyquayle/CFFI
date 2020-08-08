/*
 * @Author: your name
 * @Date: 2020-08-08 23:15:04
 * @LastEditTime: 2020-08-09 00:51:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Code For Front-end Interview/API imple/用闭包实现函数重载.js
 */

 /** 测试用例 */
var people = {
    names: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};

/**
 * 返回所有name。
 * 
 * @returns {Array} 返回一个人名数组。
 */
function find0() {
    return this.names;
}

/**
 * 返回与 firstName 匹配的 name。
 * 
 * @param {String} firstName 传入的 first name。
 * @returns {Array} 返回一个人名数组。
 */
function find1(firstName) {
    var result = [];
    for (var i = 0; i < this.names.length; i++) {
        if (this.names[i].indexOf(firstName) === 0) {
            result.push(this.names[i]);
        }
    }
    return result;
}

/**
 * 返回与 firstName 和 lastName 都匹配的 name。
 * 
 * @param {String} firstName 传入的 first name。
 * @param {String} lastName 传入的 last name。
 * @returns {Array} 返回一个人名数组。
 */
function find2(firstName, lastName) {
    var result = [];
    for (var i = 0; i < this.names.length; i++) {
        if (this.names[i] === firstName + " " + lastName) {
            result.push(this.names[i]);
        }
    }
    return result;
}

/**
 * 用闭包实现函数重载。
 * 
 * @param {*} obj 需绑定函数的对象。
 * @param {*} pName 需要绑定的属性。
 * @param {Function} f 被绑定的方法。
 * @example
 * 
 * addMethod(people, "find", find0);
 * addMethod(people, "find", find1);
 * addMethod(people, "find", find2);
 * 
 * console.log(people.find());
 * // => ["Dean Edwards", "Alex Russell", "Dean Tom"]
 * 
 * console.log(people.find("Dean"));
 * // => ["Dean Edwards", "Dean Tom"]
 * 
 * console.log(people.find("Dean", "Edwards"));
 * // => ["Dean Edwards"]
 */
var addMethod = function(obj, pName, f) {
    var old = obj[pName];
    // 将匿名函数绑定在 obj[pName] 上
    obj[pName] = function() {
        // f.length 为重载函数定义时的参数个数；arguments.length 为调用时的参数个数
        if (arguments.length === f.length) {
           return f.apply(this, arguments);
        }
        else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}

