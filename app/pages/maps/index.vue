<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane label="日本地図">
          <div>
            <svg id="circle-001" :width="width" :height="height"></svg>
            <div>r: {{ r }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="世界地図"><WorldMap /></el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </el-card>
  </section>
</template>

<script>
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import cloneDeep from 'lodash.clonedeep'
  import WorldMap from '~/components/map/WorldMap.vue'
  const d3 = require('d3');
  const topojson = require('topojson')


  export default {

    data() {
      return {
        activeName: 'first',
        width: 1200,
        height: 1000,
        r: 75,
        map: {
          id:"#circle-001",
          width: 1024,
          height: 800,
          r: 75,
          scale : 1600
        }
      }
    },

    components: {
      WorldMap
    },

    mounted() {
      console.log("d3 mounted start")

      this.setJapanJSONMap(this.map)
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      ...mapActions('d3_map', ['createMap', 'setWorldJSONMap','setJapanJSONMap', 'setUSJSONMap']),
      ...mapActions('images', ['getUsJson'])
    }
  };
</script>
