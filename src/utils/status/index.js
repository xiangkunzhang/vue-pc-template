const statusFiles = require.context('./modules', false, /\.js$/)
const statusList = statusFiles.keys().reduce((status, statusPath) => {
  const statusName = statusPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = statusFiles(statusPath)
  status[statusName] = value.default
  return status
}, {})

/**
 * @class
 */
export default class {
  status
  type

  constructor (type) {
    this.status = statusList[type]
    this.type = type
  }

  string (value, defaultStr) {
    if (this.status.hasOwnProperty(value)) {
      return this.status[value]
    }
    if (typeof value !== 'string') {
      value = value.toString()
    }
    let k = Object.keys(this.status).find(key => {
      return key.toLowerCase() === value.toLowerCase()
    })
    if (k) {
      return this.status[k]
    }
    return value || defaultStr
  }

  value (label) {
    return Object.keys(this.status).find(key => {
      return this.status[key] === label
    })
  }

  keys () {
    return Object.keys(this.status)
  }

  values () {
    return Object.values(this.status)
  }

  options () {
    let opt = []
    Object.keys(this.status).forEach(key => {
      let i = parseInt(key)
      opt.push({ value: isNaN(i) ? key : i, label: this.status[key] })
    })
    return opt
  }
}
