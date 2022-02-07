<template>
  <div class="rc-input" :class="inputClass">
    <rc-icon :icon="prefixIcon" v-if="prefixIcon"></rc-icon>
    <input 
      ref="input" 
      :type="showPassword? (passwordVisible ? 'text' : 'password') : type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @change="$emit('change', $event)"
    />
    <rc-icon :icon="suffixIcon" v-if="suffixIcon" @click.native="clickPrev" @mousedown.native.prevent></rc-icon>
    <rc-icon icon="qingkong" v-if="clearable && value" @click.native="$emit('input', '')" @mousedown.native.prevent></rc-icon>
    <rc-icon icon="eye" v-if="showPassword && value" @click.native="changeStatus" @mousedown.native.prevent></rc-icon>
  </div>
</template>

<script>
export default {
  name: 'rc-input',
  props: {
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      passwordVisible: false
    }
  },
  methods: {
    changeStatus() {
      this.passwordVisible = !this.passwordVisible
      this.$nextTick(() => {
        this.$refs['input'].focus()
      })
    },
    clickPrev() {
      this.$nextTick(() => {
        this.$refs['input'].focus()
      })
    }
  },
  computed: {
    inputClass() {
      let classes = []
      let {clearable, showPassword, suffixIcon, prefixIcon} = this
      if(clearable || showPassword || suffixIcon) {
        classes.push(`rc-input-suffix-icon`)
      }
      if(prefixIcon) {
        classes.push('rc-input-prefix-icon')
      }
      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_var.scss';
.rc-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
}
.rc-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .rc-icon {
    position: absolute;
    right: 8px;
    top: 13px;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}

.rc-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .rc-icon {
    position: absolute;
    left: 8px;
    top: 13px;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
</style>
