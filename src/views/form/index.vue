
<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <h3>客户信息</h3>
      <el-form-item label="客户姓名：" prop="customer_name">
        <el-input v-model=" form.customer_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model.number=" form.phone" ></el-input>
      </el-form-item>
      <el-form-item label="客户类型：">
        <el-select v-model=" form.customer_type" placeholder="选择客户类型">
          <el-option label="个人用户" value="个人用户"/>
          <el-option label="经销商" value="经销商"/>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型：">
        <el-select v-model=" form.service_type" placeholder="选择服务类型">
          <el-option label="保内" value="保内"/>
          <el-option label="保外" value="保外"/>
          <el-option label="检测" value="检测"/>
          <el-option label="换机" value="换机"/>
        </el-select>
      </el-form-item>
      <el-form-item label="故障描述：" prop="fault_info">
        <el-input v-model=" form.fault_info"/>
      </el-form-item>
      <h3>货品信息</h3>
 

      <el-form-item label="手机型号：">
         <!-- <el-button @click="test">test</el-button> -->
        <el-cascader :options="version_options"  v-model="form.phone_version1" @active-item-change="handleItemChange" @change="materiel_list"></el-cascader>
      </el-form-item>


      <el-form-item label="激活时间：" prop="act_time" >
          <el-date-picker v-model="form.act_time" type="date" placeholder="选择激活时间" value-format="timestamp"></el-date-picker>
      </el-form-item>


      <el-form-item label="手机颜色：" prop="phone_color" >
          <el-input v-model=" form.phone_color"/>
      </el-form-item>
      <el-form-item label="imei1：" prop="imei1">
          <el-input v-model="form.imei1"/>
      </el-form-item>
      <el-form-item label="imei2：" prop="imei2">
          <el-input v-model=" form.imei2"/>
      </el-form-item>
      <el-form-item label="维修结果：">
        <el-select v-model=" form.repair_result" placeholder="选择维修结果">
          <el-option label="已修复" value="已修复"/>
          <el-option label="未修复" value="未修复"/>
          <el-option label="拒修退回" value="拒修退回"/>
          <el-option label="无故障退回" value="无故障退回"/>
        </el-select>
      </el-form-item>
      <h3>处理信息</h3>
      <el-form-item label="检测结果：">
        <el-select v-model=" form.check_result" placeholder="选择检测结果">
          <el-option label="故障属实" value="故障属实"/>
          <el-option label="无故障" value="无故障"/>
        </el-select>
      </el-form-item>
      <el-form-item label="实际故障：" prop="actual_fault">
          <el-input v-model=" form.actual_fault"/>
      </el-form-item>
      <el-form-item label="故障代码：" prop="fault_code">
          <el-select v-model="form.fault_code" clearable filterable @change="fault_change">
            <el-option v-for="item in fault_options" :key="item.fault_code" :label="item.fault_code" :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="更换物料：">
          <el-select v-model="form.materiel" filterable>
            <el-option v-for="item in materiel_options" width="auto" :key="item.value" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <el-input-number v-model="form.materiel_num" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="用料二维码：" prop="qr_code">
          <el-input v-model=" form.qr_code"/>
      </el-form-item>
       <el-form-item label="新imei1：">
          <el-input v-model=" form.new_imei1"/>
      </el-form-item>
       <el-form-item label="新imei2：">
          <el-input v-model=" form.new_imei2"/>
      </el-form-item>
       <el-form-item label="附件：">
          <el-upload ref="upload" :action="upload_url" class="upload-demo" 
 :on-success="add_list" :before-remove="beforeRemove"
          multiple  :file-list="file_list"
           list-type="picture"
           >
            <el-button size="small" type="success">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传图片</div> -->
          </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onStorage('form')">暂存</el-button>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="onCancel('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
  //定义一个全局的变量，谁用谁知道
  var validPhone=(rule, value,callback)=>{
      if (!value){
          return callback(new Error('请输入手机号码'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        //console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的11位手机号码'));
        }
      }
  }

  export default {
    created() {
      //得到phone version列表
        this.axios.get('/getphoneversion1').then(response=>{
        // this.phone_tmp_list = response.data.data
        this.version_options = response.data
        this.upload_url = this.axios.defaults.baseURL+'/upload'
        // console.log(this.version_options)
      })
    },
    mounted() {
      //获取暂存数据
      // this.storage_id = this.$route.query.id
      if(this.$route.query.id){
        this.storage_id = this.$route.query.id
             this.axios.get("/showstorage",{params:{storage_id:this.$route.query.id}}).then(response=>{
              //  console.log(response.data)
               this.form = response.data
              //设置选项列表
              this.axios.get('selectoptions',{params:{storage_id:this.$route.query.id}}).then(response=>{
                this.version_options = response.data
              })
              //
              this.axios.get("/getmateriel",{
              params:{
                'phone_type':response.data.phone_type
              }
              }).then(response=>{
              this.materiel_options = response.data
              //  console.log(this.materiel_options)
              })

               var tmp_arr=[]
               tmp_arr.push(response.data.phone_type)
               tmp_arr.push(response.data.phone_version)
               this.form.phone_version1=tmp_arr
               this.file_list = JSON.parse(response.data.file_list)//附件列表
      }).then(()=>{
        this.axios.get("/getmateriel",{
         params:{
           'phone_type':val[0]
         }
       }).then(response=>{
         console.log('this1 is getmateriel')
         console.log(response.data)
         this.materiel_options = response.data
        //  console.log(this.materiel_options)
       })
          //设置materiel默认值
          // this.axios.get('/singlename',{params:{
          //   id:this.form.materiel
          // }}).then(response=>{
          //   this.form.materiel = response.data[0].value
          // })
      })
      }
      
      //操作员
      this.operator = this.name
      //得到fault列表
      this.axios.get('/getfault').then(response=>{
        this.fault_options = response.data
      })
    },
    data() {
      return {
        //上传路径
        upload_url:'',
        //暂存数据id
        storage_id:'',
        //附件列表
        file_list:[],
        props:{
          value: 'value',
          children: 'phones'
        },
        // customer_id:undefined,//当前最大的id
        fault_options:[],//错误列表
        fault_id:'',
        materiel_options:[],//物料列表
        phone_tmp_list:[],
        version_options:[],//手机型号列表
        form: {
          materiel_num:'1',//物料数量
          service_number: '',//工单号
          //客户信息
          customer_name: '',
          phone: '',
          customer_type: '个人用户', //客户类型，默认个人
          service_type: '保内', //服务类型，默认保内
          fault_info: '', //故障描述
          //货品信息
          // phone_type: '',//手机型号一级
          phone_version1: [],//手机型号二级
          act_time: '',//激活时间
          phone_color: '',
          imei1: '',
          imei2: '',
          repair_result: '已修复',
          //处理信息
          check_result: '故障属实',
          actual_fault: '',
          fault_code: '',
          materiel: '',
          qr_code: '',
          new_imei1: '',
          new_imei2: '',
        },
        operator: '',
        rules: {
          customer_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            // { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, trigger: 'blur', validator: validPhone }//这里需要用到全局变量
          ],
          fault_info: [
            { required: true, message: '请输入故障描述', trigger: 'blur' },
            { min: 2, max: 50, message: '字体长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          phone_color: [
            { required: true, message: '请输入手机颜色', trigger: 'blur' }
          ],
          imei1: [
            { required: true, message: '请输入imei1', trigger: 'blur' },
            // { type: 'numer', message:'imei1必须为数字值', trigger: 'change' }
            {len:15, message: '长度为15', trigger: 'blur' },
          ],
          imei2: [
            {len:15, message: '长度为15', trigger: 'blur' },
          ],
          actual_fault: [
            { required: true, message: '请输入实际故障 ', trigger: 'blur' },
            { min: 2, max: 50, message: '字体长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          fault_code: [
            { required:true,message: '请选择故障代码'}
          ],
        },
      };
    },
   methods: {
     //附件操作
     add_list(response,file,fileList){
       this.file_list.push(response)
     },
     beforeRemove(file,file_list){
       return this.$confirm(`确定移除${file.name}?`,{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(()=>{
         //删除文件
         let index = this.file_list.indexOf(file)
         this.file_list.splice(index,1)
         this.$message({
           type: 'success',
           message: '删除成功!'
         })
       });
     },
     //获取phone version二级菜单
      handleItemChange(val){
        this.axios.get("/getphoneversion2",{
          params: {
            'second': val[0]
          }
        }).then(response=>{
          this.version_options.forEach((item,index)=>{
            item.children = response.data
          })
        })
      },
     //保存fault id
     fault_change(id){
       this.fault_id = id
      //  console.log(id)
     },
     //获取marteril列表
     materiel_list(val){
      //  console.log(val)
       this.axios.get("/getmateriel",{
         params:{
           'phone_type':val[0]
         }
       }).then(response=>{
         console.log('this1 is getmateriel')
         console.log(response.data)
         this.materiel_options = response.data
        //  console.log(this.materiel_options)
       })
     },
     //提交
    onSubmit(formName) {
      this.file_list = JSON.stringify(this.file_list)
      // var time = new Date().getTime()
      // this.service_number = 'hd'+'-'+moment(time).format("YYYYMMDD")+'-'+this.customer_id
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.axios.get("/save", {
            params: {
              // service_number: this.service_number,
              save_type: 1,
              customer_name: this.form.customer_name,
              phone: this.form.phone,
              uid: this.id,
              customer_type: this.form.customer_type,
              service_type: this.form.service_type,
              fault_info: this.form.fault_info,
              phone_version: this.form.phone_version1,
              act_time: this.form.act_time,
              phone_color: this.form.phone_color,
              qr_code: this.form.qr_code,
              imei1: this.form.imei1,
              imei2: this.form.imei2,
              repair_result: this.form.repair_result,
              check_result: this.form.check_result,
              actual_fault: this.form.actual_fault,
              fault_code: this.form.fault_code,
              materiel: this.form.materiel,
              materiel_num: this.form.materiel_num,
              new_imei1: this.form.new_imei1,
              new_imei2: this.form.new_imei2,
              operator: this.operator,
              file_list: this.file_list
           }
          }).then(()=>{this.$message({
          message: '提交成功!',
          type: 'success'
        });this.$refs['form'].resetFields();this.$router.push('/table/index')}).catch((error)=>{this.$message.error('提交失败');console.log(error);});
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
      //暂存
    onStorage(formName) {
      this.file_list = JSON.stringify(this.file_list)
      console.log(this.file_list)
          this.axios.get("/savestorage", {
            params: {
              storage_id:this.storage_id,
              save_type: 0,//保存类型
              customer_name: this.form.customer_name,
              phone: this.form.phone,
              uid: this.id,
              customer_type: this.form.customer_type,
              service_type: this.form.service_type,
              fault_info: this.form.fault_info,
              phone_version: this.form.phone_version1,
              act_time: this.form.act_time,
              phone_color: this.form.phone_color,
              qr_code: this.form.qr_code,
              imei1: this.form.imei1,
              imei2: this.form.imei2,
              repair_result: this.form.repair_result,
              check_result: this.form.check_result,
              actual_fault: this.form.actual_fault,
              fault_code: this.form.fault_code,
              materiel: this.form.materiel,
              materiel_num: this.form.materiel_num,
              new_imei1: this.form.new_imei1,
              new_imei2: this.form.new_imei2,
              operator: this.operator,
              file_list: this.file_list
           }
          }).then(()=>{this.$message({
          message: '保存成功!',
          type: 'success'
        });this.$refs['form'].resetFields();this.$router.push('/table/storage')}).catch((error)=>{this.$message.error('提交失败');});
    },
    //取消
    onCancel(formName) {
      this.$message({
        message: "清除成功!",
        type: "warning"
      });
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name'
    ]),

  },
  }
</script>

<style scoped>
.app-container{
  width: 80%;
  margin: 0 auto;
}
</style>
