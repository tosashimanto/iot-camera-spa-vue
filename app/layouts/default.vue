<template>
  <div>
    <TheHeader/>
    <div class="wrapper">
      <nuxt class="container"/>
    </div>
    <hr>
    <footer>
      footer
    </footer>
  </div>
</template>

<script>
  import TheHeader from '~/components/test_header.vue'

  export default {
    components: {
      TheHeader
    }
  }
</script>
