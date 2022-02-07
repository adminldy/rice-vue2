<template>
    <div class="rc_select" :style="styleVar" >
        <div class="divSelect" :class="{ 'drop_down': isListShow }" ref="divSelect" >
            <div class="divSelectinput" @click="dropDownSelect">
                <!-- 选中后的内容 -->
                <div class="selectinfos" :title="label" :class="{ 'no_select': label == '请选择' }"> {{ label }} </div>
                <!-- 三角形图标 -->
                <rc-icon icon="arrow-up" v-if="isListShow"></rc-icon>
                <rc-icon icon="arrow-down" v-else></rc-icon>
            </div>
        </div>
        <!-- 下拉框列表 -->
        <transition name="drop-down" >
            <div class="Selectlist" v-show="isListShow" ref="dropDown" :style="listStyle">
                <div class="select_triangle"></div>
                <ul class="rc_option_list">
                    <slot name="rc_option"></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name:'rc-select',
    components: {},
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        width: {
            type: Number,
            default: 180
        },
        height: {
            type: Number,
            default: 40
        },
        listWidth: {
          type: String,
          default: '100%;'
        },
        value: {
          type: [Number, String]
        }
    },
    data() {
        return {
            label: '',
            isListShow: false,
            optionid: ''
        };
    },
    created() {
        this.label = this.placeholder;
    },
    mounted() {
        let _this = this;
        document.addEventListener("click", function( e ){
            if(_this.$refs.divSelect) {
                if ( !!_this.$refs.divSelect.contains(e.target) || !!_this.$refs.dropDown.contains(e.target) ) 
                    return;
                else
                    _this.isListShow = false;
            }   
        })
        // 默认选中
        if(this.value !== undefined) {
          this.optionid = this.value
          console.log(this.optionid)
          for(let i = 0;i < this.$slots['rc_option'].length;i++) {
            console.log(this.$slots['rc_option'][i]['componentOptions']['propsData']['optionid'])
            if(this.$slots['rc_option'][i]['componentOptions']['propsData']['optionid'] === this.optionid) {
              this.label = this.$slots['rc_option'][i]['componentOptions']['propsData']['label']
              break
            }
          }
        }
    },
    computed: {
        // 样式变量
        styleVar() {
            return {
                '--select-height': this.height + 'px',
                '--select-width': this.width + 'px'
            }
        },
        // 列表样式
        listStyle() {
          let style = {}
          if(this.listWidth) {
            style = {
              ...style,
              width: this.listWidth
            }
          }
          return style
        }
    },
    watch: {
      // 监测optionid改变 
      optionid(newVal) {
        this.$emit('change', newVal)
      }
    },
    methods: {
        dropDownSelect() {
            this.isListShow = !this.isListShow;
        },
    },
};
</script>
<style scoped lang="scss">
$height: var(--select-height);
@import '../../styles/icon.css';
    .rc_select {
        border: 1px solid #E6E6E6;
        border-radius: 5px;
        height: var(--select-height);
        width: var(--select-width);
        line-height: var(--select-height);
        position: relative;
    }
    .divSelect {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .rc-icon {
      position: absolute;
      right: 8px;
      top: calc(#{$height} / 2);
      transform: translateY(-50%);
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
    .icon {
       line-height: var(--select-height)
    }
    .drop_down {
      
    }
    .divSelectinput {
        width: calc(100% - 20px);
        height: 100%;
        margin: 0 5px 0 15px;
        display: flex;
    }
    .selectinfos {
        width: 87.5%;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #818285;
    }
    .no_select {
        color: #D3DCE6;
    }

    .Selectlist {
        margin-top: 3px;
        z-index: 800;
        position: relative;
        background-color: #fff;
    }
    .rc_option_list {
        border-radius:5px;
        border:1px solid #E4E7ED;
        padding: 3px 0px;
        box-shadow: 0px 0px 12px #eee;
        background-color: #fff;
        margin: 0;
    }
    .select_triangle {
        width: 14px;
        height: 7px;
        position: relative;
        left: 15px;
    }
    .select_triangle::before {
        position: absolute;
        content: "";
        left: 0px;
        width: 0;
        height: 0;
        border-top: 0px solid transparent;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 8px solid #EBEEF5;
    }
    .select_triangle::after {
        position: absolute;
        left: 2px;
        top: 2px;
        content: "";
        width: 0;
        height: 0;
        border-top: 0px solid transparent;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid #fff;  
    }
    .drop-down-enter {
        opacity: 0;
        transform:translate(0px, -30px) scaleY(0.2);
    }
    .drop-down-leave-to {
        opacity: 0;
        transform:translate(0px, -30px) scaleY(0.2);
    }
    .drop-down-enter-active {
        transition: all 0.2s ease-in;
    }
    .drop-down-leave-active {
        transition: all 0.2s ease;
    }
</style>
