<template>
    <div class="readWritefillinBlank">
        <table class="table table-bordered">
            <thead>
                <th width="5%">SN</th>
                <th>Option</th>
                <th><a href="" @click.prevent="addRow()" class="btn btn-sm btn-primary pull-right">
                    <i  class="fa fa-plus"></i></a></th>
            </thead>
            <tbody>
                <tr v-for="(element,index) in elements" :key="element.id">
                    <td>#</td>
                    <td><input name="fill_option[]" v-model="element.option" class="form-control" /></td>
                    <td><a href="javascript:;" @click.prevent="removeRow(index)"><i class="fas fa-times"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
       
        <table class="table table-bordered">
           <thead>
               <th width="5%">SN</th>
               <th>Correct Answer</th>
               <th><a href="" @click.prevent="addCorrectRow()" class="btn btn-sm btn-primary pull-right">
                    <i  class="fa fa-plus"></i></a></th>
            </thead>
              <sortable-list v-model="correctOrder" item-class="sort-selected" handle-class="handle-class">
             <tbody slot-scope="{items}">
               <sortable-item v-for="(element,index) in items" :key="index">
                     
                   <tr >
                    <sortable-handle :key="element.index">
                    <td><i class="fa fa-bars"></i></td>
                        </sortable-handle>
                    <td><input name="correct_option[]" v-model="element.option" class="form-control" /></td>
                    <td><a href="javascript:;" @click.prevent="removeCorrectRow(index)"><i class="fas fa-times"></i></a>
                    </td>
                </tr>
               </sortable-item>
            </tbody>   
</sortable-list>
        </table>
         
    </div>
</template>

<script>
    import SortableList from './../../../components/Sortable/SortableList.vue';
    import SortableItem from './../../../components/Sortable/SortableItem.vue';
    import SortableHandle from './../../../components/Sortable/SortableHandle.vue';
    export default {
        props: {
            field: {
                required: true
            },
            metas: {
                type: Object,
                required: false,
            },
            rightOrder:{
                required: false,
            }
        },
          components: {
            SortableList,
            SortableItem,
            SortableHandle
        },
        data() {
            return {
                counter: 1,
                elements: [{
                    id: 1,
                    option: '',
                }],
                correctOrder:[{
                    id: 1,
                    option: '',
                }]
            }
        },
        mounted() {
            if (this.$route.params.question) {
                this.elements = JSON.parse(this.metas.meta_value);
                this.correctOrder = JSON.parse(this.rightOrder.answer);
            }
            console.log('Fill in blank mounted');
        },
        methods: {
            addRow(e) {
                this.elements.push({
                    id: `${++this.counter}`,
                    option: '',
                })

            },
            addCorrectRow(){
            this.correctOrder.push({
                id: `${++this.counter}`,
                option: '',
            })
            },
            removeRow(index) {
                 this.$delete(this.elements,index);
            },
             removeCorrectRow(index) {
                 this.$delete(this.correctOrder,index);
            },

        }

    }

</script>

<style>

</style>
