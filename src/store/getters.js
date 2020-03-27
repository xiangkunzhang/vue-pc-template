const getters = {
  sidebar: state => state.system.sidebar,
  size: state => state.system.size,
  device: state => state.system.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  hasRole: (state) => (tags) => {
    // let name = state.name || getLocal('LOGIN_USER_NAME')
    // if (tags) {
      // return tags.includes(name)
    // } else {
      return true
    // }
  }
}

export default getters
