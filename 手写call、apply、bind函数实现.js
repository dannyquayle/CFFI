/**
 * 自定义 call 实现
 * @param context   上下文this对象
 * @param args      动态参数
 */

Function.prototype.myCall = function(context, ...args) {
    // 1. context 应该是一个对象。如果参数为空、null 和 undefined，则默认传入全局对象
    context = (typeof context === 'object' ? context : window);
    // 2. 将方法写入目标对象，并且要防止覆盖掉对象原有属性
    const key = Symbol();
    // this 为需要绑定的方法
    context[key] = this;
    // 3. 对象调用方法
    const result = context[key](...args);
    delete context[key];
    return result;
}

// 验证样例
function fun(arg1, arg2) {
    return {
        name: this.name,
        sum: arg1 + arg2
    }
}
const _this = { name: 'Alia' }

fun.myCall(_this, 1, 2);

