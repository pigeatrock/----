<template>
  <div class="dashboard-container">
    <div class="dashboard-top"><h2>欢迎来到美图管理后台</h2></div>
    <div class="dashboard-name">网点名称：{{website_name}}</div>
    <div class="dashboard-name">网点地址：{{address}}</div>
    <div class="dashboard-name">网点电话：{{website_phone}}</div>
    <div class="dashboard-name">操作员：{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{

    }
  },
   computed: {
    ...mapGetters([
      'website_name',
      'address',
      'website_phone',
      'name'
    ]),
  },

  methods:{

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-top{
    font-size: 20px;
    text-align: center;
  }
  &-name {
    padding-left:30px;
    cursor: pointer;
    font-size: 25px;
    line-height: 50px;
  }
  &-name:hover{
    background-color:#F8F8F8;
  }
}
</style>