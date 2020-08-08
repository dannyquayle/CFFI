/*
 * @Author: your name
 * @Date: 2020-08-08 22:32:54
 * @LastEditTime: 2020-08-09 00:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Code For Front-end Interview/API imple/手写forEach、map函数实现.js
 */


 /**
  * 对数组的每个元素执行一次给定的回调函数。
  * 
  * @param 给定的回调函数。
  * @returns undefined.
  */
Array.prototype.myForEach = function(callback) {
    let _len, _idx;

    _idx = -1;
    _len = this.length;

    while(++_idx < _len) {
        callback(this[_idx], _idx, arr);
    }

    return;
}


/**
 * 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * 
 * @param 给定的回调函数。
 * @returns 新数组。
 */
Array.prototype.myMap = function(callback) {
    let _len, _idx, _newArr;

    _idx = -1;
    _len = this.length;
    _newArr = [];

    while(++_idx < _len) {
        _newArr.length++;
        _newArr[_idx] = callback(this[_idx], _idx, arr);
    }

    return _newArr;
}



