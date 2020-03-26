<template>
  <div :class="classObj" class="app-wrapper">
    <!--mobile 时 打开侧边栏 遮罩-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <!--侧边导航-->
    <sidebar class="sidebar-container"/>
    <div class="main-container hasTagsView">
      <!--头部-->
      <div class="fixed-header">
        <!--头部导航-->
        <nav-bar/>
        <!--标签-->
        <tags-view/>
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import ResizeMixin from './mixin/ResizeHandler'
  import { AppMain, NavBar, Sidebar, TagsView } from './components'
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',
    mixins: [ResizeMixin],
    components: {
      AppMain,
      NavBar,
      Sidebar,
      TagsView
    },
    computed: {
      ...mapState({
        sidebar: state => state.system.sidebar,
        device: state => state.system.device
      }),
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside () {
        this.$store.dispatch('system/closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/mixin.scss";
  @import "~@/assets/style/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
