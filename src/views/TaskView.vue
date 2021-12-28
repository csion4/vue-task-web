<template>
<div id="tasks" >
  <el-button @click="getTasks">刷新任务</el-button>
  <el-button @click="dialogVisible = true">添加任务</el-button>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="主键"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="330">
    </el-table-column>
    <el-table-column
      prop="taskCode"
      label="任务编号"
      width="330">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="createUser"
      label="创建人">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="delTask(scope.row.id)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="dialogVisible = true;
        departForm.id=scope.row.id,departForm.title=scope.row.title,departForm.taskCode=scope.row.taskCode">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :visible.sync="dialogVisible" width="400px" higth="100px">
    <el-form :rules="departRules" :model="departForm" ref="departForm" label-width="80px">
    <el-form-item label="id" prop="id" hidden=true>
     <el-input v-model="departForm.id" hidden=true></el-input>
     </el-form-item>
    <el-form-item label="标题" prop="title">
    <el-input v-model="departForm.title" placeholder="请输入任务标题" ></el-input>
    </el-form-item>
    <el-form-item label="任务编号" prop="taskCode" >
    <el-input v-model="departForm.taskCode" placeholder="请输入任务标题编号">
    </el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="dialogVisible=false;addTask(departForm)">确定</el-button>
    </span>
  </el-dialog>
  <div class="block" >
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
</div>
</template>

<style>
</style>

<script>
import { httpGet, httpDelete, httpPost } from '../api/api'
// import { Loading } from 'element-ui'

export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      departForm: {
        id: null,
        title: '',
        taskCode: ''
      },
      departRules: {
        department: [
          { required: true, max: 60, message: '请输入任务标题', trigger: 'blur' },
          { required: true, min: 3, max: 30, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getTasks () {
    //  startLoading()
      httpGet('/api/task', '').then(res => {
        this.tableData = res.data.data
      })
      // .then(() => endLoading())
    },
    delTask (n) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => (
        // startLoading(),
        httpDelete('/api/task', '?taskId=' + n)).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).then(() => this.getTasks())
      )
    },
    addTask (departForm) {
      (httpPost('/api/task', departForm).then((res) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).then(() => {
        this.getTasks()
        departForm.id = 0
        departForm.title = ''
        departForm.taskCode = ''
      })).catch(() => {
        departForm.id = 0
        departForm.title = ''
        departForm.taskCode = ''
      })
    }
  },
  created () {
    this.getTasks()
  }
}
// let loading
// function startLoading () {
//   loading = Loading.service({
//     lock: true
//   })
// }
// function endLoading () {
//   loading.close()
// }
</script>
