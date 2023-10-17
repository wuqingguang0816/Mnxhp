import dayjs from "dayjs";


/** 全局变量
 * shortcuts 日期
 */
export const pickerOptions = {
  shortcuts: [
    {
      text: "今日",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: "本周",
      onClick(picker) {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
        picker.$emit('pick', [startOfWeek, endOfWeek])
      }
    },
    {
      text: "本月",
      onClick(picker) {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        picker.$emit('pick', [startOfMonth, endOfMonth])
      }
    },

    {
      text: "上周",
      onClick(picker) {
        const today = new Date();
        const startOfLastWeek = new Date(today);
        startOfLastWeek.setDate(
          startOfLastWeek.getDate() - startOfLastWeek.getDay() - 7
        );
        const endOfLastWeek = new Date(today);
        endOfLastWeek.setDate(
          endOfLastWeek.getDate() - endOfLastWeek.getDay() - 1
        );
        picker.$emit('pick', [startOfLastWeek, endOfLastWeek])
      }
    },
    {
      text: "本季度",
      onClick(picker) {
        const today = new Date();
        const startOfQuarter = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          1
        );
        const endOfQuarter = new Date(
          startOfQuarter.getFullYear(),
          startOfQuarter.getMonth() + 3,
          0
        );

        picker.$emit('pick', [startOfQuarter, endOfQuarter])
      }
    },
    {
      text: "本年",
      onClick(picker) {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
        picker.$emit('pick', [firstDayOfYear, lastDayOfYear])
      }
    },
    {
      text: "上月",
      onClick(picker) {
        const today = new Date();
        const startOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        picker.$emit('pick', [startOfLastMonth, endOfLastMonth])
      }
    },
    {
      text: "前3个月",
      onClick(picker) {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        const end = new Date(today.getFullYear(), today.getMonth(), 0);
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: "上季度",
      onClick(picker) {
        const today = new Date();
        const firstMonthOfLastQuarter = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          1
        ).getMonth();
        // 计算上季度的最后一个月份
        const lastMonthOfLastQuarter = firstMonthOfLastQuarter + 2;
        const stareOfLastMonth = new Date(
          today.getFullYear(),
          firstMonthOfLastQuarter - 1,
          1
        );
        const endOfLastMonth = new Date(
          today.getFullYear(),
          lastMonthOfLastQuarter,
          0
        );
        picker.$emit('pick', [stareOfLastMonth, endOfLastMonth])
      }
    },
    {
      text: "上年",
      onClick(picker) {
        const today = new Date();
        const lastYearStartDate = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEndDate = new Date(today.getFullYear() - 1, 11, 31);
        picker.$emit('pick', [lastYearStartDate, lastYearEndDate])
      }
    }
  ]
}
/** 全局变量
 * defaultTime 默认的起始与结束时刻 今年
 */
export function defaultTime() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
  // dayjs(firstDayOfYear).format("YYYY-MM-DD");
  return [
    dayjs(firstDayOfYear).format("YYYY-MM-DD"),
    dayjs(lastDayOfYear).format("YYYY-MM-DD")
  ];
}
/**
 * todayTime() 默认当天
 */
export function todayTime() {
  const now = new Date();
  const year = now.getFullYear().toString(); // 获取当前年份后两位，如23
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 获取当前月份并用0填充，如05
  const day = now.getDate().toString().padStart(2, "0"); // 获取当前日期并用0填充，如09
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
/**
 * todayTime() 默认当天[2023-08-16,2023-08-16]
 */
export function todays(format = "YYYY-MM-DD") {
  return [dayjs().format(format), dayjs().format(format)];
}

export function addDayjs(num, type, format = "YYYY-MM-DD") {
  // 获取当前日期
  const currentDate = dayjs();
  if (type == "add") {
    // 计算未来几月的日期
    const futureDate = currentDate.add(num, "months").format(format);
    return [currentDate.format(format), futureDate];
  } else {
    // 计算过去几月的日期
    const pastDate = currentDate.subtract(num, "months").format(format);
    return [pastDate, currentDate.format(format)];
  }
}

// 返回当月前几个月--后几个月
export function DayjsList(num, num2, format = "YYYY-MM-DD") {
  const currentDate = dayjs();
  const pastDate = currentDate.subtract(num, "months").format(format);
  const futureDate = currentDate.add(num2, "months").format(format);
  return [pastDate, futureDate];
}

// 返回当月第一天 timestamp毫秒数
export function getMonthFrist(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const d = new Date(year, month, 1);
  const day = d * 1;
  return dayjs(day).format("YYYY-MM-DD");
}
// 返回当月最后一天 timestamp毫秒数
export function getMonthLast(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  // day为0表示获取上一个月最后一天，所以month+1
  // 86300表示一天秒数，最后日期为 23:59:59
  const d = new Date(year, month + 1, 0);
  const day = (d / 1000 + 86399) * 1000;
  return dayjs(day).format("YYYY-MM-DD");
}

//
/**
 * getyesterday() 前一天
 * time 前面几天
 */
export function getyesterday(time) {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000 * time);
  const year = yesterday.getFullYear();
  let month = yesterday.getMonth() + 1;
  let day = yesterday.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const yesterdays = `${year}-${month}-${day}`;
  return yesterdays;
}
