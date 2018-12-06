<template>
    <div>
        <el-row  style="margin-top:10px">
            <el-col :span="3"><div style="height: 40px;text-align: center;line-height: 40px;color: #909399;">导出筛选：</div></el-col>
            <el-col :span="10">
                <el-date-picker style="margin-right:10px" v-model="time1" type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
                <el-date-picker v-model="time2" type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-form ref="form" :model="form">
                <el-form-item label="">
                  <el-select v-model="form.phone_type" clearable placeholder="手机型号">
                    <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
        </el-col>
        <el-col :span='5'>
              <el-button type="primary" @click="filter">确认筛选</el-button>
              <el-button :loading="downloadLoading" type="success"  icon="el-icon-upload2" @click="exportExcel">导出Excel</el-button>
        </el-col>
        </el-row>
        <el-table class="tableBox" ref="selectionTable" :data='tableData' style="width:100%;text-align:center" @selection-change="SelectionChange">
            <el-table-column  type="selection" ></el-table-column>
            <el-table-column align="center" prop='service_number' label='工单号' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='customer_name' label='客户姓名' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='customer_type' label='客户类型' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='service_type' label='服务类型' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='fault_info' label='故障描述' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='手机型号' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone_color' label='手机颜色' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='star_time' label='受理时间' width='180' :formatter="dateFormat1">
            </el-table-column>
            <el-table-column align="center" prop='imei1' label='imei1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='imei2' label='imei2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='repair_result' label='维修结果' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='check_result' label='检测结果' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='actual_fault' label='实际故障' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='fault_express' label='故障代码' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='materiel_name' label='更换物料' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat2">
            </el-table-column>
            <el-table-column align="center" prop='website_name' label='网点' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='operator' label='操作员' width='180'>
            </el-table-column>
            <el-table-column align="center" label='操作' width='125' fixed="right">
                <template slot-scope="scope">
                    <router-link target="_blank" :to="'/print/'+scope.row.id" style="font-size:12px;color:#409EFF;display:inline-block;font-weight:bold;font-family: sans-serif;">打印</router-link>
                    <!-- <el-button @click="print(scope.row.id)" type="text" size="small" v-print="'#print_page'">打印</el-button> -->
                    <!-- <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">{{scope.row.changeWord}}</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button> -->
                    <el-button @click="file_manage(scope.$index, scope.row,scope.row.id)" type="text" size="small">附件</el-button>
                    <el-button style="margin-left:0" @click="handleDelete(scope.$index, scope.row,scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title='附件管理' :visible.sync="file_visible" width="50%" >
          <el-card >
            <a :href="file.url" v-for="file in file_list" :download="file.name" class="file_gar">
              <img :src="file.url" class="img">
              <span>{{file.name}}</span>
            </a>
          </el-card>
          
          <div slot="footer" class="dialog-footer">
            <el-button @click="file_visible = false">取消</el-button>
            <el-button type="primary" @click="file_visible = false">下载全部</el-button>
          </div>
        </el-dialog>

        <el-table v-show="false" id="out-table" class="tableBox" :data='tableBox' style="width:100%;text-align:center" >
            <el-table-column align="center" prop='website_name' label='受理机构名称' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='website_name' label='省份' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='website_name' label='地市' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='service_number' label='单号' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='star_time' label='受理时间' width='180' :formatter="dateFormat1">
            </el-table-column>
            <el-table-column align="center" prop='phone_type' label='产品型号' width='180' :formatter="dateFormat1">
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='产品名称' width='180' :formatter="dateFormat1">
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
            <el-table-column align="center" prop='check_result' label='处理内容' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='start_time' label='处理时间' width='180' :formatter="dateFormat2">
            </el-table-column>
            <el-table-column align="center" prop='materiel_name' label='更换物料' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='materiel_name' label='取机时间' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='qr_code' label='用料二维码信息' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='qr_code' label='激活时间' width='180'>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import moment from 'moment'
export default {
  data() {
    return {
        form:{
        phone_type: '',
      },
      file_list: [],
      tableData: [],
      tableBox:[],
      dialogFormVisible: false,
      file_visible: false,
      time1: null,
      time2: null,
      type_options: [],//手机类型列表
      curIndex:'',
      downloadLoading:false,
      autoWidth:true,
      bookType: 'xlsx',
      excelName: '美图工单',
      codestr: null,
    };
  },
    computed: {
    ...mapGetters([
      'id'
    ]),
    fileName(){
        return this.fileName = this.excelName+'.'+this.bookType;
    },
  },
  mounted() {
    this.axios.get("/show",{params:{uid:this.id,save_type:1}}).then(response => {this.tableData = response.data;
    this.$refs.selectionTable.toggleAllSelection(this.tableData,true);});
    //手机类型列表
    this.axios.get("/gettypeoptions").then(response=>{this.type_options = response.data;})
 },
  methods: {
    //附件管理
    file_manage(index,row,id){
      this.file_visible = true
      this.axios.get("getfile",{params:{customer_id:id}}).then(response=>{
        this.file_list = JSON.parse(response.data[0].file_list)
        console.log(this.file_list)
      })
    },
      //导出
      exportExcel(){
          this.downloadLoading = true
          /* generate workbook object from table */
          var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
          /* get binary string as output */
          var wbout = XLSX.write(wb,{bookType: 'xlsx',bookSST:true,type:'array'})
          try{
              FileSaver.saveAs(new Blob([wbout],{type:'application/octet-stream'}),this.fileName)
          }catch(e){if(typeof console !== 'undefined')console.log(e,wbout)}
          this.downloadLoading = false
          return wbout
      },
      //选择
    SelectionChange(val) {
        this.tableBox = val
      console.log(val);
    },
    //传筛选的值
    filter(){
      console.log(this.time1);
      console.log(this.time2);
      console.log(this.form.phone_type);
       this.axios.get("/query", {
        params: {
          time1: this.time1||'',
          time2: this.time2||'',
          uid:this.id,
          phone_type: this.form.phone_type,
          
        }
      }).then(response => this.tableData = response.data);
    },
    //删除
    handleDelete(index, row,id) {
    // Message({
    //     message: '确定要删除吗',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
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
        this.dialogFormVisible = true

        console.log(id)
    },
    //时间格式化
    dateFormat1: function(row, column){
        var date = row.start_time;
          if (date === undefined) {
          return "date is undefined";
        }
        //return moment(date).format("YYYY-MM-DD HH:mm:ss");
        // console.log('这里是dateFormat')
        // console.log(row.end_time)
        return moment(date*1000).format("YYYY-MM-DD HH:mm:ss");
    },
    dateFormat2: function(row, column){
        var date = row.end_time;
          if (date === undefined) {
          return "date is undefined";
        }
        //return moment(date).format("YYYY-MM-DD HH:mm:ss");
        // console.log('这里是dateFormat')
        // console.log(row.end_time)
        return moment(date*1000).format("YYYY-MM-DD HH:mm:ss");
    },
  }
};
</script>
<style scoped>
    .img{
      margin: 10px;
      height: 150px;
      border-radius: 5px;
    }
    .file_gar{
      float: left;
    }
    .file_gar span{
      display: block;
      text-align: center;
    }
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


