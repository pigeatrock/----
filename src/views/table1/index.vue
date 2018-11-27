<template>
    <div class="app-container">
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
              <el-button type="success"  icon="el-icon-upload2">导出</el-button>
        </el-col>
        </el-row>
       
        <el-table :data='tableData' style="width:100%;text-align:center" @selection-change="SelectionChange">
            <el-table-column  type="selection" ></el-table-column>
            <el-table-column align="center" prop='name' label='客户姓名' width='180'>
                <el-input placeholder="请输入内容" v-model="inputName" clearable v-if="inputBox"></el-input>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'></el-table-column>
            <el-table-column align="center" prop='customer_type' label='客户类型' width='180'></el-table-column>
            <el-table-column align="center" prop='service_type' label='服务类型' width='180'></el-table-column>
            <el-table-column align="center" prop='fault_info' label='故障描述' width='180'></el-table-column>
            <el-table-column align="center" prop='phone_version' label='手机型号' width='180'></el-table-column>
            <el-table-column align="center" prop='phone_color' label='手机颜色' width='180'></el-table-column>
            <el-table-column align="center" prop='imei1' label='imei1' width='180'></el-table-column>
            <el-table-column align="center" prop='imei2' label='imei2' width='180'></el-table-column>
            <el-table-column align="center" prop='repair_result' label='维修结果' width='180'></el-table-column>
            <el-table-column align="center" prop='check_result' label='检测结果' width='180'></el-table-column>
            <el-table-column align="center" prop='actual_fault' label='实际故障' width='180'></el-table-column>
            <el-table-column align="center" prop='fault_code' label='故障代码' width='180'></el-table-column>
            <el-table-column align="center" prop='material' label='更换物料' width='180'></el-table-column>
            <el-table-column align="center" prop='new_imei1' label='新imei1' width='180'></el-table-column>
            <el-table-column align="center" prop='new_imei2' label='新imei2' width='180'></el-table-column>
            <el-table-column align="center" prop='end_time' label='结单时间' width='180' :formatter="dateFormat"></el-table-column>
            <el-table-column align="center" label='操作' width='100' fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form:{
        phone_version: ''
      },
      tableData: [],
      inputName: "",
      inputBox: true,
      time1: "",
      time2: ""
    };
  },
  mounted() {
    this.axios.get("/show").then(response => this.tableData = response.data);
  },
  methods: {
    SelectionChange(val) {
      console.log(val);
    },
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
    handleEdit(index, row) {
      console.log(this.inputBox);
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

