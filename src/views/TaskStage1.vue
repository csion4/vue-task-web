<template>
<div class="TaskStage1" style="background-color: gainsboro; margin: 5px 0px 5px 0px;">
    <span class="TaskStage1Name">{{stageName}}</span> <i @click="del" class="el-icon-close"></i>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form :inline="true" size="mini">
      <el-form-item label="giturl:" prop="giturl"><el-input v-model="form.gitUrl" style="width:275px" placeholder="gitUrl地址"></el-input></el-form-item>
      <el-form-item label="branch:" prop="branch" ><el-input v-model="form.branch" style="width:80px" placeholder="分支"></el-input></el-form-item>
      </el-form>
      <el-form :inline="true"  size="mini">
      <el-form-item label="验证:">
      <el-select v-model="form.authType" placeholder="验证方式" style="width:80px" @change="selectOne">
      <el-option v-for="item in authTypeArr" :key="item.k" :label="item.v" :value="item.k"></el-option>
      </el-select>
      <el-form-item label="gitUser:" prop="gitUser" v-if="showUser"><el-input v-model="form.gitUser" style="width:100px" placeholder="gitUser"></el-input></el-form-item>
      <el-form-item label="gitPasswd:" prop="gitPasswd" v-if="showUser"><el-input show-password v-model="form.gitPasswd" style="width:100px" placeholder="gitPasswd"></el-input></el-form-item>
      <el-form-item label="token:" prop="token" v-if="showToken"><el-input type="textarea" v-model="form.token" style="width:300px" placeholder="token"></el-input></el-form-item>
      </el-form-item>
      </el-form>
    </el-form>
    <append-stage @append="append"/>
</div>
</template>

<style scoped>
.el-icon-close{
  float:right;
}
.TaskStage1{
  min-height: 150px;
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
      authTypeArr: [{ k: '1', v: 'ssh-key' }, { k: '2', v: 'User' }, { k: '3', v: 'Token' }],
      stageName: '更新Git仓库代码',
      stageType: 1,
      form: {
        gitUrl: this.reqData === null ? '' : this.reqData.envs.gitUrl,
        authType: this.reqData === null ? '' : this.reqData.envs.authType,
        gitUser: this.reqData === null ? '' : this.reqData.envs.gitUser,
        gitPasswd: this.reqData === null ? '' : this.reqData.envs.gitPasswd,
        branch: this.reqData === null ? '' : this.reqData.envs.branch,
        token: this.reqData === null ? '' : this.reqData.envs.token
      },
      showUser: this.reqData === null ? false : this.reqData.envs.authType === '2',
      showToken: this.reqData === null ? false : this.reqData.envs.authType === '3'
    }
  },
  watch: {
    reqData: {
      handler (newv, oldV) {
        if (newv !== oldV) {
          this.stageName = (newv === null ? '' : newv.stageName)
          this.stageType = (newv === null ? '' : newv.stageType)
          this.form.gitUrl = (newv === null ? '' : newv.envs.gitUrl)
          this.form.authType = (newv === null ? '' : newv.envs.authType)
          this.form.gitUser = (newv === null ? '' : newv.envs.gitUser)
          this.form.gitPasswd = (newv === null ? '' : newv.envs.gitPasswd)
          this.form.branch = (newv === null ? '' : newv.envs.branch)
          this.form.token = (newv === null ? '' : newv.envs.token)
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
    },
    selectOne (sel) {
      console.log(sel)
      this.showUser = false
      this.showToken = false
      if (sel === '2') {
        this.showUser = true
      }
      if (sel === '3') {
        this.showToken = true
      }
    }
  }
}
</script>
