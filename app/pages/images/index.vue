<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>新着投稿</span>
      </div>
      <div>
        <el-table
          :data="showImages"
          :default-sort="{prop: 'ID', order: 'descending'}"
          height="400"
          style="width: 100%"
          selectable
          @row-click="handleClick">
          <el-table-column
            prop="ID"
            label="ID"
            sortable
            width="80">
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
        // Base64 decode
        return this.$createElement('img', {
          attrs: {
            src: "data:image/png;base64," + row.ImageData
          }
        })
      },
      handleClick(image) {
        console.log("image=", image)
        this.$router.push('/maps/')
      },

    },

  }
</script>
