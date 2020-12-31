import JNPFTreeSelect from '@/components/JNPF-treeSelect'
import topOperation from '@/components/JNPF-topOperation/index'
import tableOperation from '@/components/JNPF-tableOperation'
import Pagination from '@/components/Pagination'
import JNPFTable from '@/components/JNPF-table'
import UserBox from '@/components/JNPF-userBox'
import UploadFile from '@/components/Upload/UploadFile'
import UploadFileSingle from '@/components/Upload/UploadFileSingle'
import SingleImg from '@/components/Upload/SingleImg'
import Screenfull from '@/components/Screenfull'
import ColumnSettings from '@/components/ColumnSettings'
// 代码生成器专供
import JNPFText from '@/components/Generator/JNPF-Text'
import JNPFAmount from '@/components/Generator/Amount'
import JNPFUploadFz from '@/components/Generator/Upload/UploadFz' // 代码生成器专用上传附件
import JNPFUploadImg from '@/components/Generator/Upload/UploadImg' // 代码生成器专用上传图片
import ComSelect from '@/components/Generator/ComSelect'
import DepSelect from '@/components/Generator/DepSelect'
import PosSelect from '@/components/Generator/PosSelect'
import UserSelect from '@/components/Generator/UserSelect'
import DicSelect from '@/components/Generator/DicSelect'
import BillRule from '@/components/Generator/BillRule'
import JNPFInputTable from '@/components/Generator/InputTable'
import JNPFAddress from '@/components/Generator/Address'
import GroupTitle from '@/components/Generator/GroupTitle'
import RelationForm from '@/components/Generator/RelationForm'
import RelationFormAttr from '@/components/Generator/RelationFormAttr'
import RelationFlow from '@/components/Generator/RelationFlow'
import RelationFlowAttr from '@/components/Generator/RelationFlowAttr'
import JNPFQuill from '@/components/JNPFEditor/quill'
// 门户设计专供
import PortalLayout from '@/components/VisualPortal/Layout'
import Todo from '@/components/VisualPortal/Todo'
import CommonFunc from '@/components/VisualPortal/CommonFunc'
import TodoList from '@/components/VisualPortal/TodoList'
import HNotice from '@/components/VisualPortal/HNotice'
import HEmail from '@/components/VisualPortal/HEmail'
import DataBoard from '@/components/VisualPortal/DataBoard'
import HBarChart from '@/components/VisualPortal/HBarChart'
import HAnnularChart from '@/components/VisualPortal/HAnnularChart'
import HAreaChart from '@/components/VisualPortal/HAreaChart'
import HLineChart from '@/components/VisualPortal/HLineChart'
import HPieChart from '@/components/VisualPortal/HPieChart'
import HRadarChart from '@/components/VisualPortal/HRadarChart'
export default {
  install(Vue, options) {
    Vue.component('JNPFTreeSelect', JNPFTreeSelect)
    Vue.component('topOpts', topOperation)
    Vue.component('tableOpts', tableOperation)
    Vue.component('Pagination', Pagination)
    Vue.component('JNPFTable', JNPFTable)
    Vue.component('UploadFile', UploadFile)
    Vue.component('UploadFileSingle', UploadFileSingle)
    Vue.component('SingleImg', SingleImg)
    Vue.component('UserBox', UserBox)
    Vue.component('JNPFText', JNPFText)
    Vue.component('JNPFAmount', JNPFAmount)
    Vue.component('JNPFUploadFz', JNPFUploadFz)
    Vue.component('JNPFUploadImg', JNPFUploadImg)
    Vue.component('ComSelect', ComSelect)
    Vue.component('DepSelect', DepSelect)
    Vue.component('PosSelect', PosSelect)
    Vue.component('UserSelect', UserSelect)
    Vue.component('DicSelect', DicSelect)
    Vue.component('BillRule', BillRule)
    Vue.component('JNPFInputTable', JNPFInputTable)
    Vue.component('JNPFAddress', JNPFAddress)
    Vue.component('GroupTitle', GroupTitle)
    Vue.component('RelationForm', RelationForm)
    Vue.component('RelationFormAttr', RelationFormAttr)
    Vue.component('RelationFlow', RelationFlow)
    Vue.component('RelationFlowAttr', RelationFlowAttr)
    Vue.component('JNPFQuill', JNPFQuill)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ColumnSettings', ColumnSettings)
    Vue.component('PortalLayout', PortalLayout)
    Vue.component('Todo', Todo)
    Vue.component('CommonFunc', CommonFunc)
    Vue.component('TodoList', TodoList)
    Vue.component('HNotice', HNotice)
    Vue.component('HEmail', HEmail)
    Vue.component('DataBoard', DataBoard)
    Vue.component('HBarChart', HBarChart)
    Vue.component('HAnnularChart', HAnnularChart)
    Vue.component('HAreaChart', HAreaChart)
    Vue.component('HLineChart', HLineChart)
    Vue.component('HPieChart', HPieChart)
    Vue.component('HRadarChart', HRadarChart)
  }
}