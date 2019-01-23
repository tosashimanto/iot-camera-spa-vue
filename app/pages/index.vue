<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        iot-camera-spa-vue
      </h1>
      <h2 class="subtitle">
        My exquisite Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
      <div class="text-right">
        <el-button type="primary" @click="handleClickSubmit">Test</el-button>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    async asyncData({store, route}) {

      await store.dispatch('images/getImageList')

    },

    components: {
      Logo,
      // buttonText() {
      //   return this.isCreateMode ? '新規登録' : 'ログイン'
      // },
      // ...mapGetters(['user'])
    },
    methods: {

      // 画像List
      async handleClickSubmit() {

        this.$router.push('/images/')

      }
    },
  }
</script>

<style>

  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
