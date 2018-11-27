
<template>
  <div class="app-container">
    <el-form :model="from" :rules="rules" ref="from" label-width="120px">
      <h3>客户信息</h3>
      <el-form-item label="客户姓名：" prop="name">
        <el-input v-model=" from.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model.number=" from.phone" ></el-input>
      </el-form-item>
      <el-form-item label="客户类型：">
        <el-select v-model=" from.customer_type" placeholder="选择客户类型">
          <el-option label="个人用户" value="个人用户"/>
          <el-option label="经销商" value="经销商"/>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型：">
        <el-select v-model=" from.service_type" placeholder="选择服务类型">
          <el-option label="保内" value="保内"/>
          <el-option label="保外" value="保外"/>
          <el-option label="检测" value="检测"/>
          <el-option label="换机" value="换机"/>
        </el-select>
      </el-form-item>
      <el-form-item label="故障描述：" prop="fault_info">
        <el-input v-model=" from.fault_info"/>
      </el-form-item>
      <h3>货品信息</h3>
      <el-form-item label="手机型号：" prop ="phone_version">
        <el-select v-model=" from.phone_version" placeholder="选择手机型号">
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
      <el-form-item label="手机颜色：" prop="phone_color" >
          <el-input v-model=" from.phone_color"/>
      </el-form-item>
      <el-form-item label="imei1：" prop="imei1">
          <el-input v-model=" from.imei1"/>
      </el-form-item>
      <el-form-item label="imei2：" prop="imei2">
          <el-input v-model=" from.imei2"/>
      </el-form-item>
      <el-form-item label="维修结果：">
        <el-select v-model=" from.repair_result" placeholder="选择维修结果">
          <el-option label="已修复" value="已修复"/>
          <el-option label="未修复" value="未修复"/>
          <el-option label="拒修退回" value="拒修退回"/>
          <el-option label="无故障退回" value="无故障退回"/>
        </el-select>
      </el-form-item>
      <h3>处理信息</h3>
      <el-form-item label="检测结果：">
        <el-select v-model=" from.check_result" placeholder="选择检测结果">
          <el-option label="故障属实" value="故障属实"/>
          <el-option label="无故障" value="无故障"/>
        </el-select>
      </el-form-item>
      <el-form-item label="实际故障：" prop="actual_fault">
          <el-input v-model=" from.actual_fault"/>
      </el-form-item>
      <el-form-item label="故障代码：">
          <el-select v-model="fault_code" filterable>
            <el-option v-for="item in fault_code"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="更换物料：">
          <el-select v-model="materiel" filterable>
            <el-option v-for="item in materiel"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="新imei1：" prop="new_imei1">
          <el-input v-model=" from.new_imei1"/>
      </el-form-item>
       <el-form-item label="新imei2：" prop="new_imei2">
          <el-input v-model=" from.new_imei2"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel('from')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>
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
    data() {
      return {
        from: {
         //客户信息
        name: '',
        phone: '',
        customer_type: '个人用户', //客户类型，默认个人
        service_type: '保内', //服务类型，默认保内
        fault_info: '', //故障描述
        //货品信息
        phone_version: '',
        phone_color: '',
        imei1: '',
        imei2: '',
        repair_result: '已修复',
        //处理信息
        check_result: '故障属实',
        actual_fault: '',
        fault_code: [],
        materiel: [],
        new_imei1: '',
        new_imei2: ''
        },
        rules: {
          name: [
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
            { required: true, message: '请输入imei1', trigger: 'blur' }
          ],
          imei2: [
            { required: true, message: '请输入imei2', trigger: 'blur' }
          ],
          actual_fault: [
            { required: true, message: '请输入实际故障 ', trigger: 'blur' },
            { min: 2, max: 50, message: '字体长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          new_imei1: [
            { required: true, message: '请输入新imei1', trigger: 'blur' }
          ],
          new_imei2: [
            { required: true, message: '请输入新imei2', trigger: 'blur' }
          ],
        }
      };
    },
   methods: {
    onSubmit() {
      this.$message("保存!");

      this.axios.get("/save", {
        params: {
          name: this.form.name,
          phone: this.form.phone,
          uid: this.id,
          customer_type: this.form.customer_type,
          service_type: this.form.service_type,
          fault_info: this.form.fault_info,
          phone_version: this.form.phone_version,
          phone_color: this.form.phone_color,
          imei1: this.form.imei1,
          imei2: this.form.imei2,
          repair_result: this.form.repair_result,
          check_result: this.form.check_result,
          actual_fault: this.form.actual_fault,
          materiel: this.form.materiel,
          new_imei1: this.form.new_imei1,
          new_imei2: this.form.new_imei2
        }
      });
    },
    computed: {
    ...mapGetters([
      'id'
    ])
  },
    onCancel(formName) {
      this.$message({
        message: "取消!",
        type: "warning"
      });
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.app-container{
  width: 80%;
  margin: 0 auto;
}
</style>
