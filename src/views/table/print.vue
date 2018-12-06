<template>
	<div class="container" id="dayin">
			<div class="box1">
				<h1>美图售后服务工单</h1>
			</div>
			<div>
			<div class="row">
				<div class="col-xs-7">&nbsp;</div>
				<div class="col-xs-5">
					服务单号：{{tableData.service_number}}
				</div>				
			</div>
			</div>
			<div>
				<h3>网点信息</h3>
			</div>
			<div class="row">

				<div class="col-xs-7">

					<div>网点名称：{{website_name}}</div>
					<div>网点地址：{{address}}</div>
				</div>
				<div class="col-xs-5">
					<div>网点电话：{{website_phone}}</div>
					<div>结单时间：{{end_time}}</div>
				</div>
			</div>

			<div class="row">

				<div class="col-xs-7">
					<div>
						<h3>客户信息</h3>
					</div>
					<div>客户姓名：{{tableData.customer_name}}</div>
					<div>手机号码：{{tableData.phone}}</div>
					<div>服务类型：{{tableData.service_type}}</div>
					<div>描述故障：{{tableData.fault_info}}</div>
					<div>&nbsp;</div>
					<div>&nbsp;</div>
					<div>检测结果：{{tableData.check_result}}</div>
					<div>实际故障：{{tableData.actual_fault}}</div>
				</div>

				<div class="col-xs-5">

					<div>
						<h3>货品信息</h3>
					</div>
					<div>品类：美图-{{tableData.phone_type}}</div>
					<div>序列号：{{tableData.imei1}}</div>
					<div>受理时间：{{start_time}}</div>
					<div>维修结果：{{tableData.repair_result}}</div>
					<div>货品型号：{{tableData.phone_version}}</div>
					<div>系列号2： {{tableData.imei2}}</div>
				</div>
			</div>

			<div>
				<h3>发货信息</h3>
			</div>
			<div class="row">
				<div class="col-xs-7">
					<div>客户姓名：{{tableData.customer_name}}</div>
					<div>客户地址：</div>
					<div>快递公司:</div>
				</div>
				<div class="col-xs-5">
					<div>客户电话：{{tableData.phone}}</div>
					<div>&nbsp;</div>
					<div>快递单号：</div>
				</div>
			</div>

			<div>
				<h3>处理信息</h3>
			</div>
			<div class="row">
				<div class="col-xs-3">
					<div>
						<h4>处理方式</h4>
						<p>更换{{tableData.materiel_name}}</p>
					</div>
				</div>
				<div class="col-xs-3">
					<div>
						<h4>物料名称</h4>
						<p>{{tableData.materiel_name}}</p>
					</div>
				</div>
				<div class="col-xs-3">
					<div>
						<h4>新imei</h4>
						<p>{{tableData.new_imei1}}</p>
					</div>
				</div>
				<div class="col-xs-3">
					<div>
						<h4>数量</h4>
						<p>{{tableData.materiel_num}}</p>
					</div>
				</div>
			</div>
			<div>
				<p>用料二维码信息：{{tableData.qr_code}}</p>
			</div>
			<br/><br/><br/>
			<div class="box4"></div>
			<br/>
			<div class="row">
				<div class="col-xs-7">客户签名：</div>
				<div class="col-xs-5">网点处理人：{{tableData.operator}}</div>
			</div>
		</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
	export default{  
		data(){
			return{
				id:null,
				tableData:undefined,
				start_time:undefined,
				end_time:undefined,
				number:undefined,
				phone_type:undefined
				// materiel:undefined,
			}
		},
		computed: {
			...mapGetters([
			'website_name',
			'address',
			'website_phone',
			]),
		},
		// created() {
		// 	this.axios.get("/materielname",{
		// 		params:{
		// 			id
		// 		}
		// 	})
		// },
        mounted:function(){
			let info
			let that = this
			this.axios.get("/print",{params:{info_id:this.$route.params.id}}).then(response => {
				that.tableData = response.data[0];
				this.id = this.$route.params.id
				let tmp_time = response.data[0].end_time
				let tmp_time1 = response.data[0].start_time
				that.start_time = that.dateFormat(tmp_time1)
				that.end_time = that.dateFormat(tmp_time)
				this.$nextTick(function(){
					that.aPrint()
				})
				});
            },
        methods: {
			formatDate(date){
			let	time = Number(date)*1000
			return	moment(time).format("YYYYMMDDHHmmss");
			},
			dateFormat(date){
			let	time = Number(date)*1000
			return	moment(time).format("YYYY-MM-DD HH:mm:ss");
			},
          aPrint(){
				var oldHtml = document.body.innerHTML;
				document.body.innerHTML = document.getElementById("dayin").innerHTML;
				window.print();//打印
				document.body.innerHTML = oldHtml;
				}
		  },
}	
	
</script>

<style>
/* *{
	font-size: 16px;
	line-height: 36px;
} */
body{
	height: auto;
}
.box1{
	text-align: center;
}

.box4{
	width: 100%;
	height: 2px;
	border-bottom: 2px solid #000;
}
</style>