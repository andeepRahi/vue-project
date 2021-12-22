<template>
   <section class="content-header">
      <div class="container-fluid no-padding">
        <div class="row mb-2 ">
          <div class="col-sm-6">
            <h5 v-if=set>{{set.question_set_name}}
              <i class="fa fa-angle-double-right"></i> {{title}}</h5>
            <h5 v-else>All  {{title}}</h5>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="">Home</a></li>
              <li class="breadcrumb-item" v-if="subTitle"><a href="">{{subTitle}}</a></li>
              <li class="breadcrumb-item active">{{title}}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  props:{
    title:{type:String},
    subTitle:{type:String},
    set:{type:Object}
  }

}
</script>

<style>
.no-padding{
  padding-left:0;
  padding-right:0
}

</style>
