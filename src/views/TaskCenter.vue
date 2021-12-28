<template>
<div class="taskCenterPage">
<div class="taskList" :style="{height: taskListWight, 'line-height': taskListWight}">任务列表</div>
<div class="task" @click="showAddTask = true">新增任务</div>
<div class="task" v-for="(item, index) in taskData" :key="index"  @click="$router.replace({name: 'TaskInfo', params: {taskId: item.id, taskCode: item.taskCode, taskTitle: item.title}})">{{item.title}}</div>
<div class="task" @click="getTasks(1)">更多</div>

<el-dialog :visible.sync="showAddTask" width="400px" higth="100px">
  <el-form :model="addTaskForm" :rules="rules" ref="addTaskForm" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input  v-model="addTaskForm.title" placeholder="请输入任务标题" ></el-input>
    </el-form-item>
    <el-form-item label="任务编号" prop="taskCode" >
      <el-input v-model="addTaskForm.taskCode" placeholder="请输入任务编号">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="showAddTask = false">取消</el-button>
      <el-button type="primary" @click="addTask('addTaskForm', 0, addTaskForm)">确定</el-button>
      <el-button type="primary" @click="addTask('addTaskForm', 1, addTaskForm)">任务详情</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</div>
</template>

<style>
.taskList {
  float: left;
  width: 200px;
  background-color: seashell;
  margin: 5px 5px;
  text-align:center;
  overflow: hidden;
}
.task {
  float: left;
  width: 20%;
  height: 150px;
  background-color: seashell;
  margin: 5px 5px;
  line-height: 150px;
  text-align:center;
  overflow: hidden;
  cursor: pointer;
}

</style>

<script>
import { httpGet, httpPost } from '../api/api'

export default {
  data () {
    var validateTaskCode = (rule, value, callback) => {
      const reg = /^[_a-zA-Z0-9]+$/
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('仅由英文字母，数字以及下划线组成'))
        } else {
          callback()
        }
      }
    }
    return {
      taskData: [],
      taskListWight: '',
      page: 1,
      pageSize: 6,

      rules: {
        title: [
          { required: true, message: '请输入任务标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        taskCode: [
          { required: true, message: '请输入任务编号', trigger: 'blur' },
          { validator: validateTaskCode, trigger: 'blur' }
        ]
      },
      showAddTask: false,
      addTaskForm: {
        title: '',
        taskCode: ''
      }
    }
  },
  methods: {
    getTasks (flag) {
      httpGet('/api/task', '?page=' + this.page + '&pageSize=' + this.pageSize).then(res => {
        this.taskData = this.taskData.concat(res.data.data)
        this.taskListWight = ((Math.ceil((this.taskData.length + 2) / 4)) * 160) + 'px'
        if (res.data.data.length === 0 && flag) {
          this.$message({
            type: 'info',
            message: '没有更多了'
          })
        } else {
          this.page++
        }
      })
    },
    addTask (valid, ok, addTaskForm) {
      this.$refs[valid].validate((valid) => { // 确定按钮时校验表单validate，需要保证传参时需要单引号包裹，this.$refs对应的也就是ref="addTaskForm"
        if (valid) {
          var id
          (httpPost('/api/task', addTaskForm).then((res) => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            id = res.data.data.id
          }).then(() => {
            this.page = 1
            this.taskData = []
            this.getTasks()
            this.showAddTask = false
            if (ok) {
              this.$router.replace({ name: 'TaskInfo', params: { taskId: id, taskCode: addTaskForm.taskCode, taskTitle: addTaskForm.title } })
            }
            addTaskForm.title = ''
            addTaskForm.taskCode = ''
          })).catch(() => {
            addTaskForm.title = ''
            addTaskForm.taskCode = ''
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.getTasks(0)
  }
}
</script>
