<template>
<div class="TaskStage3" style="background-color: gainsboro; margin: 5px 0px 5px 0px;">
    <span class="TaskStage3Name">{{stageName}}</span> <i @click="del" class="el-icon-close"></i>
    <el-form size="mini">
      <el-form-item label="url:" prop="url"><el-input v-model="form.url" style="width:280px" placeholder="url"></el-input></el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
      <el-form-item label="请求方式:">
      <el-select v-model="form.type" placeholder="请求方式" style="width:80px">
      <el-option v-for="item in requestType" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="param:" prop="param" ><el-input v-model="form.param" style="width:200px" type="textarea" placeholder="请求参数（非必填）"></el-input></el-form-item>
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
      requestType: ['get', 'post'],
      stageName: 'Http/Https服务调用',
      stageType: 3,
      form: {
        url: this.reqData === null ? '' : this.reqData.envs.url,
        type: this.reqData === null ? '' : this.reqData.envs.type,
        param: this.reqData === null ? '' : this.reqData.envs.param
      }
    }
  },
  watch: {
    reqData: {
      handler (newv, oldV) {
        if (newv !== oldV) {
          this.form.url = (newv === null ? '' : newv.envs.url)
          this.form.type = (newv === null ? '' : newv.envs.type)
          this.form.param = (newv === null ? '' : newv.envs.param)
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
