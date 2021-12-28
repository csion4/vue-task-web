<template>
<footer class="main-footer">
    <div> CSION 版权所有 © 2021</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .main-footer {
    position: fixed;
    bottom: 0;
    height: 30px;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    text-align: center;
    color: #444;
    width: calc(100vw - 180px);

  }

</style>
