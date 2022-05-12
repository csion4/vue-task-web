<template>
<div class="dashboard">
<div class="left-node">
  <div class="left-node-title">Work Node List</div>
  <el-button type="primary" @click="startJob">添加</el-button>
  <el-input placeholder="Search..." v-model="nodeSearch"></el-input>
  <div class="left-node-data">
    <el-table :data="nodes.filter(data => !nodeSearch || data.node.toLowerCase().includes(nodeSearch.toLowerCase()))" stripe >
     <el-table-column prop="node">
     </el-table-column>
    </el-table>
    <!-- <div class="stage" @click="openDawer" v-for="(item, index) in nodes" :key="index"><div style="margin:5px 0px 15px 5px">{{item.node}}</div><el-divider></el-divider></div> -->
  </div>
</div>

<div class="task-record">
    <el-table :data="tasks" stripe>
     <el-table-column prop="task" label="执行任务"></el-table-column>
    </el-table>
</div>
</div>
</template>

<style >
.left-node {
  float: left;
  width: 20%;
  height: 500px;
  background-color:gainsboro;
  margin: 5px 5px;
  padding: 10px 10px;
}

.left-node-title {
  float: left;
  margin: 10px 0px;
}
.el-button {
  float: right;
}
.left-node-data {
  height: 80%;
  background-color:rgb(255, 255, 255);
  margin: 10px 0px;
  overflow-y:auto;  /*添加滚动条 */
}
.el-input {
  padding: 5px 0px 0px 0px;
}
.task-record {
  float: right;
  width: 75%;
}
</style>

<script>
export default {

  data () {
    return {
      nodes: [
        { node: '123' },
        { node: '1232' },
        { node: '123' },
        { node: '1232' },
        { node: '123' },
        { node: '1232' }

      ],
      tasks: [
        { task: '11' }
      ],
      nodeSearch: ''
    }
  },
  methods: {
  }
}

</script>
