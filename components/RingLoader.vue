<template>
    <div :class="{'loader': loading}" :disabled="loading" :loading="loading"></div>
</template>
<script>
    export default {
       name: "VueLoaderButton",
        props: {
            loading: {
            type: Boolean,
            required: false,
            default: true,
            },
        }
}
</script>
<style scoped>
.loader {
display: flex;
align-items: center;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 0.8s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 45%;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>