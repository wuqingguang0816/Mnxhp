<template>
  <el-dialog title="分页使用说明" :close-on-click-modal="false" :visible.sync="visible"
    :append-to-body="true" class="JNPF-dialog JNPF-dialog_center page-explain-box" lock-scroll
    width="600px">
    <div style="height:400px">分页使用说明待完善</div>
  </el-dialog>
</template>
<script>

export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    init(id) {
      this.visible = true
    }
  }
}
</script>