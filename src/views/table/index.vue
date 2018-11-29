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
                    <!-- <el-option label="m6" value="m6"/>
                    <el-option label="m6s" value="m6s"/>
                    <el-option label="m8" value="m8"/>
                    <el-option label="m8t" value="m8t"/>
                    <el-option label="m8s" value="m8s"/>
                    <el-option label="t8" value="t8"/>
                    <el-option label="t8s" value="t8s"/>
                    <el-option label="v6" value="v6"/>
                    <el-option label="t9" value="t9"/>
                    <el-option label="t9特别版" value="t9特别版"/>
                    <el-option label="v7" value="v7"/> -->
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
            <el-table-column align="center" prop='fault_code' label='故障代码' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='materiel' label='更换物料' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat">
            </el-table-column>
            <el-table-column align="center" label='操作' width='142' fixed="right">
                <template slot-scope="scope">
                    <router-link target="_blank" :to="'/print/'+scope.row.id" style="font-size:12px;color:#409EFF;display:inline-block;font-weight:bold;font-family: sans-serif;">打印</router-link>
                    <!-- <el-button @click="print(scope.row.id)" type="text" size="small" v-print="'#print_page'">打印</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">{{scope.row.changeWord}}</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row,scope.row.id)" type="text" size="small">删除</el-button>
                    
                </template>
 
            </el-table-column>
        </el-table>

        <el-table v-show="false" id="out-table" class="tableBox" :data='tableBox' style="width:100%;text-align:center" >
            
            <el-table-column align="center" prop='customer_name' label='客户姓名' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='customer_type' label='客户类型' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='serviceType' label='服务类型' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='fault_info' label='故障描述' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='手机型号' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='phone_color' label='手机颜色' width='180'>
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
            <el-table-column align="center" prop='fault_code' label='故障代码' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='material' label='更换物料' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'>
            </el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat">
            </el-table-column>
        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
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
      tableData: [],
      tableBox:[],
      dialogFormVisible: false,
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
    this.axios.get("/show",{params:{uid:this.id}}).then(response => {this.tableData = response.data;
    this.$refs.selectionTable.toggleAllSelection(this.tableData,true);});
    //手机类型列表
    this.axios.get("/gettypeoptions").then(response=>{this.type_options = response.data;})
 },
  methods: {
      //打印
    //   print(id){
    //       window.open("#/table/index")
    //   },
    //   print(id){
    //       this.axios.get("/print",{params:{info_id:id}}).then(response => {
    //             this.printData = response.data[0];
    //              var codestr = document.getElementById("print_page");   //获取需要生成pdf页面的div代码
    //             console.log(codestr)
    //             var newWindow = window.open();   //打开新窗口
                
    //             newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
    //             newWindow.document.close();     //关闭document的输出流, 显示选定的数据
    //             newWindow.print();   //打印当前窗口
    //           });
    //         },
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
    // handleEdit(index, row) {
    //     this.tableData[index].inputBox=!this.tableData[index].inputBox
    //     this.curIndex=index
    //     this.tableData[index].changeWord=this.tableData[index].changeWord=='保存'?"编辑":"保存"
        
        
    //     console.log(row)
    // //   console.log(this.tableData[index].inputBox);
    // },
    //时间格式化

    dateFormat: function(row, column){
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


