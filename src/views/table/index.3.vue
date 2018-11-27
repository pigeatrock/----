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
            <el-table-column align="center" prop='customer_name' label='客户姓名' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.customer_name}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.customer_name" clearable ></el-input></div>
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
            <el-table-column align="center" prop='service_type' label='服务类型' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.service_type}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.service_type" clearable ></el-input></div>
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
                <!-- <template slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.end_time}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.end_time" clearable ></el-input></div>
                </template> -->
            </el-table-column>
            <el-table-column align="center" label='操作' width='142' fixed="right">
                <template slot-scope="scope">
                    <!-- <router-link :to="'/print/'+scope.row.id" style="font-size:12px;color:#409EFF;display:inline-block;font-weight:bold;font-family: sans-serif;">打印</router-link> -->
                    <el-button @click="print(scope.row.id)" type="text" size="small" v-print="'#print_page'">打印</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">{{scope.row.changeWord}}</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row,scope.row.id)" type="text" size="small">删除</el-button>
                    
                </template>
 
            </el-table-column>
        </el-table>

        <el-table v-show="false" id="out-table" class="tableBox" :data='tableBox' style="width:100%;text-align:center" >
            
            <el-table-column align="center" prop='customer_name' label='客户姓名' width='180'>
                <template  slot-scope="scope">
                    <div v-show="!scope.row.inputBox">{{scope.row.customer_name}}</div>
                    <div v-show="scope.row.inputBox"><el-input placeholder="请输入内容" v-model="scope.row.customer_name" clearable ></el-input></div>
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

        <div id="print_page" ref="print_page" v-show="false">
        <div id="dayin" class="container_box" style="width: 90%;margin:0 auto;position: relative;">
			<div class="top_title1" style="text-align: center;">
	    	    <h1>美图售后服务工单</h1>
	    	</div>
	    	<div class="top_title2" style="margin-right: 12px;text-align: right;">
	    	    <h2>服务单号：{{printData.end_time}}</h2>
	    	</div>
	    	<div class="comment_box" style="width: 100%;overflow: hidden;font-size: 16px;line-height: 35px;">
	    		<div class="comment" style="float: left;width: 50%;">
			    	<div><h2>网点信息</h2></div>
			    	<div>
			    		<div>网点名称：{{printData.website_name}}</div>
	    	        	<div>网点地址：{{printData.address}}</div>
	    	        	<div>网点电话：{{printData.website_phone}}</div>
	    	        	<div>结单时间：{{printData.end_time}}</div>
			    	</div>
			    </div>
			    <div class="comment" style="float: left;width: 50%;">
			    	<div>
			    		<div><h2>客户信息</h2></div>
			    		<div>
			    			<div>客户姓名：{{printData.customer_name}}</div>
				          	<div>手机号码: {{printData.phone}}</div>
				          	<div>服务类型：{{printData.service_type}}</div>
				          	<div>描述故障：{{printData.fault_info}}</div>
				          	<div>实际故障：{{printData.actual_fault}}</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="comment" style="float: left;width: 50%;">
			    	<div>
			    		<div><h2>货品信息</h2></div>
			    		<div>
			    			<div>品类：{{printData.phone_version}}</div>
							<div>序列号：865845039932050</div>
							<!--<div>受理时间：2018-10-20 &nbsp;&nbsp;18:57:36</div>-->
							<div>受理时间：{{printData.start_time}}</div>
							<div>维修结果：{{printData.repair_result}}</div>
							<div>货品型号：T8s 售后公开版专用机头（粉）</div>
			    		</div>

			    	</div>
			    </div>
			    <div class="comment" style="float: left;width: 50%;">
			    	<div>
			    		<div><h2>发货信息</h2></div>
			    		<div>
							<div>客户姓名：{{printData.customer_name}}</div>
							<div>客户地址：</div>
							<div>快递公司:</div>
							<div>客户电话：{{printData.phone}}</div>
	    	                <div>快递单号：</div>
			    		</div>
			    	</div>
			    </div>
	    		<div class="last_comment">
	    			<div><h2>处理信息</h2></div>
	    			<div class="last_comment_chlid">
						<div style="width: 33%;float: left;font-size: 18px;">处理方式:</div>
						<div style="width: 33%;float: left;font-size: 18px;">物料名称:</div>
						<div style="width: 33%;float: left;font-size: 18px;">数量:</div>
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
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
        phone_version: ''
      },
      printData: undefined,
      tableData: [],
      tableBox:[],
      dialogFormVisible: false,
      time1: "",
      time2: "",
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
 },
  methods: {
      //打印
    //   print(id){
    //       window.open("#/table/index")
    //   },
      print(id){
          this.axios.get("/print",{params:{info_id:id}}).then(response => {
                this.printData = response.data[0];
                var codestr = document.getElementById("print_page");   //获取需要生成pdf页面的div代码
                console.log(codestr)
                var newWindow = window.open();   //打开新窗口
                
                newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
                newWindow.document.close();     //关闭document的输出流, 显示选定的数据
                newWindow.print();   //打印当前窗口
              });
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
      console.log(this.form.phone_version);
       this.axios.get("/query", {
        params: {
          time1: this.time1,
          time2: this.time2,
          uid:this.id,
          phone_version: this.form.phone_version,
          
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
        console.log('这里是dateFormat')
        console.log(row.end_time)
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


