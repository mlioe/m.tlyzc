'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;

function dealNumber(num, digits) {
  // var num2=num.toFixed(digits+1);
  // return  parseFloat(num2.substring(0,num2.lastIndexOf('.')+(digits+1)));
  var num2 = num.toFixed(digits + 2);
  //获取2位数的数字
  num2 = parseFloat(num2.substring(0, num2.lastIndexOf('.') + (digits + 1)));
  //弥补精度问题，乘以100，加上0.5
  num2 = parseInt(num2 * 100 + (num2 > 0 ? 0.5 : -0.5)) / 100;

  return num2;
};

function getFloatObj(num, digits) {
  var str = num.toString();
  var len = str.length;
  var index = str.lastIndexOf(".");
  //计算出小数位
  var times = Math.pow(10, index > -1 ? len - (index + 1) : 0);
  return {
    num: dealNumber(num * times, digits),
    times: times
  };
}
function operation(a, b, digits, op) {
  // console.log(a,b);
  var o1 = getFloatObj(a, digits);
  var o2 = getFloatObj(b, digits);
  // console.log(o1,o2);
  var n1 = o1.num;
  var n2 = o2.num;
  var t1 = o1.times;
  var t2 = o2.times;
  // console.log(n1,n2,t1,t2);
  var max = t1 > t2 ? t1 : t2;
  var result = null;
  switch (op) {
    case 'add':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 + n2;
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2);
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2;
      }
      // console.log(result);
      return dealNumber(result / max, digits);
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2;
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) - n2;
      }
      return dealNumber(result / max, digits);
    case 'multiply':
      result = n1 * n2 / (t1 * t2);
      return dealNumber(result, digits);
    case 'divide':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 / n2;
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 / (n2 * (t1 / t2));
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) / n2;
      }
      return dealNumber(result, digits);
  }
}

// 加减乘除的四个接口,digits精度，保留几位小数
function add(a, b, digits) {
  //加
  return operation(a, b, digits || 2, 'add');
}

function subtract(a, b, digits) {
  //减
  return operation(a, b, digits || 2, 'subtract');
}

function multiply(a, b, digits) {
  //乘
  return operation(a, b, digits || 2, 'multiply');
}

function divide(a, b, digits) {
  //除
  return operation(a, b, digits || 2, 'divide');
}