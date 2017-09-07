var vm = new Vue({
    el: '#app',
    data: {
	    productList: [],
        totalMoney: 0,
	    checkAllFlag: false,
        delFlag: false,
	    curProduct: '',
    },
    filters: {
        formatMoney: (value) => '￥ ' + value.toFixed(2),
    },
    mounted: function () {
        this.$nextTick( () => this.cartView() );
    },
    methods: {
        cartView: function () {
           this.$http.get("data/cartData.json").then( res => {
              this.productList = res.body.result.list;
              this.totalMoney = res.body.result.totalMoney;
              this.checkAll(true);
           });
        },
        changeMoney: function (product, increment) {
	        if (increment > 0) {
		        product.productQuantity++;
	        } else {
		        product.productQuantity--;
		        if (product.productQuantity < 1) {
			        product.productQuantity = 1;
		        }
	        }
	        this.getTotalPrice();
        },
        selectedProduct: function (item) {
	        if (typeof item.checked == 'undefined') {
		        Vue.set(item, 'checked', true);
	        } else {
		        item.checked = !item.checked;
	        }
	        this.getTotalPrice();
        },
        checkAll: function (checked) {
            this.checkAllFlag = checked;
            this.productList.forEach((item, index) => {
	            if (typeof item.checked == 'undefined') {
		            Vue.set(item, 'checked', this.checkAllFlag);
	            } else {
		            item.checked = this.checkAllFlag;
	            }
            });
            this.getTotalPrice();
        },
        getTotalPrice: function () {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
	            if (item.checked) {
		            this.totalMoney += item.productQuantity * item.productPrice;
	            }
            });
        },
	    delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});