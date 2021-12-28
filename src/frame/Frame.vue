<template>
<div>
  <ait-header></ait-header>
  <div>
  <router-view></router-view>
  </div>
  <ait-footer></ait-footer>
</div>
</template>

<script>
import AitFooter from './Footer'
import AitHeader from './Header'

import { mapState } from 'vuex'

export default {
  name: 'Frame',
  components: {
    AitHeader,
    AitFooter
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      collapsed: 'collapsed'
    })
  }
}
</script>

<style>

</style>
