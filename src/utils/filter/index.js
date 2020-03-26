import moment from 'moment'

/**
 * 时间格式化字符串
 * @param value {Date} 时间
 * @param type {string} 格式化类型 {''|'date'|'datetime'|'time'} 默认'datetime'
 * @param formatStr {string} 自定义格式化字符串 type 为空时生效
 * @returns {string}
 */
const dateFormat = function (value, type, formatStr) {
  let formatString = 'YYYY-MM-DD HH:mm:ss'
  let mDate = moment(value)
  if (!value || (mDate.toDate().toString() === 'Invalid Date') || mDate.isSame('2001-01-01', 'day')) {
    return '-'
  }
  switch (type) {
    case 'date':
      formatString = 'YYYY-MM-DD'
      break
    case 'day':
      formatString = 'MM-DD'
      break
    case 'datetime':
      formatString = 'YYYY-MM-DD HH:mm:ss'
      break
    case 'time':
      formatString = 'HH:mm:ss'
      break
    default:
      if (formatStr) {
        formatString = formatStr
      }
      break
  }
  return mDate.format(formatString)
}

/**
 * 时间戳转日期显示
 * @param value {Date} 时间
 * @returns {string}
 */
const timestampFormat = function (value) {
  let formatString = 'YYYY-MM-DD HH:mm:ss'
  var mDate = moment(value * 1000)
  return mDate.format(formatString)
}

export default {
  dateFormat,
  timestampFormat
}
