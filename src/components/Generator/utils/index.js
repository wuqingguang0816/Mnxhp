/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0;
  const result = [];
  let reg;
  let
    spaces = ''
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' '
  }

  str.split('\n').forEach(line => {
    line = isLeft ? line.replace(reg, '') : spaces + line
    result.push(line)
  })
  return result.join('\n')
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

/**
 * 金额转中文
 * 思路：                       
 *                              个
 *      十     百      千       万
 *      十万   百万    千万     亿 
 *      十亿   百亿    千亿    
 *                              
 *                              1
 *      2      3       4        5
 *      6      7       8        9   
 *      10
 * 
 * 计算步骤
 * 1. 获取当前数值大小
 * 2. 排除个位后 数值按个，十，百，千有规律的重复 所以计算其和4的余数 pos % 4
 * 3. pos = 0 ~ 3 没有最大单位
 *    pos = 4 ~ 7 最大单位是万
 *    pos = 8 ~ 11 最大单位是亿
 * pos / 4 的整数就是最大单位
 * 
 */
export function getAmountChinese(val) {
  if (!val && val !== 0) return ''
  const value = val
  if (val < 0) {
    val = Number(val.toString().split('-')[1])
  }
  const amount = +val
  if (Number.isNaN(amount)) return ''
  const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const N_UNIT1 = ['', '拾', '佰', '仟']
  const N_UNIT2 = ['', '万', '亿', '兆']
  const D_UNIT = ['角', '分', '厘', '毫']
  let [integer, decimal] = amount.toString().split('.')
  if (integer && integer.length > 15) return '数字较大溢出'
  let res = ''
  // 整数部分
  if (integer) {
    let zeroCount = 0;
    for (let i = 0, len = integer.length; i < len; i++) {
      const num = integer.charAt(i);
      const pos = len - i - 1; // 排除个位后 所处的索引位置
      const q = pos / 4;
      const m = pos % 4;
      if (num === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0 && m !== 3) res += NUMBER[0];
        zeroCount = 0;
        res += NUMBER[parseInt(num)] + N_UNIT1[m];
      }
      if (m == 0 && zeroCount < 4) res += N_UNIT2[Math.floor(q)];
    }
  }
  res += '元'
  // 小数部分
  if (parseInt(decimal)) {
    for (let i = 0; i < 4; i++) {
      const num = decimal.charAt(i)
      if (parseInt(num)) res += NUMBER[num] + D_UNIT[i]
    }
  } else {
    res += '整'
  }
  if (value < 0) res = '负数' + res
  return res
}
/**
 * 将用户输入的连续单个数字合并为一个数
 * @param {Array} expressions - 记录计算表达式的数组
 * @returns {Array} 新的数组
 */
export const mergeNumberOfExps = expressions => {
  const res = []
  const isNumChar = n => /^[\d|\.]$/.test(n)
  for (let i = 0; i < expressions.length; i++) {
    if (i > 0 && isNumChar(expressions[i - 1]) && isNumChar(expressions[i])) {
      res[res.length - 1] += expressions[i]
      continue
    }
    res.push(expressions[i])
  }
  return res
}
/**
 * 校验表达式是否符合计算法则
 * @param {Array} expressions - 合并数字后的表达式数组
 * @returns {Boolean}
 */
export const validExp = (expressions, mergeNum = true) => {
  const temp = mergeNum ? mergeNumberOfExps(expressions) : expressions
  const arr = temp.filter(t => !'()'.includes(t))
  // 去括号后 length应该为奇数  并且第一个字符和最后一个字符应该为数字而非计算符号
  if (temp.length % 2 === 0 || arr.length % 2 === 0 || Number.isNaN(+arr[0]) || Number.isNaN(+arr[arr.length - 1])) {
    return false
  }
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (typeof (+arr[i]) !== 'number' || !Number.isNaN(+arr[i + 1])) return false
  }
  return true
}
/**
 * 中缀转后缀（逆波兰 Reverse Polish Notation）
 * @param {Array} exps - 中缀表达式数组
 */
export const toRPN = exps => {
  const s1 = [] // 符号栈
  const s2 = [] // 输出栈
  const getTopVal = (stack) => stack.length > 0 ? stack[stack.length - 1] : null
  const levelCompare = (c1, c2) => {
    const getIndex = c => ['+-', '×÷', '()'].findIndex(t => t.includes(c))
    return getIndex(c1) - getIndex(c2)
  }
  exps.forEach(t => {
    if (typeof t === 'string' && Number.isNaN(Number(t))) { // 是符号
      if (t === '(') {
        s1.push(t)
      } else if (t === ')') {
        let popVal
        do {
          popVal = s1.pop()
          popVal !== '(' && s2.push(popVal)
        } while (s1.length && popVal !== '(')
      } else {
        let topVal = getTopVal(s1)
        if (!topVal) { // s1 为空 直接push
          s1.push(t)
        } else {
          while (topVal && topVal !== '(' && levelCompare(topVal, t) >= 0) { // 优先级 >= t 弹出到s2
            s2.push(s1.pop())
            topVal = getTopVal(s1)
          }
          s1.push(t)
        }
      }
      return
    }
    s2.push(t) // 数字直接入栈
  })
  while (s1.length) {
    s2.push(s1.pop())
  }
  return s2
}
/**
 * 计算后缀表达式的值
 * @param {Array} rpnExps - 后缀表达式
 */
