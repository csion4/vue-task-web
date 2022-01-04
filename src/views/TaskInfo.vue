<template>
<div class="taskInfo">
  <div class="taskInfo-left">
    <div class="info">
        <div>{{taskTitle}}</div>
        <el-button type="primary" @click="startJob">发起任务</el-button>
    </div>
    <div class="stages">
      <div>任务编排</div>
      <el-divider content-position="left" />
      <div class="stage" @click="openDawer" v-for="(item, index) in stages" :key="index"><div style="margin:5px 0px 15px 5px">{{item.stageName}}</div><el-divider content-position="left"><i class="el-icon-bottom"/></el-divider></div>
      <div>END</div>
      <el-divider />
    </div>
  </div>

  <div class="task-record">
    <div>执行记录</div>
      <el-divider  content-position="left"></el-divider>
      <div class="record" v-for="(item, index) in records" :key="index">
        <div style="float:left;margin:0px 20px">{{taskCode}}#.{{item.id}} <br />
        <div>
          <el-button type="text" size="small" @click="getLogs(item.id, item.taskStatus)">日志</el-button>
          <el-button type="text" size="small">停止</el-button>
        </div>
        </div>
        <div>
        <el-steps :active="item.lastStage" finish-status="success" :process-status="item.lastStageStatus">
        <el-step v-for="(item1, index) in item.stageResult" :key="index" :title="item1.stageTypeStr" icon="el-icon-loading">
          <!-- vue插槽，貌似可以研究一下https://blog.csdn.net/M612a34/article/details/84572689 -->
          <template slot="description">
            <span v-show="item.lastStageStatus != 'finish'">开始:{{item1.createTime}}<br/>结束:{{item1.updateTime}}</span>
          </template>
        </el-step>
        </el-steps>
        </div>
        <el-divider class="testdivider" content-position="left"/>
      </div>
      <div style="float:right">
        <el-pagination small layout="sizes, prev, pager, next" :current-page="page" :page-size="pageSize" :total="taskReocrdtotal" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :page-sizes="[5, 8, 10]">
      </el-pagination>
      </div>
  </div>

  <el-dialog :visible.sync="showLogs" top="5%" width="80%" :before-close="closeDialog">
    <div id="task-log" class="task-log"><div v-html="logs"></div><i class="el-icon-loading" v-show="this.showLoading"></i><br/><br/><br/><br/><br/></div>
  </el-dialog>

  <el-drawer title="任务节点" :visible.sync="drawer" :direction="direction" :close-on-press-escape="false" :show-close="false" :wrapperClosable="false" size="550px">
  <append-stage v-if="showFirstAdd" @append="addFirst"/>
  <component v-for="(item, index) in fields" :is="item.name" :key="index" :reqData="item.value" :index="index" @addComp="addComp" @del="del(index)" @resetData="resetData"></component>
  <div>
      <el-button @click="cancleDawer">取消</el-button>
      <el-button type="primary" @click="saveStages">保存</el-button>
  </div>
  </el-drawer>
</div>
</template>

<style scoped>
  .taskInfo {
      height: 100%;
  }
  .taskInfo-left {
      float: left;
      width: 19%;
      margin: 5px 5px;
  }
  .info{
    height: 150px;
    background-color: seashell;
  }
  .stages{
    height: 600px;
    background-color: seashell;
    margin: 5px 0px 0px 0px;

  }
  .stage {
    margin: 10px 0px 10px 0px;
  }

  .task-record {
    float: left;
    width: 80%;
    min-height: 350px;
    max-height: 600px;
    /* background-color: seashell; */
    margin: 5px 0px 0px 0px;
  }

  .task-log {
    height: 800px;
    /* float: left; */
    /* width: 55%;
    height: 800px; */
    /* background-color: rgb(10, 10, 10); */
    background-color:whitesmoke;
    /* margin: 5px 0px 0px 5px; */
    /* color:white; */
    font-size: 10px;
    /* white-space: pre-line; */
    white-space: nowrap;
    overflow-X: auto;
    overflow-Y: auto;
  }
  .el-icon-loading{
    font-size: 25px;
  }

  .gitComp {
    height: 20px;
    background-color:whitesmoke;
  }
  .el-divider {
    margin: 0px 0px;
    padding: 0.5px 0px;
  }
</style>

<script>
import { httpGet, httpPost } from '../api/api'
import stage1 from './TaskStage1.vue'
import stage2 from './TaskStage2.vue'
import stage3 from './TaskStage3.vue'
import stage4 from './TaskStage4.vue'
import appendStage from './AppendTaskStage.vue'

