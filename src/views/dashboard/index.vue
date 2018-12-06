<template>
  <div class="dashboard-container" >
    <!-- <div class="dashboard-top"><h2>欢迎来到美图管理后台</h2></div> -->
    <div>
      <el-row style="width:100%;margin:40px 0" type="flex" justify="space-between">
        <el-col :span="7">
          <el-card class="dashboard-name1">
            <div>网点名称：{{website_name}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="dashboard-name2">
            <div>网点地址：{{address}}</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="dashboard-name3">
            <div>网点电话：{{website_phone}}</div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="dashboard-name4">
            <div>操作员：{{name}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-card>
        <div id="myChart" ref="myChart" :style="{width: '90%', height: '300px'}"></div>
      </el-card>
    </el-row>
    <el-row style="width:100%;margin:40px 0" type="flex" justify="space-between">
      <el-col :span="15">
        <el-card>
          <div id="myhistogram" ref="myhistogram" :style="{ height: '300px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="myRadar" ref="myRadar" :style="{ height: '300px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
var colors = ['#36a3f7', '#d14a61'];
//引入基本模板
let echarts = require('echarts/lib/echarts')
 
// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
// require('echarts/lib/chart/radar')
require('echarts/lib/chart/pie')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动


export default {
  mounted(){
    //获取pie数据
    this.axios.get("getpie",{params:{
      uid:this.id
    }}).then(response=>{
      this.pie_value1 = response.data.pie_value1
      this.pie_value2 = response.data.pie_value2
      this.bingzhuang()
    })
    //获取折线和柱状图数据
    this.axios.get("getchart",{params:{
      uid:this.id,
    }}).then(response=>{
      this.chart_days = response.data.chart_days
      this.storage_data = response.data.storage_data
      this.submit_data = response.data.submit_data
      this.zhuzhuang()
      this.initCharts()
    })

  },
   computed: {
    ...mapGetters([
      'website_name',
      'address',
      'website_phone',
      'name',
      'id'
    ]),
  },
 data(){
    return{
      //饼状图数据
      pie_value1:undefined,
      pie_value2:undefined,
      //折线图//柱状图数据
      chart_days:[],
      storage_data:[],
      submit_data:[]

    }
  },
  methods:{
    //饼状图
    bingzhuang(){
      this.chart = echarts.init(this.$refs.myRadar);
      this.setBingzhuang();
    },
    setBingzhuang(){
      this.chart.setOption({
            // backgroundColor: '#fff',

        title: {
            text: '暂存提交比',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#909399'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        // visualMap: {
        //     show: false,
        //     min: 80,
        //     max: 600,
        //     inRange: {
        //         colorLightness: [0, 1]
        //     }
        // },
          series : [
          {
              name:'美图手机',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[
                  {value:this.pie_value1, name:'暂存',itemStyle:{color: '#36a3f7'}},
                  {value:this.pie_value2, name:'提交',itemStyle:{color: '#d14a61'}},
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  normal: {
                      // textStyle: {
                      //     color: 'rgba(255, 255, 255, 0.3)'
                      // }
                  }
              },
              labelLine: {
                  normal: {
                      // lineStyle: {
                      //     color: 'rgba(255, 255, 255, 0.3)'
                      // },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                  }
              },
              itemStyle: {
                  normal: {
                      color:'red',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0)'
                  }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
        ]
      })
    },
    
    //柱状图
     zhuzhuang() {
      this.chart = echarts.init(this.$refs.myhistogram);
      this.setZhuzhuang();
    },
    setZhuzhuang(){
      color: colors,
      this.chart.setOption({
        title: {
          text: '维修单数',
          textStyle: {
                color: '#909399'
            }
        },
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data:['暂存单数', '提交单数']
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: false
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                  color: colors[1]
              }
            },
           axisLabel:{
						     interval:0,//横轴信息全部显示
						},
            // data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"]
            data:this.chart_days
          },
          {
            type: 'category',
            axisTick: {
                alignWithLabel: false
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
           axisLabel:{
						     interval:0,//横轴信息全部显示						   
						},
            // data:["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"]
            data:this.chart_days
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '暂存单数',
            type: 'bar',
            // data: [5, 20, 36, 10, 10, 20,100],
            data:this.storage_data,
             itemStyle:{
              color:colors[1]
            }
          },
          {
            name: '提交单数',
            type: 'bar',
            // data: [79, 50, 30, 10, 60, 70,30],
            data: this.submit_data,
             itemStyle:{
              color:colors[0]
            }
          }
        ]
      })
    },

    //折线图
    initCharts() {
      this.chart = echarts.init(this.$refs.myChart);
      this.setOptions();
    },
    setOptions() {
      color: colors,
      this.chart.setOption({
        title: {
          text: '美图手机维修单数',
        textStyle: {
          color: '#909399'
        }
        },
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data:['暂存单数', '提交单数']
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                  color: colors[1]
              }
            },
            axisPointer: {
              label: {
                  formatter: function (params) {
                    
                      return '单数  ' + params.value
                          + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
              }
            },
            data: this.chart_days
          },
          {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                     console.log(params)
                        return '单数  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data:this.chart_days
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '暂存单数',
            type: 'line',
            xAxisIndex: 1,
            data: this.storage_data,
            smooth: true,
            itemStyle:{
              color:colors[1]
            }
          },
          {
            name: '提交单数',
            type: 'line',
            data: this.submit_data,
            smooth: true,
            itemStyle:{
              color:colors[0]
            }
          }
        ]
      })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  // position: relative;
  &-top{
    font-size: 20px;
    text-align: center;
  }
  &-name1::before {
   content: '';
   position: absolute;
   height: 100%;
   width: 5px;
   background: #40c9c6;
  }
  &-name2::before {
   content: '';
   position: absolute;
   height: 100%;
   width: 5px;
   background: #36a3f7;
  }
  &-name3::before {
   content: '';
   position: absolute;
   height: 100%;
   width: 5px;
   background: #f4516c;
  }
  &-name4::before {
   content: '';
   position: absolute;
   height: 100%;
   width: 5px;
   background: #666;
  }
}
</style>