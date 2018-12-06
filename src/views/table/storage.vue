<template>
    <div>
        <!-- <el-row  style="margin-top:10px">
            <el-col :span="3"><div style="height: 40px;text-align: center;line-height: 40px;color: #909399;">选择筛选时间：</div></el-col>
            <el-col :span="10">
                <el-date-picker style="margin-right:10px" v-model="time1" type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                </el-date-picker>
                <el-date-picker v-model="time2" type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                </el-date-picker>
            </el-col>
        <el-col :span='5'>
              <el-button type="primary" @click="filter">确认筛选</el-button>
        </el-col>
        </el-row> -->
        <el-table class="tableBox" ref="selectionTable" :data='tableData' style="width:100%;text-align:center" @selection-change="SelectionChange">
            <el-table-column  type="selection" ></el-table-column>
            <el-table-column align="center" prop='website_name' label='受理机构名称' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='address_sheng' label='省份' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='address_shi' label='地市' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='storage_time' label='保存时间' width='180' :formatter="dateFormat1">
            </el-table-column>
            <el-table-column align="center" prop='phone_type' label='产品型号' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='产品名称' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='imei1' label='IMEI1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='imei2' label='IMEI2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新IMEI1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新IMEI2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='customer_name' label='顾客姓名' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='顾客电话' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='customer_type' label='顾客类型' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='fault_info' label='顾客描述故障' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='check_result' label='检测结果' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='materiel_name' label='处理内容' width='180'>
            </el-table-column>
            <!-- <el-table-column align="center" prop='start_time' label='处理时间' width='180' :formatter="dateFormat2">
            </el-table-column> -->
            <el-table-column align="center" prop='materiel_name' label='更换物料' width='180'>
            </el-table-column>
            <!-- <el-table-column align="center" prop='start_time' label='取机时间' width='180' :formatter="dateFormat3">
            </el-table-column> -->
            <el-table-column align="center" prop='qr_code' label='用料二维码信息' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='act_time' label='激活时间' width='180' :formatter="dateFormat4">
            </el-table-column>
            <el-table-column align="center" prop='operator' label='操作员' width='180'>
            </el-table-column>
            <el-table-column align="center" label='操作' width='100' fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row,scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import moment from 'moment'
export default {
  data() {
    return {
        form:{
        phone_type: '',
      },
      tableData: [],
      tableBox:[],
      dialogFormVisible: false,
      time1: null,
      time2: null,
      type_options: [],//手机类型列表
      curIndex:'',
      downloadLoading:false,
      autoWidth:true,
      codestr: null,
    };
  },
    computed: {
    ...mapGetters([
      'id'
    ]),
  },
  mounted() {
    this.axios.get("/show",{params:{uid:this.id,save_type:0}}).then(response => {this.tableData = response.data;
    this.$refs.selectionTable.toggleAllSelection(this.tableData,true);});
    //手机类型列表
    // this.axios.get("/gettypeoptions").then(response=>{this.type_options = response.data;})
 },
  methods: {
      //选择
    SelectionChange(val) {
        this.tableBox = val
    },
    //搜索
    filter(){
       this.axios.get("/storagesearch", {
        params: {
          time1: this.time1||'',
          time2: this.time2||'',
          uid:this.id,       
        }
      }).then(response => this.tableData = response.data);
    },
    //删除
    handleDelete(index, row,id) {
    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.tableData.splice(index, 1);
            this.axios.get("/del",{
            params: {
                id
            }
        }).then(()=>{this.$message({
            type: 'success',
            message: '删除成功!'
            });})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //编辑
    edit(id){
        // console.log(id)
        this.$router.push({path:'/form/index',query:{id:id}})
    },
    //时间格式化
    dateFormat1: function(row, column){
        var date = row.storage_time;
          if (date === undefined) {
          return "date is undefined";
        }
        return moment(date*1000).format("YYYY-MM-DD HH:mm:ss");
    },
    //激活时间
    dateFormat4: function(row, column){
        var date = row.act_time;
          if (date === undefined) {
          return "date is undefined";
        }
        return moment(date*1000).format("YYYY-MM-DD");
    },
  }
};
</script>
<style scoped>
    .tableBox{
        margin-top: 20px;
        border-top: 1px solid #eee;
    }

    .container_box{
		width: 90%;
		margin:0 auto;
		position: relative;
	}
	.top_title1{
		text-align: center;
	}
	.top_title2{
		margin-right: 12px;
		text-align: right;
	}
	.comment_box{
		width: 100%;
		overflow: hidden;
		font-size: 16px;
		line-height: 35px;
	}
	.comment{
		float: left;
		width: 50%;
	}
	.last_comment_chlid div{
		width: 33%;
		float: left;
		font-size: 18px;
	}
</style>