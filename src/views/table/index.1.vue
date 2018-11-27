<template>
    <div>
        <el-row :gutter='10' style="margin-top:10px">
            <el-col :span="3"><div style="height: 40px;text-align: center;line-height: 40px;color: #909399;">导出筛选：</div></el-col>
            <el-col :span="10">
                <el-date-picker style="margin-right:10px" v-model="time1" type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
                <el-date-picker v-model="time2" type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-form ref="form" :model="form">
                <el-form-item label="">
                  <el-select v-model="form.phone_version" placeholder="手机型号">
                    <el-option label="m6" value="m6"/>
                    <el-option label="m6s" value="m6s"/>
                    <el-option label="m8" value="m8"/>
                    <el-option label="m8t" value="m8t"/>
                    <el-option label="m8s" value="m8s"/>
                    <el-option label="t8" value="t8"/>
                    <el-option label="t8s" value="t8s"/>
                    <el-option label="v6" value="v6"/>
                    <el-option label="t9" value="t9"/>
                    <el-option label="t9特别版" value="t9特别版"/>
                    <el-option label="v7" value="v7"/>
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
            <el-table-column align="center" prop='name' label='客户姓名' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.name}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.name" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='customer_type' label='客户类型' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.customer_type}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.customer_type" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='serviceType' label='服务类型' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.serviceType}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.serviceType" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='fault_info' label='故障描述' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.fault_info}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.fault_info" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='手机型号' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone_version}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone_version" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone_color' label='手机颜色' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone_color}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone_color" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='imei1' label='imei1' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.imei1}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.imei1" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='imei2' label='imei2' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.imei2}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.imei2" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='repair_result' label='维修结果' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.repair_result}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.repair_result" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='check_result' label='检测结果' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.check_result}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.check_result" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='actual_fault' label='实际故障' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.actual_fault}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.actual_fault" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='fault_code' label='故障代码' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.fault_code}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.fault_code" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='material' label='更换物料' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.material}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.material" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.new_imei1}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.new_imei1" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.new_imei2}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.new_imei2" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat">
                <template slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.end_time}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.end_time" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作' width='125' fixed="right">
                <template slot-scope="scope">
                    <router-link :to="'/print/'+scope.row.userId" style="font-size:12px;color:#409EFF;display:inline-block;font-weight:bold;font-family: sans-serif;">打印</router-link>
                    <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">{{scope.row.changeWord}}</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                     
                </template>
 
            </el-table-column>
        </el-table>

        <el-table v-show="false" id="out-table" class="tableBox" :data='tableBox' style="100%;text-align:center" >
            
            <el-table-column align="center" prop='name' label='客户姓名' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.name}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.name" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='customer_type' label='客户类型' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.customer_type}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.customer_type" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='serviceType' label='服务类型' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.serviceType}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.serviceType" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='fault_info' label='故障描述' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.fault_info}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.fault_info" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone_version' label='手机型号' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone_version}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone_version" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='phone_color' label='手机颜色' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.phone_color}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.phone_color" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='imei1' label='imei1' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.imei1}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.imei1" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='imei2' label='imei2' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.imei2}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.imei2" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='repair_result' label='维修结果' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.repair_result}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.repair_result" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='check_result' label='检测结果' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.check_result}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.check_result" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='actual_fault' label='实际故障' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.actual_fault}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.actual_fault" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='fault_code' label='故障代码' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.fault_code}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.fault_code" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='material' label='更换物料' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.material}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.material" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.new_imei1}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.new_imei1" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.new_imei2}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.new_imei2" clearable ></el-input></div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat">
                <template slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.end_time}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.end_time" clearable ></el-input></div>
                </template>
            </el-table-column>
            
        </el-table>
    </div>
</template>
<script>
// import printExcel from '../excel/Export2Excel'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
        form:{
        phone_version: ''
      },
    //   tableData: [],
    //   inputName: "",
      tableData: [
        {userId:'10', name: "王一", phone: "123234243243", customer_type: "个人",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
        {userId:'11', name: "王二", phone: "1232344354353", customer_type: "企业",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
        {userId:'12', name: "王三", phone: "124545544243243", customer_type: "个人",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑' }
      ],
      tableBox:[],
      time1:'',
      time2:'',          
      curIndex:'',
      downloadLoading:false,

    //   autoWidth:true,
    //   bookType: 'xlsx'
      
    };
  },
//    mounted() {
//     this.axios.get("/show").then(response => this.tableData = response.data);
//   },
 mounted(){
         this.$refs.selectionTable.toggleAllSelection(this.tableData,true);
      },
  methods: {
      //导出
       exportExcel () {
         this.downloadLoading = true
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         this.downloadLoading = false
         return wbout
         
     },
     
      //导出
    //   handleDownload() {
    // //   this.downloadLoading = true
    //     import('../excel/Export2Excel').then(excel => {
    //     const tHeader = ['客户姓名', '手机号码', '客户类型', '服务类型', '故障描述']
    //     // const filterVal =['name', 'phone', 'customer_type', 'serviceType', 'fault_info']
    //     const data = this.tableData
    //     // const data = this.formatJson(filterVal, list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //     //   filename: this.filename,
    //       autoWidth: this.autoWidth,
    //       bookType: this.bookType
    //     })
    //     // this.downloadLoading = false
    //   })
    // },
    //  formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // },
      //选择
    SelectionChange(val) {
        
      this.tableBox = val
      console.log(val);
    },
    //传筛选的值
    filter(){
      console.log(this.time1);
      console.log(this.time2);
      console.log(this.form.phone_version);
       this.axios.get("/query", {
        params: {
          time1: this.time1,
          time2: this.time2,
          phone_version: this.form.phone_version
        }
      }).then(response => this.tableData = response.data);
    },
    handleDelete(index, row) {
      if (confirm("确定要删除吗")) {
        this.tableData.splice(index, 1);
      } else {
        return;
      }
    },
    //编辑
    handleEdit(index, row) {
        this.tableData[index].inputBox=!this.tableData[index].inputBox
        this.curIndex=index
        this.tableData[index].changeWord=this.tableData[index].changeWord=='保存'?"编辑":"保存"
        
        
        console.log(row)
    //   console.log(this.tableData[index].inputBox);
    },
    //时间格式化
     formatDate: function(date) {
      var d = new Date(date * 1000);
      return d.toLocaleString();
    },
    dateFormat: function(row, column){
        var date = row[column.property];
          if (date === undefined) {
          return "";
        }
        return this.formatDate(date);
    },
  }
};
</script>
<style scoped>
    .tableBox{
        margin-top: 20px;
        border-top: 1px solid #eee;
    }
</style>


