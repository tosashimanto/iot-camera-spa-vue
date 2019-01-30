<template>
  <section class="container posts-page">

    <label for="file_photo">
      ＋写真を選択
      <input type="file" id="file_photo" style="display:none;" @change="onFileSelected($event)" accept=".jpg, .jpeg"/>
    </label>

    <div v-if="imageUrl">
      <img :src="imageUrl" class="avatar">
    </div>
    <div class="text-right">
      <el-button type="primary" @click="handleClickFileUpload">upload</el-button>
    </div>
  </section>
</template>

<script>

  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

  export default {
    data() {
      return {
        imageUrl: "",
        uploadInfo: {
          imageFileList: []
        }
      }
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      /**
       * ファイル選択時の処理
       */
      onFileSelected(event) {
        // const loader = this.$loading.show(); // ローディング表示開始

        var file = event.target.files[0]
        this.uploadInfo.imageFileList.push(file)
        console.log("file=", file.name)
        this.imageUrl = URL.createObjectURL(file)
        console.log("this.imageUrl=", this.imageUrl)

        // loader.hide(); // ローディング表示終了
      },
      handleClickFileUpload() {
        console.log("handleClickFileUpload")
        this.uploadImage(this.uploadInfo)

      },
      ...mapActions('file-upload', ['uploadImage'])
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
