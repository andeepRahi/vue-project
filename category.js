const app = new Vue({
    el: '#app',
    data() {
        return {
            loading: true,
            categories: [],
            category: "",
            slug: "",
            parent_id: 0,
            status: 0,
            submitted: false,
            qtypes: [],
            options: [],
            errors: []
        }
    },
    computed: {
        slugify: function() {
            var slug = this.sanitizeTitle(this.category);
            return this.slug = slug;
        }
    },
    methods: {
        handleSubmit() {
            var form = document.getElementById('formCategory');
            var formData = new FormData(form);
            formData.append('slug', this.slug);
            axios.post("/bpc-admin/category/create", formData).then((response) => {
                this.category = "";
                this.options = [];
                Toast.fire({
                    type: 'success',
                    title: response.data.message
                })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        fetchCategoryList() {
            axios.get("/bpc-admin/category/catList")
                .then((response) => {
                    this.categories = response.data.categories;
                    this.options = response.data.options;
                    this.qtypes = response.data.types;
                    this.loading = false;
                }).catch((err) => {})
        },
        deleteCategory(id) {
            axios.get("/bpc-admin/category/delete/" + id).then((response) => {
                Toast.fire({
                    type: 'success',
                    title: response.data.message
                })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });

        },
        sanitizeTitle(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|??|??|??|???|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|??|??|??|???|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|??|??|??|???|???|??|???|???|???|???|???/gi, 'u');
            // Letter "d"
            slug = slug.replace(/??/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');
            return slug;
        }

    },
    created() {
        this.fetchCategoryList();
        FireEvent.$on('AfterEventFire', () => {
            this.fetchCategoryList();
        });
    }

});