new Vue({
	el: "#app",
	data: {		
		totalMoney: 0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:[]
	},
	filters: {
		formatMoney: function (value) {
			return "￥"+ value.toFixed(2);
		}
	},
	mounted: function (){
		this.$nextTick(function() {
    		// 保证this.$el已经插入文档
    		this.cartView();
    	});		
	},
	methods: {
		cartView: function (){
			// ES 5书写格式
			// this.$http.get("data/cartData.json").then(function (res) {
			// 	_this.productList = res.data.result.list;
			// 	_this.totalMoney = res.data.result.totalMoney;
			// }).catch(function (e){				
			// 	console.log(e);
			// });

			// ES 6书写格式
			this.$http.get("data/cartData.json").then(res => {
				this.productList = res.data.result.list;
				// this.totalMoney = res.data.result.totalMoney;
			}, function(e){
				console.log(e);
			});
		},
		changeMoney: function (product,way){
			if (way > 0) {
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if (product.productQuentity <= 1) {
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct: function (item) {
			if (typeof item.checked == 'undefined') {
				// Vue.set(item, "checked",true);	// 全局注册checked属性
				this.$set(item, "checked", true);	// 局部注册checked属性
			}else{
				item.checked = !item.checked;
				this.checkAllFlag = false;
			}
			this.calcTotalPrice();
		},
		checkAll: function (flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function (item, index){
					if (typeof item.checked == 'undefined') {
						_this.$set(item, "checked", _this.checkAllFlag);
					}else{
						item.checked = _this.checkAllFlag;
					}
				});
			this.calcTotalPrice();

			// if (this.checkAllFlag) {
			// 	this.productList.forEach(function (item, index){
			// 		if (typeof item.checked == 'undefined') {
			// 			_this.$set(item, "checked", _this.checkAllFlag);
			// 		}else{
			// 			item.checked = _this.checkAllFlag;
			// 		}
			// 	});
			// }
		},
		calcTotalPrice: function(){
			var _this=this;
			_this.totalMoney=0;
			this.productList.forEach(function (item, index){
				if(item.checked){
					// console.log(item.checked);
					_this.totalMoney+=item.productPrice*item.productQuentity;
				}
			});
		},
		delConfirm:function(item){
			this.delFlag=true;
			this.curProduct=item;

		},
		delProduct:function(){
			var index=this.productList.indexOf(this.productList);
			this.productList.splice(index,1);
			this.delFlag=false;
			this.calcTotalPrice();
			
		}

	}
});

Vue.filter("Money", function (value,type)  {
	return "￥" + value.toFixed(2) + type;
});