export const calcRPN = rpnExps => {
  rpnExps = rpnExps.concat()
  const calc = (x, y, type) => {
    let a1 = Number(x),
      a2 = Number(y)
    switch (type) {
      case '+':
        return a1 + a2;
      case '-':
        return a1 - a2;
      case '×':
        return a1 * a2;
      case '÷':
        return a1 / a2;
    }
  }
  for (let i = 2; i < rpnExps.length; i++) {
    if ('+-×÷'.includes(rpnExps[i])) {
      let val = calc(rpnExps[i - 2], rpnExps[i - 1], rpnExps[i])
      rpnExps.splice(i - 2, 3, val)
      i = i - 2
    }
  }
  return rpnExps[0]
}
/**
 * 简易防抖函数
 * @param {Function} func -防抖目标函数
 * @param {Number} gap - 防抖时间间隔
 */
export const debounce = (func, gap) => {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, gap)
  }
}




//计算年或者月
export function getDateDay(Target, type, monthNum) {
  let date = new Date()
  let year = date.getFullYear() //获取当前日期的年份
  let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) //获取当前日期的月份
  let day = date.getDate() //获取当前日期的日
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let days = new Date(year, month, 0)
  days = days.getDate(); //获取当前日期中的月的天数
  let year2 = year;
  let month2;
  if (Target == 2) {
    if (type == 5) {
      month2 = parseInt(month) + parseInt(monthNum)
      if (month2 > 12) {
        year2 = parseInt(year2) + parseInt((parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12));
        month2 = parseInt(month2) % 12;
      }
    } else if (type == 4) {
      month2 = parseInt(month) - monthNum;
      if (month2 <= 0) {
        let absM = Math.abs(month2);
        year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
        month2 = 12 - (absM % 12);
      }
    }
  } else if (Target == 1) {
    month2 = parseInt(month)
    if (type == 5) {
      year2 = parseInt(year) + parseInt(monthNum)
    } else if (type == 4) {
      year2 = parseInt(year) - parseInt(monthNum)
    }
  }
  let day2 = day;
  let days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  let t2 = year2 + '-' + month2 + '-' + day2 + ' ' + hours + ':' + minutes + ':' + seconds;
  return t2;
}

//计算日
export function getLaterData(days) {

  let date = new Date();
  date.setDate(date.getDate() + Number(days));
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2) + ' ' + hours + ':' + minutes + ':' + seconds;
}
export function getBeforeData(num) {
  let dateArray = []
  //获取今天日期
  let myDate = new Date()
  let hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
  let minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
  let seconds = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
  let today = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate();
  myDate.setDate(myDate.getDate() - num)
  let dateTemp;  // 临时日期数据
  let flag = 1;
  for (let i = 0; i < num; i++) {
    dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate()
    dateArray.push({
      date: dateTemp
    })
    myDate.setDate(myDate.getDate() + flag);
  }
  dateArray.push({
    date: today
  })
  let arr = []
  let newArr = []
  dateArray.forEach(item => {
    arr.push(item.date.split('-'))
  })
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] < 10) {
      arr[i][1] = "0" + arr[i][1]
    }
    if (arr[i][2] < 10) {
      arr[i][2] = "0" + arr[i][2]
    }
  }
  for (let j = 0; j < arr.length; j++) {
    newArr.push(arr[j].join("-"))
  }
  return newArr[0] + ' ' + hours + ':' + minutes + ':' + seconds
}

export function getBeforeTime(type, val) {
  let date = new Date()
  if (type == 4 || type == 1) {
    date.setHours((Number(date.getHours()) - Number(val)))
  } else if (type == 5 || type == 2) {
    date.setMinutes((Number(date.getMinutes()) - Number(val)))
  } else if (type == 6 || type == 3) {
    date.setSeconds((Number(date.getSeconds()) - Number(val)))
  }
  return date
}
export function getLaterTime(type, val) {
  let date = new Date()
  if (type == 4 || type == 1) {
    date.setHours((Number(date.getHours()) + Number(val)))
  } else if (type == 5 || type == 2) {
    date.setMinutes((Number(date.getMinutes()) + Number(val)))
  } else if (type == 6 || type == 3) {
    date.setSeconds((Number(date.getSeconds()) + Number(val)))
  }
  return date
}
export function numberThousandth(number, precision) {
  if (!number) {
    return null
  } else {
    let dec_point = '.'
    let thousands_sep = ','
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let roundtag = 'round' // "ceil","floor","round"
    const n = !isFinite(+number) ? 0 : Number(number) // 检查number是否是无穷大
    const prec = !isFinite(+precision) ? 0 : Math.abs(precision)
    const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
    const dec = typeof dec_point === 'undefined' ? '.' : dec_point
    let s = ''
    const toFixedFix = function (n, prec) {
      n = Number(n)
      prec = Number(prec)
      const k = Math.pow(10, prec) // 10 的 prec 次幂
      return (
        '' +
        parseFloat(
          Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
            prec * 2
          )
        ) /
        k
      ) // 解析一个字符串，并返回一个浮点数。
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    // 当数字位数过长去除科学计数法
    return s.join(dec)
  }
}
export function thousandsFormat(num) {
  if (!num && num !== 0) return ''
  const numArr = num.toString().split('.');
  numArr[0] = numArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numArr.join('.');
}