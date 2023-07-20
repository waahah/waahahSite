---
title: JavaScript for in 与 for of 的区别
date: 2023-07-24 14:58:36
tags: [JavaScript, CORS, CSP]
categories: [Coding, JavaScript]
---

### 前言

js遍历对象for in 和for of

**for in 是ES5标准，遍历的是key（可遍历对象，数组和字符串的key）**

**for of 是ES6标准，遍历的是value（可遍历对象，数组和字符串的value）**

**一、for in**
------------

for in 用来循环数组不是一个合适的选择 ，使用for...in可以遍历数组，但会存在以下问题：

*   index索引为字符串型数字（数字，非数字），不能进行集合运算
*   遍历顺序有可能不是按照实际数组的内部顺序（可能按照随机顺序）
*   使用for-in会遍历数组所有的可枚举属性，包括原型。原型方法method和name属性都会被遍历出来，通常需要配合hasOwnProperty()方法判断某个属性是否该对象的实例属性，来将原型对象从循环中剔除。
*   如果迭代的对象的变量值是null或者undefined, for in不执行循环体，建议在使用for in循环之前，先检查该对象的值是不是null或者undefined

### for in 应用于数组中

```js
Array.prototype.sayHello = function(){
    console.log('hello');
}

Array.prototype.str = 'world'
var myArray = [1,2,10,30,34]
myArray.name = '数组'
for (const key in myArray) {
    console.log(key);
}
//迭代的是属性key，不是值。
//结果 0 1 2 3 4 name sayHello str
```

### for in 应用于对象中

```js
Object.prototype.sayHello = function(){
    console.log('hello');
}
Object.prototype.str = 'world'
var myObject = {name:'dd',age:12}
for (const index in myObject) {
    console.log(index);
}
//结果 name age sayHello str 首先输出的是对象的属性名，再是对象原型中的属性和方法
```

### hasOwnProperty方法

如果不想让其输出原型中的属性和方法，可以使用 hasOwnProperty方法进行过滤

```js
Object.prototype.sayHello = function(){
    console.log('hello');
}
Object.prototype.str = 'world'
var myObject = {name:'dd',age:12}
for (const index in myObject) {
    if (myObject.hasOwnProperty(index)) {
        console.log(index);
    }
}
//结果 name age
```

二、**for of**
------------

for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.

for...of`循环不会循环对象的key，只会循环出数组的value，因此`for...of`不能循环遍历普通对象,对普通对象的属性遍历推荐使用`for...in

如果实在想用`for...of`来遍历普通对象的属性的话，可以通过和`Object.keys()`搭配使用，先获取对象的所有key的数组

```js
var obj = {
    name:'zhangsan',
    age:18,
    skil:{
      say:'hello',
      eat:'fruit'
    }
  }
  for(let key of obj){
    consoloe.log(key);
  }//报错
  for (const key of Object.keys(obj)) {
    //使用Object.keys()方法获取对象key的数组
    console.log(key+":"+obj[key]);
  }
```
```js
var myObject = {
    name:'zhangsan',
    age:10
  }
  var arr = [1,2,3,4,5]
    
  for(let key of myObject){
    consoloe.log(key);
  }
  //输出结果
  //typeError
  for (const key of arr) {
    console.log(key); //1 2 3 4 5
  }
  
  for (let key in myObject) {
    console.log(key); //name age
    console.log(myObject[key]); //zhangsan 10
  }

  for (const key in arr) {
    console.log(key); // 0 1 2 3 4 得到下标
    console.log(arr[key]); // 0 1  1 2  2 3  3 4  4 5 得到索引和值
  }
```

三、总结
----

for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值

for in总是得到对象的key或数组、字符串的下标

for of总是得到对象的value或数组、字符串的值
