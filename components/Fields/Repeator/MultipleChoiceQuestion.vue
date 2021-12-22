<template>
    <table class="table table-bordered">
        <thead>
            <th>SN</th>
            <th>Option</th>
            <th>Correct</th>
            <th><a href="" @click.prevent="addMoreRow()" class="btn btn-sm btn-primary pull-right"><i
                        class="fa fa-plus"></i></a></th>
        </thead>
        <tbody>
            <tr v-for="(element) in elements" :key="element.id">
                <td>{{element.id}}</td>
                <td v-if="showRadioBtn">
                    <textarea cols="20" rows="2" name="option[]" v-model="element.option"
                        class="form-control"></textarea>
                </td>
                <td v-else>
                    <textarea cols="20" rows="2" name="option[]" v-model="element.option"
                        class="form-control"></textarea></td>
                <td v-if="showRadioBtn"><input type="radio" name="correct_option" :checked="element.checked"
                        :id="element.id" :value="element.id"></td>
                <td v-else> <input type="checkbox" name="correct_option[]" :id="element.id" v-model="element.checked"
                        :value="element.id"></td>
                <td>
                    <input type="hidden" name="option_index[]" :value="element.id">
                    <a href="" @click.prevent="removeRow(element.id)"
                        class="btn btn-sm btn-default btn-danger pull-right"><i class="fa fa-trash"></i></a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props:{
            field:{required:true},
            metas: {
                type: Object,
                required: false,
            },
        },
        data() {
            return {
                counter: 1,
                elements: [{
                    id: 1,
                    option: '',
                    checked: false
                }],
            }
        },
        mounted(){
            if(this.$route.params.question)
            {
                this.elements = JSON.parse(this.metas.meta_value);
            }

        },
        computed:{
           showRadioBtn: function () {
                return this.field.slug == 'mccsa' 
                || this.field.slug == 'smw' 
                || this.field.slug == 'lmccsa' 
                || this.field.slug == 'hcs'
            },
        },
        methods: {
            addMoreRow(e) {
                this.elements.push({
                    id: `${++this.counter}`,
                    option: '',
                    checked: false
                })
            },
          removeRow(index) {
                this.elements.splice(index-1,1)
            },
            
        }
    }

</script>
