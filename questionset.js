const app = new Vue({
    el: '#qsets',
    data() {
        return {
            id: "",
            set_type: 0,
            set_name: "",
            set_price: "",
            set_category: "",
            set_time: "",
            price: '',
            search: "",
            sets: {},
            isUpdate: false,
            isFree: true,
            loading: true,
            errors: [],
            total: 0,
            offset: 1,
        }
    },
    computed: {
        isPaid: function() {
            if (this.set_type == "paid") {
                this.set_price = this.price;
                return true;
            } else {
                this.set_price = "0.00";
                return false;
            }
        },
    },
    methods: {
        searchit: _.debounce(() => {
            FireEvent.$emit('searching');
        }, 200),
        handleSubmit() {
            var form = document.getElementById('formQuestion');
            var formData = new FormData(form);
            axios.post("/bpc-admin/sets/create", formData).then((response) => {
                Toast.fire({ type: 'success', title: response.data.message })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        editSet(id) {
            this.isUpdate = true;
            this.id = id;
            axios.get("/bpc-admin/sets/edit/" + id).then((response) => {
                this.set_type = response.data.question_set_type;
                this.set_name = response.data.question_set_name;
                this.set_price = (response.data.question_set_price == null) ? "0.0" : response.data.question_set_price;
                this.set_category = response.data.cat_id;
                this.price = (response.data.question_set_price == null) ? "0.0" : response.data.question_set_price;

            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        handleUpdateSubmit() {
            var formData = new FormData();
            formData.append('set_type', this.set_type);
            formData.append('set_name', this.set_name);
            formData.append('set_price', this.set_price);
            formData.append('set_category', this.set_category);
            axios.post("/bpc-admin/sets/edit/" + this.id, formData).then((response) => {
                Toast.fire({ type: 'success', title: response.data.message })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        getSets(page = 1) {
            this.loading = true;
            axios.get('/bpc-admin/sets/getSetLists?page=' + page)
                .then((response) => {
                    setTimeout(() => {
                        this.sets = response.data;
                        this.loading = false;
                    }, 1000);
                })
                .catch(() => {
                    console.log('handle server error from here');
                });
        },
        getSearch(query = '') {
            axios.get('/bpc-admin/sets/getSetLists?q=' + query)
                .then((response) => {
                    setTimeout(() => {
                        this.sets = response.data;
                        this.loading = false;
                    }, 1000);
                })
                .catch(() => {})
        }
    },
    mounted() {
        this.loading = true;
        this.getSets();
        FireEvent.$on('searching', () => {
            this.loading = true;
            let query = this.search;
            this.getSearch(query);
        })
        FireEvent.$on('AfterEventFire', () => {
            this.loading = true;
            this.getSets();
        });
    }
});