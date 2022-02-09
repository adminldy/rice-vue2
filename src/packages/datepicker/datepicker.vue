<template>
  <div class="rc-date-picker" v-click-outside="handleBlur">
    <rc-input
      suffix-icon="rili"
      @focus="handleFocus"
      :value="formateDate"
      @change="handleChange"
    ></rc-input>
    <div class="rc-date-content" v-if="isVisible">
      <div class="rc-date-picker-content">
        <template v-if="mode === 'dates'">
          <div class="rc-date-picker-header">
            <rc-icon icon="double-left" @click="changeYear(-1)"></rc-icon>
            <rc-icon icon="arrow-left" @click="changeMonth(-1)"></rc-icon>
            <span>
              <b @click="mode = 'years'">{{ tempTime.year }}</b> 年
              <b @click="mode = 'months'">{{ tempTime.month + 1 }}</b> 月
            </span>
            <rc-icon icon="arrow-right" @click="changeMonth(1)"></rc-icon>
            <rc-icon icon="double-right" @click="changeYear(1)"></rc-icon>
          </div>
          <div>
            <span v-for="week in weeks" :key="week" class="cell">{{
              week
            }}</span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span
              v-for="j in 7"
              :key="`col_${j}`"
              @click="selectDate(getCurrentDate(i, j))"
              class="cell cell-dates"
              :class="{
                isNotCurrentMonth: !isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isSelect: isSelect(getCurrentDate(i, j)),
              }"
            >
              {{ getCurrentDate(i, j).getDate() }}
            </span>
          </div>
        </template>
        <template v-if="mode === 'years'">
          <div class="rc-date-picker-header">
            <rc-icon icon="arrow-left" @click="changeYear(-10)"></rc-icon>
            <span><b>{{ startYear }}年-{{ startYear+9 }}</b> 年</span>
            <rc-icon icon="arrow-right" @click="changeYear(10)"></rc-icon>
          </div>
          <div>
            <span v-for="year in years" :key="year" class="yearCell" :class="{isYear: isYear(year)}" @click="yearClick(year)">{{
              year
            }}</span>
          </div>
        </template>
        <template v-if="mode === 'months'"> 
          <div class="rc-date-picker-header">
            <rc-icon icon="arrow-left" @click="changeYear(-1)"></rc-icon>
            <span><b>{{tempTime.year}}</b></span>
            <rc-icon icon="arrow-right" @click="changeYear(1)"></rc-icon>
          </div>
          <div v-for="(month, index) in months" :key="month" class="monthCell" :class="{isMonth: isMonth(index)}" @click="monthClick(index)">{{
            month
          }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate(); // 获取日期的getDay
  return [year, month, day];
}
import clickOutside from 'v-click-outside'
export default {
  name: "rc-date-picker",
  directives: {
    // 可以判断点击的是否是自己内部元素
    clickOutside: clickOutside.directive
  },
  props: {
    value: {
      type: [String, Date],
      default: () => new Date(),
    },
  },
  computed: {
    formateDate() {
      // 根据当前time对象， 算出来一个日期格式
      if (this.value) {
        // 控制输入框中的内容
        let { year, month, day } = this.time;
        return `${year}-${(month + 1 + "").padStart(2, 0)}-${(
          day + ""
        ).padStart(2, 0)}`;
      }
    },
    visibleData() {
      // <!-- 将自己向前移动多少天后 开始循环42天 -->
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay(); // 周日0 周六6 tempTime
      weekDay = weekDay === 0 ? 7 : weekDay;
      // 向前移动七天
      let start = firstDay - (weekDay - 1) * 60 * 60 * 24 * 1000;
      let arr = []; // 循环42个
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    startYear() {
      this.years = []
      let startYear = this.tempTime.year - this.tempTime.year % 10
      for(let i = startYear;i <= startYear + 9;i++) {
        this.years.push(i)
      }
      return startYear
    }
  },
  data() {
    // 只执行一次
    // 我需要通过用户传入的value 算出一个年月日来
    let [year, month, day] = getYearMonthDay(this.value || new Date()); // 根据当前的时间算出一个年月日
    return {
      isVisible: false,
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      years: [],
      mode: "dates", // years || months
      time: {
        // 现实的时间
        year,
        month,
        day,
      },
      tempTime: {
        // 要操作的时间
        year,
        month,
        day,
      },
    };
  },
  methods: {
    handleFocus() {
      // 当点击的是输入框的时候， 就让浮层显示出来
      this.isVisible = true;
    },
    handleBlur() {
      // 当点击整个div外侧时， 需要隐藏弹层
      this.isVisible = false;
      this.mode = 'dates'
    },
    getCurrentDate(i, j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)];
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime; // 取出来当前用户选的是哪年哪月
      let [y, m] = getYearMonthDay(date);
      return year === y && m === month; // 判断当前年月是否相等
    },
    // 是否是今天
    isToday(date) {
      let [y, m, d] = getYearMonthDay(date);
      let [year, month, day] = getYearMonthDay(new Date());
      return year === y && month === m && day === d;
    },
    isYear(years) {
      let [year] = getYearMonthDay(new Date());
      console.log('isYear')
      return year === years
    },
    isMonth(months) {
      console.log(`isMonth`)
      let [year, month, day] = getYearMonthDay(new Date())
      return year === this.tempTime.year && month === months
    },
    selectDate(date) {
      // 选择日期
      this.$emit("input", date);
      this.handleBlur(); // 隐藏content对话框
    },
    // 选中的日期高亮
    isSelect(date) {
      let { year, month, day } = this.time; // 当前选中的年月日
      let [y, m, d] = getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    // 更改年月 让系统自己算
    changeMonth(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      let [year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    },
    handleChange(e) {
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        // 更新输入框内容
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.target.value = this.formateDate;
      }
      this.handleBlur();
    },
    yearClick(year) {
      this.tempTime.year = year
      this.mode = 'months'
    },
    monthClick(month) {
      this.tempTime.month = month
      this.mode = 'dates'
    }
  },
  watch: {
    value(newValue) {
      // 根据最新的value 来更新 this.time / this.tempTime
      let [year, month, day] = getYearMonthDay(newValue);
      this.time = {
        year,
        month,
        day,
      };
      this.tempTime = { ...this.time };
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/_var.scss";
.rc-date-picker {
  border: 1px solid red;
  display: inline-block;
  .rc-date-picker-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rc-date-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
  }
  .cell {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-weight: 400;
  }
  .yearCell, .monthCell {
    width: 70px;
    height: 70px;
    display: inline-block;
    text-align: center;
    line-height: 70px;
    font-weight: 400;
  }
}
.isNotCurrentMonth {
  color: #ccc;
}
.cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
  color: $primary;
}
.isSelect {
  color: #fff;
  background: $primary;
  border-radius: 50%;
}
.isToday, .isYear, .isMonth {
  color: $primary;
  background: #fff;
}

</style>