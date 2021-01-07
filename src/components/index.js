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
import JNPFQuill from '@/components/JNPFEditor/quill'
// 代码生成器专供
import JNPFText from '@/components/Generator/components/JNPFText'
import JNPFAmount from '@/components/Generator/components/Amount'
import JNPFUploadFz from '@/components/Generator/components/Upload/UploadFz' // 代码生成器专用上传附件
import JNPFUploadImg from '@/components/Generator/components/Upload/UploadImg' // 代码生成器专用上传图片
import ComSelect from '@/components/Generator/components/ComSelect'
import DepSelect from '@/components/Generator/components/DepSelect'
import PosSelect from '@/components/Generator/components/PosSelect'
import UserSelect from '@/components/Generator/components/UserSelect'
import DicSelect from '@/components/Generator/components/DicSelect'
import BillRule from '@/components/Generator/components/BillRule'
import JNPFInputTable from '@/components/Generator/components/InputTable'
import JNPFAddress from '@/components/Generator/components/Address'
import GroupTitle from '@/components/Generator/components/GroupTitle'
import RelationForm from '@/components/Generator/components/RelationForm'
import RelationFormAttr from '@/components/Generator/components/RelationFormAttr'
import RelationFlow from '@/components/Generator/components/RelationFlow'
import RelationFlowAttr from '@/components/Generator/components/RelationFlowAttr'
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