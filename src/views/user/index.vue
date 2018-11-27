<template>
    <div>
        <div>
            <el-row type="flex" style="margin:10px 0 10px 10px" >
                <el-button @click="add()"  size="medium" type="success" icon="el-icon-circle-plus">添加账号</el-button>
            </el-row>
            <el-table :data='tableData' style="border-top:1px solid #eee">
                <el-table-column align="center" prop='name' label='网点名称'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.name}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='phone'  label='网点地址'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.phone}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='customer_type' label='网点电话'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.customer_type}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='serviceType' label='网点账号'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.serviceType}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='fault_info' label='网点密码' :formatter='forddd'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.fault_info}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" width="115" fixed='right' label='操作'>
                   <template slot-scope="scope">
                       <el-button-group>
                        <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑账号</el-button>
                        <el-button  @click="Delete(scope.$index)"   size="small" type="danger" icon="el-icon-delete">删除账号</el-button>
                       </el-button-group>
                   </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
                <el-form :model="edit_item">
                  <el-form-item label="网点名称" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.customer_type" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.serviceType" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.fault_info" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
                </div>
            </el-dialog>
             <el-dialog title="添加信息" :visible.sync="add_message" close='add_mage()' :close-on-click-modal='false'>
                <el-form :model="add_item">
                  <el-form-item label="网点名称" :label-width="formLabelWidth">
                    <el-input v-model="add_item.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" :label-width="formLabelWidth">
                    <el-input v-model="add_item.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" :label-width="formLabelWidth">
                    <el-input v-model="add_item.customer_type" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" :label-width="formLabelWidth">
                    <el-input v-model="add_item.serviceType" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" :label-width="formLabelWidth">
                    <el-input v-model="add_item.fault_info" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="add_message = false">取 消</el-button>
                  <el-button type="primary" @click="add_message = false">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        tableData: [
            {name: "王一", phone: "123234243243", customer_type: "个人",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
            {name: "王二", phone: "1232344354353", customer_type: "企业",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
            {name: "王三", phone: "124545544243243", customer_type: "个人",serviceType:'保内',fault_info:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑' }
        ],
        dialogFormVisible: false,
        add_message:false,
        formLabelWidth: '120px',
        edit_item:[],//编辑的内容
        add_item:[],//添加的内容
        }
    },
    methods:{
        add_mage(){
            console.log("hahahahah")
        },
        add(){
            this.add_message = true
        },
        edit(item){
            this.dialogFormVisible = true,
            this.edit_item = item
        },
        Delete(index){
            this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              closeOnClickModal:false,
              type: 'warning'
            }).then(() => {
                this.tableData.splice(index,1)
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        forddd(){
            return '男'
        }
    }
}

</script>

