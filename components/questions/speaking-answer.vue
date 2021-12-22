<template>
  <div>
      <div class="form-group" v-if="isSingle">
        <label for="answer">Answer</label>
        <textarea id="answer" cols="30" name="answer" class="form-control"></textarea>
      </div>

      <div v-if="isMultiple">

        <div class="form-group">
          <label for="keywords">Keywords:</label>
          <textarea class="form-control" id="keywords" name="keywords" cols="30"></textarea>
        </div>

        <div id="repeat" class="card">
              
          <div class="card-header">
            Answer <button class="btn btn-info btn-sm mx-5" @click.prevent="add" title="Add Answer"><i class="fa fa-plus"></i></button>
          </div>
          <div class="card-body">
            <div class="form-group ans" v-for="n in count" :key="n" :id="'answer'+n">
              <label for="answer">Answer:</label>
              <button class="btn btn-danger btn-sm" v-if="ansCount>1" @click.prevent="remove"><i class="fa fa-times"></i></button>
              <textarea class="form-control" id="answer" name="answer[]" placeholder="Answer here..." cols="30"></textarea>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
  export default {
    props:{
      field:{type:Object},
    },
    data() {
      return {
        count: 1,
        ansCount: 1,
      }
    },
    methods: {
      remove(e){
        let answer = e.target.parentElement;
        if(answer && answer.classList.contains('ans')){
          answer.outerHTML = '';
          this.ansCount = document.querySelectorAll('.ans').length;
        }
      },
      add(){
        this.count++;
        setTimeout(() => {
          this.ansCount = document.querySelectorAll('.ans').length;
        }, 0);
      }
    },
    computed: {
      isSingle: function(){
        return (this.field.slug === 'repeat-sentence') || (this.field.slug === 'answer-short-question');
      },
      isMultiple: function(){
        return (this.field.slug === 'describe-image') || (this.field.slug === 're-tell-lecture');
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>

</style>