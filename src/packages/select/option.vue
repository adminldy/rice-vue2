<template>
  <li class="rc_option" :style="styleVar" @click="currentSelect">
    <slot>
      <div class="rc_option_dropdown_item">{{ label }}</div>
    </slot>
  </li>
</template>

<script>
export default {
  name: "rc-option",
  components: {},
  props: {
    width: {
      type: Number,
      default: -1,
    },
    height: {
      type: Number,
      default: 34,
    },
    label: {
      type: String,
    },
    optionid: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    styleVar() {
      return {
        "--option-height": this.height + "px",
        "--option-width": this.width == -1? "100%" : this.width + "px",
      };
    },
  },
  methods: {
    currentSelect() {
      this.$parent.label = this.label;
      this.$parent.optionid = this.optionid;
      this.$parent.isListShow = !this.$parent.isListShow;
      // this.$emit('slot-content', {label: this.label, optionid: this.optionid} );
    }
  },
};
</script>
<style scoped>
.rc_option {
  list-style: none;
  width: var(--option-width);
  color: #686A6D;
}
.rc_option:hover {
  color: #ff6362;
  background-color: #f5f7fa;
}
.rc_option_dropdown_item {
  height: 100%;
  width: calc(100% - 30px);
  line-height: var(--option-height);
  cursor: pointer;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
