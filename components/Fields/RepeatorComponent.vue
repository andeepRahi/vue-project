<template>
    <div>
        <MultipleChoiceQuestion v-if="isMultipleChoiceQuestion" :field=field :metas="metas"></MultipleChoiceQuestion>
        <ReorderParagraph v-if="isReorderParagraph" :field=field :metas="metas" :right-order=correctAnswered ></ReorderParagraph>
        <ReadWriteFillinBlank v-if="isReadingMulitpleFillinBlank" :field=field :right-order=correctAnswered :metas="metas" ></ReadWriteFillinBlank>
        <ReadFillinBlank v-if="isReadingFillinBlank" :field=field :metas="metas" :right-order=correctAnswered></ReadFillinBlank>
    </div>
</template>

<script>
import MultipleChoiceQuestion from './../../components/Fields/Repeator/MultipleChoiceQuestion.vue';
import ReorderParagraph from './../../components/Fields/Repeator//ReorderParagraph.vue';
import ReadWriteFillinBlank from './../../components/Fields/Repeator/ReadWriteFillinBlank.vue';
import ReadFillinBlank from './../../components/Fields/Repeator/ReadFillinBlank.vue';
    export default {
        props: {
            isUpdate: {
                type: Boolean
            },
            field: {
                type: Object,
                required: true
            },
            metas: {
                type: Object,
                required: false,
            },
            correctAnswered: {
                type: Object,
                required: false,
            },
        },
        components: {
            ReadWriteFillinBlank,
            ReadFillinBlank,
            MultipleChoiceQuestion,
            ReorderParagraph,
        },
        computed: {
            isMultipleChoiceQuestion: function () {
                return this.field.slug === 'mccsa' 
                || this.field.slug === 'mccma' 
                || this.field.slug === 'smw' 
                || this.field.slug === 'hcs' 
                || this.field.slug === 'lmccsa' 
                || this.field.slug === 'lmccma';
            },
            isReorderParagraph: function () {
                return this.field.slug === 'rop';
            },
            isReadingFillinBlank: function () {
                return this.field.slug === 'rfb';
            },
            isReadingMulitpleFillinBlank: function () {
                return this.field.slug === 'rwfb';
            }
        },
    }

</script>
