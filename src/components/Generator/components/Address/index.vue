<template>
  <el-cascader :props="props" v-model="innerValue" :options="options" v-bind="$attrs"
    v-on="$listeners" class="address-cascader" />
</template>

<script>
import { getProvinceSelector } from '@/api/system/province'
export default {
  name: 'JNPF-Address',
  props: ["value", "level", "multiple"],
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    let that = this;
    return {
      options: [],
      props: {
        lazy: true,
        value: 'value',
        label: 'label',
        children: 'children',
        leaf: 'leaf',
        multiple: that.multiple,
        lazyLoad(node, resolve) {
          const { data, level } = node;
          let id = level === 0 ? -1 : data.value
          getProvinceSelector(id).then(res => {
            const list = res.data.list.map((value, i) => ({
              value: value.id,
              label: value.fullName,
              leaf: level >= that.level ? true : value.isLeaf
            }));
            resolve(list);
          })
        }
      },
      innerValue: this.value
    }
  },
  methods: {},
  created() { },
  watch: {
    value(val) {
      this.innerValue = val
    }
  }
}
</script>
<style lang="scss" scoped>
.address-cascader {
  width: 100%;
}
</style>