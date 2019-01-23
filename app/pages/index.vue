<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <el-container>
        <el-header>
          Header
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-tree :data="tree_data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-container>
            <el-main>
              <el-table
                :data="getTabeldata()"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Name"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Address">
                </el-table-column>
              </el-table>
              <div class="text-right">
                <el-button type="primary" @click="handleClickSubmit">Test</el-button>
              </div>
            </el-main>
          </el-container>
        </el-container>
        <el-footer>
          Footer
        </el-footer>
      </el-container>
    </el-card>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        tree_data: [
          {
            parent_id: '',
            label: 'Level one 1',
            value: '',
            children: [
              {
                parent_id: '',
                label: 'Level two 1-1',
                value: '',
              },
              {
                parent_id: '',
                label: 'Level two 1-2',
                value: '',
              }
            ]
          },
          {
            parent_id: '',
            label: 'Level one 2',
            value: '',
            children: [
              {
                parent_id: '',
                label: 'Level two 2-1',
                value: '',
              },
              {
                parent_id: '',
                label: 'Level two 2-2',
                value: '',
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },


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
      getTabeldata() {
        var t ={
          tableData: [{
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }]
        };
        return t.tableData.map(item => {
          // image.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
          return item
        })
      },
      // 画像List
      async handleClickSubmit() {
        this.$router.push('/images/')
      },

      handleNodeClick(data) {
        console.log(data);
      }
    },
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 90vh;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
