<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/index">Go to index</router-link>

    <h2>Essential Links</h2>
    <mt-button @click.native="handleClick">toast</mt-button>
    <ul>
      <li>list</li>
    </ul>
    <mt-button @click.native="apiGet">apiGet</mt-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'HelloWorld'
    }
  },
  methods: {
    handleClick: function() {
      this.$toast('Hello world!')
    },
    apiGet() {
      this.$http.get('/api/ProdSort/gh_6297f82da259').then(res => {
        console.log(JSON.parse(res.data))
        // this.msg = res.data.msg;
        // success callback
      }, res => {
        // error callback
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  // border: 1px solid red;
  ul>li {
    border: 1px solid red;
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
