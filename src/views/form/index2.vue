<template>
    <div>
        <div>
            <el-row type="flex" style="margin:10px 0 10px 10px" >
                <el-button @click="add()"  size="medium" type="success" icon="el-icon-circle-plus">添加账号</el-button>
            </el-row>
            <el-table :data='tableData' style="border-top:1px solid #eee">
                <el-table-column align="center" label='序号' width="50">
                    <template slot-scope="scope">
                        <div>{{scope.$index+1}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop='website_name' label='网点名称'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.name}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='address'  label='网点地址'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.phone}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='website_phone' label='网点电话'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.customer_type}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='name' label='网点账号'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.serviceType}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" prop='password' label='网点密码' :formatter='forddd'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.fault_info}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" width="115" fixed='right' label='操作'>
                   <template slot-scope="scope">
                       <el-button-group>
                        <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                        <el-button  @click="Delete(scope.$index)"   size="small" type="danger" icon="el-icon-delete">删除</el-button>
                       </el-button-group>
                   </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
                <el-form :model="edit_item" :rules="rules" ref="edit_item">
                  <el-form-item label="网点名称" prop='website_name'  :label-width="formLabelWidth">
                    <el-input :value='edit_item.website_name' autoComplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" prop='address' :label-width="formLabelWidth">
                    <el-input :value='edit_item.address' autoComplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" prop='website_phone' :label-width="formLabelWidth">
                    <el-input :value='edit_item.website_phone' autoComplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" prop='name' :label-width="formLabelWidth">
                    <el-input :value='edit_item.name' autoComplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" prop='password' :label-width="formLabelWidth">
                    <el-input :value='edit_item.password' autoComplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="edit_quxiao('edit_item')">取 消</el-button>
                  <el-button type="primary" @click="xiugai('edit_item')">保 存</el-button>
                </div>
            </el-dialog>
             <el-dialog title="添加信息"  :visible.sync="add_message" :close-on-click-modal="false">
                <el-form :model="add_item" :rules="rules" ref="add_item">
                  <el-form-item label="网点名称" prop='website_name' :label-width="formLabelWidth">
                    <el-input v-model="add_item.website_name" autoComplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" prop='address' :label-width="formLabelWidth">
                    <el-input v-model="add_item.address" autoComplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" prop='website_phone' :label-width="formLabelWidth">
                    <el-input v-model="add_item.website_phone" autoComplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" prop='name' :label-width="formLabelWidth">
                    <el-input v-model="add_item.name" autoComplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" prop='password' :label-width="formLabelWidth">
                    <el-input v-model="add_item.password" autoComplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="resetForm('add_item')">取 消</el-button>
                  <el-button type="primary" @click="submitForm('add_item')">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
var validPhone=(rule, value,callback)=>{
      if (!value){
          return callback(new Error('请输入手机号码'))
      } else {
        const reg =  /(^(\d{3,4}-)?\d{7,8})$|(1[3|5|7|8]\d{9})$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号码或者固定电话（如需加区号请在区号后面加-）'));
        }
      }
}
export default {
    data(){
        return{
            tableData: [
                {website_name: "王一", address: "123234243243", website_phone: "5800344",name:'保内',password:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
                {website_name: "王二", address: "1232344354353", website_phone: "2600344",name:'保内',password:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑'},
                {website_name: "王三", address: "124545544243243", website_phone: "8700344",name:'保内',password:'保内',inputBox: '美图',phone_version: '美图',phone_color: '美图',imei1: '美图',imei2: '美图',repair_result: '美图',check_result: '美图',actual_fault: '美图',fault_code: '美图',material: '美图',new_imei1: '美图',new_imei2: '美图',end_time:'2018-12-12',inputBox: false,changeWord:'编辑' }
            ],
            dialogFormVisible: false,
            add_message:false,
            formLabelWidth: '120px',
            edit_item:[],//编辑的内容
            add_item:{},//添加的内容
            // edit_index:'',//编辑的index
            rules:{
               website_name:[
                   {required:true,message:'请输入网点名称',trigger: 'blur'}
               ],
               address:[
                   {required:true,message:'请输入网点地址',trigger: 'blur'}
               ],
               website_phone:[
                   {required:true,validator: validPhone,trigger: 'blur'},
                  
               ],
               name:[
                   {required:true,message:'请输入账号',trigger: 'blur'}
               ],
               password:[
                   {required:true,message:'请输入密码',trigger: 'blur'}
               ] 
            }
        }
    },
    methods:{
        //修改取消
        edit_quxiao(edit_item){
            this.dialogFormVisible = false
            // this.$refs[edit_item].resetFields();
        },
        //修改保存
        xiugai(edit_item){
             this.$refs[edit_item].validate((valid) => {
              if (valid) {
                alert('添加成功!');
              } else {
                alert('添加失败!');
                return false;
              }
              this.dialogFormVisible = false
            });
            
        },
        //添加取消
        resetForm(add_item) {
        // this.$refs[add_item].resetFields();
        this.add_message = false
        },
        //添加保存
        submitForm(add_item){
            this.$refs[add_item].validate((valid) => {
              if (valid) {
                alert('添加成功!');
              } else {
                alert('添加失败!');
                return false;
              }
            });
            this.$refs[add_item].resetFields();
            this.add_message = false
        },
        //添加账号
        add(){
            this.add_message = true
        },
        //编辑
        edit(item,index){
            this.dialogFormVisible = true,
            this.edit_item.splice(0,1,item)
            // this.edit_index = index
           
        },
        Delete(index){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
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

