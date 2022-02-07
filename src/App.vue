<template>
  <div id="app">
    <!-- 语法糖的绑定 -->
    {{value1}}
    <br />
    <rc-date-picker v-model="value1"></rc-date-picker>
    <!-- {{value2}}
    <rc-date-range-picker v-model="value2"></rc-date-range-picker> -->
    <!-- <rc-select :height="100"></rc-select>
    <rc-input v-model="username" type="text" placeholder="请输入内容" name="username" clearable /> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value1: new Date(),
      value2: [],
      username: '123',
      optionData: [{
        label: 'test1',
        optionid: '1'
      }, {
        label: 'test2',
        optionid: '2'
      }]
    }
  }
}
</script>

<style lang="scss">

</style>
