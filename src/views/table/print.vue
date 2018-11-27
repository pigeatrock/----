<template>
	<div id="print_page">
        <div id="dayin" class="container_box">
			<div class="top_title1">
	    	    <h1>美图售后服务工单</h1>
	    	</div>
	    	<div class="top_title2">
	    	    <h2>服务单号：{{number}}</h2>
	    	</div>
	    	<div class="comment_box">
	    		<div class="comment">
			    	<div><h2>网点信息</h2></div>
			    	<div>
			    		<div>网点名称：{{tableData.website_name}}</div>
	    	        	<div>网点地址：{{tableData.address}}</div>
	    	        	<div>网点电话：{{tableData.website_phone}}</div>
	    	        	<div>结单时间：{{end_time}}</div>
			    	</div>
			    </div>
			    <div class="comment">
			    	<div>
			    		<div><h2>客户信息</h2></div>
			    		<div>
			    			<div>客户姓名：{{tableData.customer_name}}</div>
				          	<div>手机号码: {{tableData.phone}}</div>
				          	<div>服务类型：{{tableData.service_type}}</div>
				          	<div>描述故障：{{tableData.fault_info}}</div>
				          	<div>实际故障：{{tableData.actual_fault}}</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="comment">
			    	<div>
			    		<div><h2>货品信息</h2></div>
			    		<div>
			    			<div>品类：{{tableData.phone_version}}</div>
							<div>序列号：865845039932050</div>
							<!--<div>受理时间：2018-10-20 &nbsp;&nbsp;18:57:36</div>-->
							<div>受理时间：{{tableData.start_time}}</div>
							<div>维修结果：{{tableData.repair_result}}</div>
							<div>货品型号：T8s 售后公开版专用机头（粉）</div>
			    		</div>

			    	</div>
			    </div>
			    <div class="comment">
			    	<div>
			    		<div><h2>发货信息</h2></div>
			    		<div>
							<div>客户姓名：{{tableData.customer_name}}</div>
							<div>客户地址：</div>
							<div>快递公司:</div>
							<div>客户电话：{{tableData.phone}}</div>
	    	                <div>快递单号：</div>
			    		</div>
			    	</div>
			    </div>
	    		<div class="last_comment">
	    			<div><h2>处理信息</h2></div>
	    			<div class="last_comment_chlid">
						<div>处理方式:</div>
						<div>物料名称:</div>
						<div>数量:</div>
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>
</template>
<script>
import moment from 'moment'
	export default{  
		data(){
			return{
				tableData:undefined,
				end_time:undefined,
				number:undefined,
			}
		},
        mounted:function(){
			let info
			let that = this
			this.axios.get("/print",{params:{info_id:this.$route.params.id}}).then(response => {
				that.tableData = response.data[0];
				let tmp_time = response.data[0].end_time
				that.end_time = that.dateFormat(tmp_time)
				that.number = that.formatDate(tmp_time)
				console.log(that.tableData)
				console.log(that.end_time)
				that.aPrint()
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
			  setTimeout(() => {
				var oldHtml = document.body.innerHTML;
				document.body.innerHTML = document.getElementById("dayin").innerHTML;
				window.print();
				document.body.innerHTML = oldHtml;
				}, 1000);
		  },
        }	
  }	
</script>

<style type="text/css">
	body{
		height: auto;
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