<template>
<div class="taskInfo">
  <div class="taskInfo-left">
    <div class="info">
        <div>{{taskTitle}}</div>
        <el-button type="primary" @click="startJob">发起任务</el-button>
    </div>
    <div class="stages"><div>任务编排</div></div>
  </div>
  <div class="task-record"> 执行记录 </div>
  <div id="task-log" class="task-log"><div v-html="logs"></div><i class="el-icon-loading" v-show="this.showLoading"></i><br/><br/><br/><br/><br/></div>
</div>
</template>

<style>
  .taskInfo {
      height: 100%;
  }
  .taskInfo-left {
      float: left;
      width: 20%;
      margin: 5px 5px;
  }
  .info{
    height: 150px;
    background-color: seashell;
  }
  .stages{
    height: 150px;
    background-color: seashell;
    margin: 5px 0px 0px 0px;
  }

  .task-record {
    float: left;
    width: 20%;
    min-height: 350px;
    max-height: 600px;
    background-color: seashell;
    margin: 5px 0px 0px 0px;
  }

  .task-log {
    float: left;
    width: 55%;
    height: 800px;
    /* background-color: rgb(10, 10, 10); */
    background-color:whitesmoke;
    margin: 5px 0px 0px 5px;
    /* color:white; */
    font-size: 10px;
    white-space: nowrap;
    overflow-X: auto;
    overflow-Y: auto;
  }
  .el-icon-loading{
    font-size: 25px;
  }
</style>

<script>
import { httpGet } from '../api/api'

export default {
  data () {
    return {
      taskId: 0,
      taskCode: '',
      taskTitle: '',
      logs: '',
      showLoading: false
    }
  },
  methods: {
    startJob () {
      httpGet('/api/run', '?taskCode=' + this.taskCode).then((res) => {
        this.showLoading = true
        this.logs = ''
        var wb = new WebSocket('ws://127.0.0.1:9044/taskLog?id=' + this.taskId + '&taskCode=' + this.taskCode + '&recordId=' + res.data.recordId)
        wb.onopen = () => {
          console.log('connect')
        }
        wb.onmessage = (msg) => {
          this.logs += msg.data + '<br>'
          var div = document.getElementById('task-log')
          div.scrollTop = div.scrollHeight
        }
        wb.onclose = () => {
          this.showLoading = false
        }
        wb.onerror = () => {
          this.showLoading = false
        }
      }
      )
    }
  },
  created () {
    this.taskId = this.$route.params.taskId
    this.taskCode = this.$route.params.taskCode
    this.taskTitle = this.$route.params.taskTitle
    if (this.taskId === undefined) {
      this.taskId = localStorage.getItem('taskId')
      this.taskCode = localStorage.getItem('taskCode')
      this.taskTitle = localStorage.getItem('taskTitle')
    }
    console.log(this.taskId)
    console.log(this.taskCode)
    console.log(this.taskTitle)

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('taskId', this.taskId)
      localStorage.setItem('taskCode', this.taskCode)
      localStorage.setItem('taskTitle', this.taskTitle)
    })
  }
}
</script>
