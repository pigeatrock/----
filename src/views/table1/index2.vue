<template>
    <div>
        <el-row :gutter='20' style="margin-top:10px">
            <el-col :span="3"><div style="height: 40px;text-align: center;line-height: 40px;">导出筛选：</div></el-col>
            <el-col :span="13">
                开始时间：<el-date-picker style="margin-right:10px" v-model="timeOne" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
                结束时间: <el-date-picker v-model="timeTwo" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
            </el-col>
            <el-col :span="6">
                手机型号：<el-select v-model="phoneValue" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        
        
        
        <el-table class="tableBox" :data='tableData' style="width:100%;text-align:center" @selection-change="SelectionChange">
            <el-table-column  type="selection" ></el-table-column>
            <el-table-column align="center" prop='name' label='客户姓名' width='180'>
                <el-input placeholder="请输入内容" v-model="inputName" clearable v-if="inputBox"></el-input>
            </el-table-column>
            <el-table-column align="center" prop='phone' label='手机号码' width='180'></el-table-column>
            <el-table-column align="center" prop='customerType' label='客户类型' width='180'></el-table-column>
            <el-table-column align="center" prop='serviceType' label='服务类型' width='180'></el-table-column>
            <el-table-column align="center" prop='fault' label='故障描述' width='180'></el-table-column>
            <el-table-column align="center" prop='phoneType' label='手机型号' width='180'></el-table-column>
            <el-table-column align="center" prop='phoneColor' label='手机颜色' width='180'></el-table-column>
            <el-table-column align="center" prop='imei1' label='imei1' width='180'></el-table-column>
            <el-table-column align="center" prop='imei2' label='imei2' width='180'></el-table-column>
            <el-table-column align="center" prop='maintenance' label='维修结果' width='180'></el-table-column>
            <el-table-column align="center" prop='detection' label='检测结果' width='180'></el-table-column>
            <el-table-column align="center" prop='actualFailure' label='实际故障' width='180'></el-table-column>
            <el-table-column align="center" prop='troubleCode' label='故障代码' width='180'></el-table-column>
            <el-table-column align="center" prop='material' label='更换物料' width='180'></el-table-column>
            <el-table-column align="center" prop='newImei1' label='新imei1' width='180'></el-table-column>
            <el-table-column align="center" prop='newImei2' label='新imei2' width='180'></el-table-column>
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
      tableData: [
        { name: "王一", phone: "123234243243", customerType: "个人" },
        { name: "王二", phone: "1232344354353", customerType: "企业" },
        { name: "王三", phone: "124545544243243", customerType: "个人" }
      ],
      inputName: "",
      inputBox: true,
      timeOne:'',
      timeTwo:'',
      options:[{
          value:"选项1",
          label:"m6"
      },{
          value:"选项2",
          label:"m6s"
      },{
          value:"选项3",
          label:"m8"
      },
      {
          value:"选项4",
          label:"m8t"
      },{
          value:"选项5",
          label:"m8s"
      },{
          value:"选项6",
          label:"t8"
      },{
          value:"选项7",
          label:"t8s"
      },
      {
          value:"选项8",
          label:"v6"
      },
      {
          value:"选项9",
          label:"t9"
      },
      {
          value:"选项10",
          label:"t9特别版"
      },
      {
          value:"选项11",
          label:"v7"
      },],          
      phoneValue:''
    };
  },
  methods: {
    SelectionChange(val) {
      console.log(val);
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
    }
  }
};
</script>
<style scoped>
    .tableBox{
        margin-top: 20px;
        border-top: 1px solid #eee;
    }
</style>


