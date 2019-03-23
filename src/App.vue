<template>
  <div id="app">
    <router-view :sortNames="sortNames" />
  </div>
</template>

<script>
  const apiurl = '/api/sub-categories'

  export default {
      name:'app',
      data(){
          return{
              sortNames:[],
          };
      },
      created(){
          this.axios.get(apiurl).then(response => {
              for(var i in response.data.male) {
                  this.sortNames.push(response.data.male[i].major);
              }
          },err => {
              alert(err);
          });
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
#app {
  width: 100%;
  height: 100%;
  color: #999;
  /*font-size: 0;*/
}
</style>
