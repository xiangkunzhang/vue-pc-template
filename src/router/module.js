const routersFiles = require.context('./modules', false, /\.js$/)
const routers = routersFiles.keys().reduce((routers, routerPath) => {
  const routerName = routerPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  if (routerName !== 'index') {
    const value = routersFiles(routerPath)
    routers[routerName] = value.default
  }
  return routers
}, {})

const routerList = () => {
  let result = []
  Object.keys(routers).forEach((key) => {
    result = [...result, ...routers[key]]
  })
  return result
}

export default [...routerList()]
