<template>
<div class="TaskStage4" style="background-color: gainsboro; margin: 5px 0px 5px 0px;">
    <span class="TaskStage4Name">{{stageName}}</span> <i @click="del" class="el-icon-close"></i>
    <el-form size="mini">
      <el-form-item label="ip:" prop="ip"><el-input v-model="form.ip" style="width:280px" placeholder="ip"></el-input></el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
      <el-form-item label="userName:" prop="userName"><el-input v-model="form.userName" style="width:100px" placeholder="userName"></el-input></el-form-item>
      <el-form-item label="password:" prop="password"><el-input v-model="form.password" style="width:100px" placeholder="password"></el-input></el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
      <el-form-item label="source:" prop="source"><el-input v-model="form.source" style="width:100px" placeholder="source"></el-input></el-form-item>
      <el-form-item label="target:" prop="target"><el-input v-model="form.target" style="width:100px" placeholder="target"></el-input></el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
      <el-form-item label="script:" prop="script"><el-input type="textarea" v-model="form.script" placeholder="script"></el-input></el-form-item>
    </el-form>
    <append-stage @append="append"/>
</div>
</template>

<style scoped>
.TaskStage3 {
    min-height: 140px;
}
.el-icon-close{
  float:right;
}
</style>

<script>
import appendStage from './AppendTaskStage.vue'

export default {
  components: {
    appendStage
  },
  props: ['index', 'reqData'],
  data () {
    return {
      stageName: '远程ssh访问',
      stageType: 4,
      form: {
        ip: this.reqData === null ? '' : this.reqData.envs.ip,
        userName: this.reqData === null ? '' : this.reqData.envs.userName,
        password: this.reqData === null ? '' : this.reqData.envs.password,
        source: this.reqData === null ? '' : this.reqData.envs.source,
        target: this.reqData === null ? '' : this.reqData.envs.target,
        script: this.reqData === null ? '' : this.reqData.envs.script
      }
    }
  },
  watch: {
    reqData: {
      handler (newv, oldV) {
        if (newv !== oldV) {
          this.form.ip = (newv === null ? '' : newv.envs.ip)
          this.form.userName = (newv === null ? '' : newv.envs.userName)
          this.form.password = (newv === null ? '' : newv.envs.password)
          this.form.source = (newv === null ? '' : newv.envs.source)
          this.form.target = (newv === null ? '' : newv.envs.target)
          this.form.script = (newv === null ? '' : newv.envs.script)
        }
      },
      deep: true
    },
    form: {
      handler (newv, oldV) {
        this.$emit('resetData', { index: this.index, data: { stageType: this.stageType, envs: this.form } })
      },
      deep: true
    }
  },
  methods: {
    del () {
      this.$emit('del', '')
    },
    append (type) {
      this.$emit('addComp', { index: this.index, type: type })
    }
  }
}
</script>
