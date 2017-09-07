var vm = new Vue({
	el: '.container',
	data: {
		limit: 3,
		addrList: [],
        currentIndex: 0,
	},
	mounted: function () {
		this.$nextTick(function () {
			this.getAddressList();
		});
	},
	computed: {
		addrShowList: function(){
			return this.addrList.slice(0, this.limit);
		}
	},
	methods: {
		getAddressList: function () {
			this.$http.get('../data/address.json').then((res) => {
				this.addrList = res.body.result;
			})
		},
		showAll: function () {
			this.limit = this.limit == 3 ? this.addrList.length : 3;
		},
        setDefault: function (addressId) {
            this.addrList.forEach(function(item, index) {
                item.isDefault = addressId == item.addressId;
            });
        }
	}
});