<template>
  <div class="Schedule-container app-container">
    <FullCalendar ref="calendar" :options="calendarOptions" />
    <!-- :dayNamesShort='dayNamesShort' :dayNames='dayNamesShort' axisFormat='HH:mm' timeFormat='HH:mm' -->
    <Form v-if="formVisible" ref="Form" @refreshDataList="refreshDataList" />
  </div>
</template>
<script>
import { AppDayList, AppList, List } from '@/api/extend/schedule'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { calendar } from "@/components/VisualPortal/HSchedule/calendar"
import Form from './Form'
export default {
  name: 'extend-schedule',
  components: {
    FullCalendar,
    Form
  },
  data() {
    return {
      formVisible: false,
      calendarOptions: {},
      startTime: '',
      endTime: '',
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.calendar && this.$refs.calendar.calendar.updateSize()
    })
  },
  methods: {
    init() {
      const that = this
      this.calendarOptions = {
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth', // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        firstDay: 0, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        locale: 'zh-cn', // 切换语言，当前为中文
        eventColor: '#3BB2E3', // 全部日历日程背景色
        themeSystem: 'bootstrap', // 主题色(本地测试未能生效)
        // initialDate: moment().format('YYYY-MM-DD'), // 自定义设置背景颜色时一定要初始化日期时间
        timeGridEventMinHeight: '20', // 设置事件的最小高度
        aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        // displayEventTime: false, // 是否显示时间
        // allDaySlot: false, // 周，日视图时，all-day 不显示
        allDayText: '全天',//设置all-day 标题
        eventLimit: true, // 设置月日程，与all-day slot的最大显示数量，超过的通过弹窗显示
        headerToolbar: { // 日历头部按钮位置
          left: 'prev next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日'
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        eventLimitNum: { // 事件显示数量限制(本地测试未能生效)
          dayGrid: {
            eventLimit: 5
          },
          timeGrid: {
            eventLimit: 2 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        // 事件
        eventClick: this.eventClick,
        dateClick: this.handleDateClick, // 点击日历日程事件
        // eventDblClick: this.handleEventClick, // 双击日历日程事件 (这部分是在源码中添加的)
        // eventClickDelete: this.eventClickDelete, // 点击删除标签事件 (这部分是在源码中添加的)
        // eventDrop: this.eventDrop, // 拖动日历日程事件
        // eventResize: this.eventResize, // 修改日历日程大小事件
        // select: this.handleEventClick, // 选中日历格事件
        // eventDidMount: this.eventDidMount, // 安装提示事件
        // loading: this.loadingEvent, // 视图数据加载中、加载完成触发（用于配合显示/隐藏加载指示器。）
        // selectAllow: this.selectAllow, //编程控制用户可以选择的地方，返回true则表示可选择，false表示不可选择
        // eventMouseEnter: this.eventMouseEnter, // 鼠标滑过
        allowContextMenu: false,
        editable: false, // 是否可以进行（拖动、缩放）修改
        eventStartEditable: false, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
        eventDurationEditable: false, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
        selectable: false, // 是否可以选中日历格
        selectMirror: false,
        selectMinDistance: 0, // 选中日历格的最小距离
        dayMaxEvents: false,
        weekends: true,
        navLinks: false, // 天链接
        selectHelper: false,
        events: [],
        datesSet: this.datesRender,
        slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
        views: {
          //对应月视图
          dayGridMonth: {
            displayEventTime: false,//是否显示时间
            dayCellContent(item) {
              let date = new Date(item.date);  // 参数需要毫秒数，所以这里将秒数乘于 1000
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              let D = date.getDate()
              let date_ = Y + M + D
              let _date = date_.split('-')
              let _dateF = calendar.solar2lunar(_date[0], _date[1], _date[2])
              let myClass = ''
              if (_dateF.isToday) myClass = 'today-month'
              let IDayCn = _dateF.IDayCn
              if (IDayCn == '初一') IDayCn = _dateF.IMonthCn
              return { html: `<p class='calendar-right'><label class='${myClass}'>${_dateF.cDay}</label><span>${IDayCn}</span></p>` }
            },
          },
          //对应周视图调整
          timeGridWeek: {
            // slotMinTime: "09:00",//周视图开始时间
            // slotMaxTime: "20:00",//周视图结束时间
            displayEventTime: false,//是否显示时间
            dayHeaderContent(item) {
              let date = new Date(item.date);  // 参数需要毫秒数，所以这里将秒数乘于 1000
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              let D = date.getDate()
              let date_ = Y + M + D
              let _date = date_.split('-')
              let _dateF = calendar.solar2lunar(_date[0], _date[1], _date[2])
              let myClass = 'calender-week'
              if (_dateF.isToday) myClass = 'calender-week today-week'
              const htmlVal = `<div class='${myClass}'>${_dateF.cDay}</div><div class="list-week"><div>周${_dateF.ncWeek.slice(2)}</div><div class='list-calendar'>${_dateF.IDayCn}</div></div></div>`
              return {
                html: htmlVal
              }
            }
          },
          timeGridDay: {
            // slotMinTime: "09:00",//周视图开始时间
            // slotMaxTime: "20:00",//周视图结束时间
            displayEventTime: false,//是否显示时间
            dayHeaderContent(item) {
              let date = new Date(item.date);  // 参数需要毫秒数，所以这里将秒数乘于 1000
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              let D = date.getDate()
              let date_ = Y + M + D
              let _date = date_.split('-')
              let _dateF = calendar.solar2lunar(_date[0], _date[1], _date[2])
              let myClass = 'calender-week'
              if (_dateF.isToday) myClass = 'calender-week today-week'
              return {
                html: `<div class='${myClass}'>${_dateF.cDay}</div><div class='list-week'><div>周${_dateF.ncWeek.slice(2)}</div><div class='list-calendar'>${_dateF.IDayCn}</div></div></div>`
              }

            }
          }
        },

      }
    },
    datesRender(calendar) {
      let view = calendar.view
      this.startTime = this.jnpf.toDate(view.activeStart, "yyyy-MM-dd HH:mm")
      this.endTime = this.jnpf.toDate(view.activeEnd, "yyyy-MM-dd HH:mm")
      this.initData()
    },
    handleDateClick(arg) {
      let startTime = this.jnpf.toDate(arg.date, "yyyy-MM-dd HH:00"),
        clickTime = this.jnpf.toDate(arg.date, "yyyyMMdd"),
        currTime = this.jnpf.toDate(new Date(), "yyyyMMdd");
      if (clickTime < currTime) return
      if (clickTime == currTime) {
        let thisDate = new Date();
        thisDate.setHours(thisDate.getHours() + 1);
        startTime = this.jnpf.toDate(thisDate, "yyyy-MM-dd HH:00");
      }
      this.addOrUpdateHandle('', startTime)
      this.addOrUpdateHandle('', new Date(startTime).getTime())
    },
    eventClick(data) {
      // if (this.jnpf.toDate(data.event.start, "yyyyMMddHHmm") > this.jnpf.toDate(new Date(), "yyyyMMddHHmm")) {
      this.addOrUpdateHandle(data.event.id)
      // }
    },
    initData() {
      // let query = {
      //   startTime: new Date(this.startTime).getTime(),
      //   endTime: new Date(this.endTime).getTime(),
      // }
      let query = {
        startTime: this.startTime,
        endTime: this.endTime,
      }
      List(query).then(res => {
        this.calendarOptions.events = res.data.list.map(o => ({
          id: o.id,
          title: o.content,
          start: o.startTime,
          end: o.endTime,
          color: o.colour,
          editable: false,
          allDay: false
        }))
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id, startTime) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, startTime)
      })
    },
    refreshDataList() {
      this.formVisible = false
      this.initData()
    }
  }
}
</script>