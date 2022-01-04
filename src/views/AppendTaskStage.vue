<template>
    <el-dropdown>
      <span class="user">
        <i class="el-icon-plus"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item ><span @click="addGitStage">更新Git仓库代码</span></el-dropdown-item>
        <el-dropdown-item ><span @click="addScriptStage">脚本执行</span></el-dropdown-item>
        <el-dropdown-item ><span @click="addHttpStage">Http/Https服务调用</span></el-dropdown-item>
        <el-dropdown-item ><span @click="addSshStage">远程ssh访问</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<style scoped>
.el-dropdown{
    float: left;
    left: 30px;
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    addGitStage () {
      console.log(1111)
      this.$emit('append', 'stage1')
    },
    addScriptStage () {
      this.$emit('append', 'stage2')
    },
    addHttpStage () {
      this.$emit('append', 'stage3')
    },
    addSshStage () {
      this.$emit('append', 'stage4')
    }
  }
}
</script>
