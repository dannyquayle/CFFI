// let testArr = [1,2,1,3,1,1,2,4,44,4];

// 方法一：哈希表
function eliminate(arr) {
    var tool = new Map(), newArr = [];

    for (let i = 0; i < arr.length; i++) {
        tool.set(arr[i],);        
    }
    tool.forEach(function(val,key){
        newArr.push(key);
    })
    
    return newArr;
}

// var result = eliminate(testArr);
// result