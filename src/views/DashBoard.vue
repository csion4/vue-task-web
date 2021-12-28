<template>
<div class="11">
<button @click="websocketTest">测试</button>
<div class="t22" v-html="data"></div>
<i class="el-icon-loading" v-show="this.showLoading"></i>
</div>
</template>

<style >
  .t22{
      white-space: pre-line;
  }
</style>

<script>
export default {

  data () {
    return {
      data: '',
      showLoading: false
    }
  },
  methods: {
    websocketTest () {
      var wb = new WebSocket('ws://127.0.0.1:9044/ws?id=1111111111111111111111111')
      wb.onopen = () => {
        console.log('connect')
        this.showLoading = true
      }
      wb.onmessage = (msg) => {
        console.log(msg)
        console.log(msg.data)
        this.data += msg.data
      }
      wb.onclose = () => {
        this.showLoading = false
      }
      wb.onerror = () => {
        this.showLoading = false
      }
    }
  }
}

</script>
