<template>
<div class="TaskStage2" style="background-color: gainsboro; margin: 5px 0px 5px 0px;">
    <span class="TaskStage2Name">{{stageName}}</span> <i @click="del" class="el-icon-close"></i>
    <el-input type="textarea" v-model="form.script" placeholder="执行脚本"></el-input>
    <append-stage @append="append"/>
</div>
</template>

<style scoped>
.TaskStage2 {
    min-height: 100px;
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
      stageName: '脚本执行',
      stageType: 2,
      form: {
        script: this.reqData === null ? '' : this.reqData.envs.script
      }
    }
  },
  watch: {
    reqData: {
      handler (newv, oldV) {
        if (newv !== oldV) {
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