export default {
  components: {
    stage1,
    stage2,
    stage3,
    stage4,
    appendStage
  },
  data () {
    return {
      taskId: 0,
      taskCode: '',
      taskTitle: '',
      logs: '',
      showLoading: false,
      stages: '',
      drawer: false,
      direction: 'ltr',
      fields: [],
      showFirstAdd: false,
      saveStagesData: [],
      records: [],
      page: 1,
      pageSize: 8,
      taskReocrdtotal: 0,
      showLogs: false,
      ws: null
    }
  },
  methods: {
    startJob () {
      httpGet('/api/run', '?taskCode=' + this.taskCode).then((res) => {
        this.page = 1
        this.taskRecord(this.taskId)
        // var wb = new WebSocket('ws://127.0.0.1:8899/ws/taskLog?id=' + this.taskId + '&taskCode=' + this.taskCode + '&recordId=' + res.data.recordId) // ws添加代理后，需要使用前端ws://webip:port/ws/...连接；
        // wb.onopen = () => {
        //   console.log('connect')
        // }
        // wb.onmessage = (msg) => {
        //   this.logs += msg.data + '<br>'
        //   var div = document.getElementById('task-log')
        //   div.scrollTop = div.scrollHeight
        // }
        // wb.onclose = () => {
        //   this.showLoading = false
        // }
        // wb.onerror = () => {
        //   this.showLoading = false
        // }
      }
      )
    },
    getStages (taskId) {
      httpGet('/api/taskLayout/layoutInfo', '?taskId=' + taskId).then((res) => {
        this.stages = res.data.data
      })
    },
    openDawer () {
      for (const key in this.stages) {
        if (this.stages[key].stageType === 1) {
          console.log(1111)
          this.fields.push({ name: stage1, value: this.stages[key] })
          console.log(this.fields)
        }
        if (this.stages[key].stageType === 2) {
          console.log(2222)
          this.fields.push({ name: stage2, value: this.stages[key] })
          console.log(this.fields)
        }
        if (this.stages[key].stageType === 3) {
          console.log(3333)
          this.fields.push({ name: stage3, value: this.stages[key] })
          console.log(this.fields)
        }
        if (this.stages[key].stageType === 4) {
          console.log(4444)
          this.fields.push({ name: stage4, value: this.stages[key] })
          console.log(this.fields)
        }
      }
      if (this.fields.length === 0) {
        this.showFirstAdd = true
      }
      this.drawer = true
    },
    addFirst (val) {
      console.log(val)
      this.fields.splice(0, 0, { name: val, value: null })
      this.showFirstAdd = false
    },
    del (index) {
      this.fields.splice(index, 1)
      if (this.fields.length === 0) {
        this.showFirstAdd = true
      }
    },
    addComp (val) {
      console.log('addComp.....')
      console.log(val)
      this.fields.splice(val.index + 1, 0, { name: val.type, value: null })
      console.log(this.fields)
    },
    cancleDawer () {
      this.drawer = false
      this.fields = []
    },
    saveStages () {
      this.saveStagesData = [] // 一开始的时候清空一下数据，防止bug
      for (const key in this.fields) {
        this.saveStagesData.push(this.fields[key].value)
      }
      console.log(JSON.stringify({ taskId: parseInt(this.taskId), stages: this.saveStagesData }))
      httpPost('/api/taskLayout/layoutTask', { taskId: parseInt(this.taskId), stages: this.saveStagesData }).then((res) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.drawer = false
        this.fields = []
      }).then(() => this.getStages(this.taskId))

      this.saveStagesData = [] // 最后清空这个数据，防止bug
    },
    resetData (val) {
      this.fields[val.index].value = val.data
    },
    taskRecord (taskId) {
      httpGet('/api/record', '?taskId=' + taskId + '&page=' + this.page + '&pageSize=' + this.pageSize).then((res) => {
        console.log(this.records[0])
        this.records = res.data.data
        this.taskReocrdtotal = res.data.total
        if (res.data.total > 0 && res.data.data[0].lastStageStatus === 'finish') {
          var wb = new WebSocket('ws://127.0.0.1:8899/ws/taskStage?taskId=' + this.taskId + '&recordId=' + res.data.data[0].id)
          wb.onopen = () => {
            console.log('connect')
          }
          wb.onmessage = (msg) => {
            if (this.page === 1) {
              console.log(msg.data)
              this.records[0].lastStage = Number(msg.data)
              console.log(this.records[0])
            }
          }
          wb.onclose = () => {
            this.taskRecord(taskId)
          }
          wb.onerror = () => {
            this.taskRecord(taskId)
          }
        }
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.taskRecord(this.taskId)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.taskRecord(this.taskId)
    },
    getLogs (recordId, taskStatus) {
      this.logs = ''
      this.showLogs = true
      if (taskStatus === 1) {
        this.showLoading = true
        this.ws = new WebSocket('ws://127.0.0.1:8899/ws/taskLog?id=' + this.taskId + '&taskCode=' + this.taskCode + '&recordId=' + recordId) // ws添加代理后，需要使用前端ws://webip:port/ws/...连接；
        this.ws.onopen = () => {
          console.log('connect')
        }
        this.ws.onmessage = (msg) => {
          this.logs += msg.data + '<br>'
          var div = document.getElementById('task-log')
          div.scrollTop = div.scrollHeight
        }
        this.ws.onclose = () => {
          this.showLoading = false
        }
        this.ws.onerror = () => {
          this.showLoading = false
        }
      } else {
        httpGet('/api/record/taskLog', '?linefeed=<br>&taskCode=' + this.taskCode + '&recordId=' + recordId).then((res) => {
          this.logs = res.data.data
        })
      }
    },
    closeDialog () {
      this.logs = ''
      this.showLogs = false
      this.showLoading = false
      if (this.ws != null) {
        this.ws.close()
        this.ws = null
      }
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

    // 获取任务stage
    this.getStages(this.taskId)
    // 获取执行记录
    this.taskRecord(this.taskId)

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('taskId', this.taskId)
      localStorage.setItem('taskCode', this.taskCode)
      localStorage.setItem('taskTitle', this.taskTitle)
    })
  }
}
</script>
