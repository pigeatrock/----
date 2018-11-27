<template>
  <div class="dashboard-container">
    <div class="dashboard-top"><h2>欢迎来到美图管理后台</h2></div>
    <div class="dashboard-name">网点名称：广东省天河</div>
    <div class="dashboard-name">网点地址：广东省天河区车陂</div>
    <div class="dashboard-name">网点电话：13232706819</div>
  </div>
</template>

<script>

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