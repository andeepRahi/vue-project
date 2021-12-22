<template>
    <div class="reorderpara">
        <h5>Questions Setup</h5>
        <table class="table table-bordered">
            <thead>
                <th width="5%">SN</th>
                <th>Option</th>
                <th>
                    <a href="" @click.prevent="addRows()" class="btn btn-sm btn-primary pull-right"><i
                            class="fa fa-plus"></i></a>
                </th>
            </thead>
            <tbody>
                <tr v-for="(paragraph,index) in elements" :key="paragraph.id">
                    <td><i class="fas fa-bars nav-icon"></i></td>
                    <td><input name="order_option[]" :id="`pro_${paragraph.id}`" v-model="paragraph.option"
                            class="form-control" /></td>
                    <td>
                        <input type="hidden" name="option_index[]" :value="paragraph.id">
                        <a href="" @click.prevent="removeRow(index)"
                            class="btn btn-sm btn-default btn-danger pull-right"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="correctOrder" v-if='correctOrder.length >0'>
            <h5>Correct Answer Setup</h5>

            <sortable-list v-model="correctOrder" item-class="sort-selected" handle-class="handle-class">
                <div class="list-group" slot-scope="{items}">

                    <sortable-item v-for="element in items" :key="element.id">
                        <transition-group tag="div" name="sortableCards" class="
			grid single fourths
			flex-start-content
			disable-marker
			cards clickable
			sortable-animation
		">
                            <sortable-handle :key="element.id">
                                <div class="list-item">
                                    <input type="hidden" name="correct_order[]" :value="element.id">
                                    <input type="hidden" name="correct_option[]" :value="element.option">
                                    <a href="#" class="list-group-item list-group-item-action"><i
                                            class="fas fa-bars"></i>
                                        {{ element.option }}</a>
                                </div>
                            </sortable-handle>
                        </transition-group>
                    </sortable-item>


                </div>

            </sortable-list>



        </div>


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
        data() {
            return {
                counter: 3,
                elements: [{
                        id: 1,
                        option: '',
                    },
                    {
                        id: 2,
                        option: '',
                    },
                    {
                        id: 3,
                        option: '',
                    },
                ],
                correctOrder: []
            }
        },
        components: {
            SortableList,
            SortableItem,
            SortableHandle
        },
        mounted() {
            if (this.$route.params.question) {
                this.elements = JSON.parse(this.metas.meta_value);
                this.correctOrder = JSON.parse(this.rightOrder.answer)
            } else {
                this.correctOrder = this.elements;
            }

        },
        methods: {
            addRows() {
                this.elements.push({
                    id: `${++this.counter}`,
                    option: ''
                }, )
                this.correctOrder = this.elements
            },
            removeRow(index) {
                this.elements.splice(index - 1, 1);
                this.correctOrder.splice(index - 1, 1)
            },
        }
    }

</script>

<style scoped lang="scss">

</style>
