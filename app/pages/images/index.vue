<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>新着投稿</span>
      </div>
      <div>
        <el-table
          :data="showImages"
          height="250"
          style="width: 100%">
          <el-table-column
            prop="ID"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            label="画像" :formatter="formatter"
            width="180">

          </el-table-column>
          <el-table-column
            prop="ExifLat"
            label="緯度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ExifLon"
            label="経度">
          </el-table-column>
          <el-table-column
            prop="ExifDateTime"
            label="ExifDateTime">
          </el-table-column>
          <el-table-column
            prop="CreatedAt"
            label="CreatedAt">
          </el-table-column>
        </el-table>
      </div>
      <!--<div>-->
      <!--<el-button type="primary" @click="showImages">Test</el-button>-->
      <!--</div>-->
      <el-row>
        <!--<el-button type="primary" @click="showImages2">Test</el-button>-->
        <el-button disabled>Default</el-button>
        <el-button type="primary" disabled>Primary</el-button>
        <el-button type="success" disabled>Success</el-button>
        <el-button type="info" disabled>Info</el-button>
        <el-button type="warning" disabled>Warning</el-button>
        <el-button type="danger" disabled>Danger</el-button>
      </el-row>
    </el-card>
  </section>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {

    async asyncData({store, route}) {

      await store.dispatch('images/getImageList')
    },

    computed: {
      showImages() {

        return this.images.map(image => {
          // image.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
          return image
        })
      },


      ...mapGetters('images', ['images'])
    },
    methods: {
      formatter(row, column) {
        return this.$createElement('img', {
          attrs: {
            src: "data:image/png;base64," + row.ImageData
          }
        })
      },

    },

  }
</script>
