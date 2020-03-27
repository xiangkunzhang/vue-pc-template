<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in $router.options.routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/assets/style/variables.scss'

  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
      activeMenu () {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo () {
        return true
      },
      variables () {
        return variables
      },
      isCollapse () {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/style/variables.scss';

  #app {

    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: $sideBarWidth;
      position: relative;
    }

    .sidebar-container {
      transition: width 0.28s;
      width: $sideBarWidth !important;
      background-color: $menuBg;
      height: 100%;
      position: fixed;
      font-size: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;

      // reset element-ui css
      .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
      }

      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }

      .el-scrollbar__bar.is-vertical {
        right: 0;
      }

      .el-scrollbar {
        height: 100%;
      }

      &.has-logo {
        .el-scrollbar {
          height: calc(100% - 50px);
        }
      }

      .is-horizontal {
        display: none;
      }

      a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
      }

      .svg-icon {
        margin-right: 16px;
      }

      .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
      }

      // menu hover
      .submenu-title-noDropdown,
      .el-submenu__title {
        &:hover {
          background-color: $menuHover !important;
        }
      }

      .is-active > .el-submenu__title {
        color: $subMenuActiveText !important;
      }

      & .nest-menu .el-submenu > .el-submenu__title,
      & .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
          background-color: $subMenuHover !important;
        }
      }
    }

    .hideSidebar {
      .sidebar-container {
        width: 54px !important;
      }

      .main-container {
        margin-left: 54px;
      }

      .submenu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .el-tooltip {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }
        }
      }

      .el-submenu {
        overflow: hidden;

        & > .el-submenu__title {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }

          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      .el-menu--collapse {
        .el-submenu {
          & > .el-submenu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }

    .el-menu--collapse .el-menu .el-submenu {
      min-width: $sideBarWidth !important;
    }

    // mobile responsive
    .mobile {
      .main-container {
        margin-left: 0;
      }

      .sidebar-container {
        transition: transform .28s;
        width: $sideBarWidth !important;
      }

      &.hideSidebar {
        .sidebar-container {
          pointer-events: none;
          transition-duration: 0.3s;
          transform: translate3d(-$sideBarWidth, 0, 0);
        }
      }
    }

    .withoutAnimation {

      .main-container,
      .sidebar-container {
        transition: none;
      }
    }
  }

  // when menu collapsed
  .el-menu--vertical {
    & > .el-menu {
      .svg-icon {
        margin-right: 16px;
      }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-menu-item {
      &:hover {
        // you can use $subMenuHover
        background-color: $menuHover !important;
      }
    }

    // the scroll bar appears when the subMenu is too long
    > .el-menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
    }
  }

  a, a:focus, a:hover {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  #app .hideSidebar .submenu-title-noDropdown .el-tooltip i {
    margin-left: 20px;
    margin-right: 16px;
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
