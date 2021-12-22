<template>
    <div class="readWritefillinBlank">
        <table class="table table-bordered">
            <thead>
                <th>SN</th>
                <th>Option</th>
                <th><a href="" @click.prevent="addRow()" class="btn btn-sm btn-primary pull-right">
                        <i class="fa fa-plus"></i></a></th>
                <th>Action</th>

            </thead>
            <tbody>
                <tr v-for="(element,index) in elements" :key="element.id">
                    <td>{{element.id}}</td>
                    <td>
                        <table class="table table-bordered">
                            <th>Select Options</th>
                            <th>
                                <a href="" @click.prevent="addOptionRow(index)" class="btn-sm btn-primary pull-right"><i
                                        class="fa fa-plus"></i></a>
                            </th>
                            <tbody>
                                <tr v-for="(option,optionIndex) in element.options" :key="optionIndex">
                                    <td>
                                        <input :name="`rwfb_option[${element.id}][]`" tabindex="1" class="form-control"
                                            v-model="option.option" />
                                    </td>
                                    <td>
                                        <a href="" @click.prevent="removeOptionRow(index,optionIndex)"><i
                                                class="fas fa-times"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table class="table table-bordered">
                            <th>Correct Option</th>
                            <tbody>
                                <tr>
                                    <td>
                                        <input name="correct_answer[]" v-model="correct_answer[index]" tabindex="1"
                                            class="form-control" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td><a href="" @click.prevent="removeRow(index)"><i class="fas fa-times"></i></a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            field: {
                required: true
            },
            metas: {
                type: Object,
                required: false,
            },
            rightOrder: {
                type: Object,
                required: false
            }
        },

        data() {
            return {
                correct_answer: [],
                counter: 1,
                optionCouner: 1,
                elements: [{
                    id: 1,
                    options: [{
                        id: 1,
                        option: ''
                    }],
                }],
            }
        },
        mounted() {
            if (this.$route.params.question) {
                this.elements = JSON.parse(this.metas.meta_value);
                const answer = JSON.parse(this.rightOrder.answer);
                answer.forEach(ans => {
                    this.correct_answer.push(ans.answer);
                });
            }
        },
        methods: {
            addRow(e) {
                this.elements.push({
                    id: `${++this.counter}`,
                    options: [{
                        id: `${++this.optionCouner}`,
                        option: ''
                    }],
                })
            },
            addOptionRow(index) {
                this.elements[index].options.push({
                    id: `${++this.optionCouner}`,
                    option: '',
                })

            },
            removeOptionRow(ParentIndex, index) {
                this.$delete(this.elements[ParentIndex].options, index);
            },
            removeRow(index) {
                this.$delete(this.elements, index)
            }

        }

    }

</script>

<style>

</style>
