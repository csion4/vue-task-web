<template>
<el-container>
  <el-header>
    <span class="logo">
      <i class="el-icon-s-platform"></i>
    </span>
    <span class="taskCenter" :class="{inClass: taskClass}" @click="change('taskCenter')">
      <span :class="{textinClass: taskClass}">任务中心</span>
    </span>
    <span class="dashBoard" :class="{inClass: dashBoardClass}" @click="change('dashBoard')">
      <span :class="{textinClass: dashBoardClass}">DashBoard</span>
    </span>
    <el-dropdown>
      <span class="user">
        <i class="el-icon-s-custom" />
        {{userName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="logout"><span @click="logout">登出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      taskClass: true,
      dashBoardClass: false,
      userName: ''
    }
  },
  methods: {
    logout () {
      console.log('登出')
      const _this = this
      localStorage.removeItem('Authorization')
      localStorage.removeItem('userName')
      _this.$router.replace('/')
    },
    change (target) {
      if (target === 'taskCenter') {
        this.taskClass = true
        this.dashBoardClass = false
      } else {
        this.taskClass = false
        this.dashBoardClass = true
      }
      const _this = this
      _this.$router.replace('/' + target)
    }
  },
  created () {
    this.userName = localStorage.getItem('userName')
  }
}
</script>

<style>

.el-header {
    background-color:lightgray;
    text-align: right;
    line-height: 60px;
  }
.logo{
    float:left;
}

.inClass {
  border-style:solid;
  border-color: lightgray;
  border-bottom-color: yellow;
}
.textinClass {
  color:yellow;
  font-weight:bold;
}

.taskCenter {
  height: 56px;
  float:left;
  margin-left: 5%;
  cursor: pointer;

}
.dashBoard {
  height: 52px;
  float:left;
  margin-left: 5%;
  cursor: pointer;
}

.el-icon-arrow-down {
    font-size: 12px;
  }
</style>
