<template>
    <div>
        <div>
            <el-row type="flex" style="margin:10px 0 10px 10px" >
                <el-button @click="add()"  size="medium" type="success" icon="el-icon-circle-plus">添加网点</el-button>
            </el-row>
            <el-table :data='tableData' style="border-top:1px solid #eee">
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
                <el-table-column align="center" prop='password' label='网点密码'>
                    <!-- <template slot-scope="scope">
                     <div>{{scope.row.fault_info}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column align="center" width="115" fixed='right' label='操作'>
                   <template slot-scope="scope">
                       <el-button-group>
                        <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑账号</el-button>
                        <el-button  @click="Delete(scope.$index,scope.row.id)"   size="small" type="danger" icon="el-icon-delete">删除账号</el-button>
                       </el-button-group>
                   </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改信息" :visible.sync="edit_message" :close-on-click-modal='false'>
                <el-form :model="edit_item">
                  <el-form-item label="网点名称" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.website_name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.address" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.website_phone" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.name" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" :label-width="formLabelWidth">
                    <el-input v-model="edit_item.password" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="edit_message = false">取 消</el-button>
                  <el-button type="primary" :loading="edit_state" @click="edit_user()">保 存</el-button>
                </div>
            </el-dialog>
             <el-dialog title="添加账号信息" :visible.sync="add_message" close='add_mage()' :close-on-click-modal='false'>
                <el-form :model="add_item">
                  <el-form-item label="网点名称" :label-width="formLabelWidth">
                    <el-input v-model="add_item.website_name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点地址" :label-width="formLabelWidth">
                    <el-input v-model="add_item.address" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="网点电话" :label-width="formLabelWidth">
                    <el-input v-model="add_item.website_phone" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点账号" :label-width="formLabelWidth">
                    <el-input v-model="add_item.name" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网点密码" :label-width="formLabelWidth">
                    <el-input v-model="add_item.password" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="add_message = false">取 消</el-button>
                  <el-button type="primary" :loading="add_state" @click="add_user">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            add_state: false,
            edit_state: false,
            tableData: [],
            edit_message: false,//编辑状态
            add_message:false,//添加状态
            formLabelWidth: '120px',
            edit_item:{},//编辑的内容
            add_item:{},//添加的内容
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        //初始化列表
        init(){
         this.axios.get("/showuser").then(response => {this.tableData = response.data.data; console.log(this.tableData)});
        },
        //添加账号
        add_user(){
            this.add_state = true
            this.axios.get("/adduser",{params:{user_info:this.add_item}}).then(response =>{
                this.add_state = false
                this.add_message = false
                this.$message({
                message: '添加成功！',
                type: 'success'
                });
                this.init()
            }).catch(response=>{
                this.add_state = false
                this.add_message = false
                this.$message.error('添加用户失败！');
            })
        },
        add_mage(){
            console.log("hahahahah")
        },
        add(){
            this.add_message = true
        },
        //编辑账号
        edit(item){
            this.edit_message = true,
            this.edit_item = item
            console.log(this.edit_item);
        },
        edit_user(){//保存编辑的信息
        this.edit_state = true
            this.axios.get("/edituser",{params:{edit_info:JSON.stringify(this.edit_item)}}).then(response =>{
                this.edit_state = false
                this.edit_message = false
                this.$message({
                message: '修改成功！',
                type: 'success'
                });
                this.init()
            }).catch(response=>{
                this.edit_state = false
                this.edit_message = false
                this.$message.error('保存信息失败！');
            })
        },
        //删除账号
        Delete(index,id){
            this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              closeOnClickModal:false,
              type: 'warning'
            }).then(() => {
                this.tableData.splice(index,1)
                this.axios.get("/deluser",{params:{id:id}})
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
    }
}

</script>

