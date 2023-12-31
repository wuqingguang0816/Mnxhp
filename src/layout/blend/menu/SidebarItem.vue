<template>
  <div>
    <el-submenu ref="subMenu" :index="item.path" popper-append-to-body
      v-if="item.newChildren && item.newChildren.length"
      :popper-class="`${slideClass} ${themeClass} ${layoutType}`" @click="handleClick(item)">
      <template slot="title">
        <item :icon="item.icon" :title="generateTitle(item.vueName,item.fullName)" />
      </template>
      <sidebar-item v-for="child in item.newChildren" :key="child.id" :is-nest="true" :item="child"
        :base-path="child.path" class="nest-menu" />
    </el-submenu>
    <template v-else>
      <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}"
        @click="handleClick(item)">
        <item :icon="item.icon" :title="generateTitle(item.vueName,item.fullName)" />
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      slideClass: state => state.settings.slideClass,
      themeClass: state => state.settings.themeClass,
      layoutType: state => state.settings.layoutType
    }),
  },
  data() {
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    handleClick(item) {
      if (item.type === 1) {
        this.$store.commit('user/SET_LEFTMENULIST', item.children || [])
      } else if (item.type === 6 || (item.type === 7 && item.linkTarget === "_blank")) {
        window.open(item.path)
      } else {
        this.$router.push(item.path)
      }
      this.$emit('setActiveName', item)
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        // return false
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    generateTitle
  }
}
</script>
