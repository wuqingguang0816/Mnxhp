
<template>
  <el-drawer size="550px" class="drawer JNPF-common-drawer" :visible.sync="visible" @close="cancel"
    v-if="properties" append-to-body :wrapperClosable="false">
    <!-- 标题 -->
    <header slot="title" class="header"
      v-if="value && (value.type=='condition'|| value.type=='approver' || value.type=='subFlow' )">
      <el-input size="mini" v-model="properties.title" style="z-index:9;max-width: 200px;"
        placeholder="请输入">
      </el-input>
    </header>
    <header slot="title" class="header" v-else>{{properties.title}}</header>

    <!-- 条件  -->
    <section class="condition-pane pd-10" v-if="value && isConditionNode()">
      <el-row class="condition-list">
        <el-col :span="6" class="label">字段名称</el-col>
        <el-col :span="5">比较</el-col>
        <el-col :span="6">数据值</el-col>
        <el-col :span="5">逻辑</el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <template v-for="(item, index) in pconditions">
        <el-row class="condition-list" :key="index">
          <el-col :span="6" class="label">
            <el-select v-model="item.field" placeholder="请选择"
              @change="fieldNameChange($event,item)">
              <el-option v-for="item in usedFormItems" :key="item.__vModel__"
                :label="item.__config__.label" :value="item.__vModel__">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.symbol" placeholder="请选择" @change="symbolChange($event,item)">
              <el-option v-for="item in symbolOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="item.filedValue" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.logic" placeholder="请选择" @change="logicChange($event,item)">
              <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <i class="el-icon-delete" style="cursor: pointer;" @click="onDelCondition(index)"></i>
          </el-col>
        </el-row>
      </template>
      <div style="padding-left:4px;margin-top:10px;">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addCondition()">添加条件
        </el-button>
      </div>
    </section>

    <!-- 定时器  -->
    <section class="condition-pane pd-10" v-if="value && isTimerNode()">
      <el-row>
        <el-col :span="24" style="font-size: 14px;line-height:32px;color: #a5a5a5;">
          添加定时器后，审批节点将根据设置的时间流转</el-col>
        <el-col :span="24">
          <el-form label-position="top">
            <el-form-item label="时间设置">
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.day" :precision="0" />
                <span>天</span>
              </div>
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.hour" :precision="0" />
                <span>小时</span>
              </div>
              <div class="mb-10">
                <el-input-number :min="0" v-model="properties.minute" :precision="0" />
                <span>分钟</span>
              </div>
              <div>
                <el-input-number :min="0" v-model="properties.second" :precision="0" />
                <span>秒</span>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>

    <!-- 子流程  -->
    <section class="condition-pane pd-10" v-if="value && isSubFlowNode()">
      <el-form label-position="top" :model="subFlowForm">
        <el-form-item label="审批设置">
          <el-radio-group v-model="subFlowForm.initiateType">
            <el-radio :label="i+1" v-for="(item,i) in initiateTypeOptions" :key="i">{{item}}
            </el-radio>
          </el-radio-group>
          <div v-if="subFlowForm.initiateType === 1" class="option-box-tip">
            所指定的成员将作为子流程发起人，多人时，发起多个子流程</div>
          <div v-if="subFlowForm.initiateType === 2" class="option-box-tip">
            发起人的部门主管将作为子流程发起人</div>
          <div v-if="subFlowForm.initiateType === 3" class="option-box-tip">
            发起人的主管将作为子流程发起人</div>
          <div v-if="subFlowForm.initiateType === 4" class="option-box-tip">
            发起人自己将作为子流程发起人</div>
        </el-form-item>
        <el-form-item v-if="subFlowForm.initiateType === 1">
          <org-select ref="subFlow-role-org" type="role" v-model="subFlowForm.initiateRole"
            title="添加角色" class="mb-10" buttonType="button" />
          <org-select ref="subFlow-position-org" buttonType="button"
            v-model="subFlowForm.initiatePos" title="添加岗位" type="position" class="mb-10" />
          <org-select ref="subFlow-user-org" buttonType="button" v-model="subFlowForm.initiator"
            title="添加用户" />
        </el-form-item>
        <el-form-item label="发起人的" v-if="subFlowForm.initiateType === 3">
          <el-select v-model="subFlowForm.managerLevel">
            <el-option v-for="item in 10" :key="item" :label="item===1?'直接主管':'第'+item+'级主管'"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子流程表单">
          <JNPF-TreeSelect :options="flowOptions" v-model="subFlowForm.flowId"
            placeholder="请选择子流程表单" lastLevel clearable @change="subFlowForm.assignList=[]" />
        </el-form-item>
        <el-form-item label="数据传递">
          <div @click="openRuleBox">
            <el-input :value="subFlowForm.assignList.length?'已设置':''" placeholder="请设置数据传递规则"
              suffix-icon="el-icon-arrow-down" readonly />
          </div>
        </el-form-item>
        <el-form-item label="通知设置">
          <el-checkbox-group v-model="subFlowForm.messageType">
            <el-checkbox :label="1">站内信</el-checkbox>
            <el-checkbox :label="2">邮箱</el-checkbox>
            <el-checkbox :label="3">短信</el-checkbox>
            <el-checkbox :label="4">钉钉</el-checkbox>
            <el-checkbox :label="5">企业微信</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </section>

    <!-- 发起人 -->
    <section class="approver-pane" v-if="value && isStartNode()">
      <el-tabs style="height:100%;">
        <el-tab-pane label="发起人">
          <el-row class="pd-10">
            <el-col :span="4" style="font-size: 14px;line-height:32px">谁可以发起</el-col>
            <el-col :span="20" style="font-size: 14px;line-height:32px;margin-bottom:10px">
              默认所有人,需要设置请选择
            </el-col>
            <div class="option-box">
              <org-select ref="start-role-org" type="role" v-model="initiateRole" title="添加角色"
                class="mb-10" buttonType="button" />
              <org-select ref="start-position-org" type="position" v-model="initiatePos"
                title="添加岗位" class="mb-10" buttonType="button" />
              <org-select ref="start-user-org" type="user" v-model="initiator" title="添加用户"
                buttonType="button" />
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="表单权限" name="formAuth">
          <div class="form-auth-table">
            <el-table :data="getFormOperates()" class="JNPF-common-table" size="mini">
              <el-table-column prop="name" label="表单字段" align="left"></el-table-column>
              <el-table-column prop="write" label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.read">可见</el-checkbox>
                  <el-checkbox v-model="scope.row.write">可写</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流程事件">
          <el-form label-position="top" class="pd-10">
            <el-alert type="warning" :closable="false">
              <div slot="title" class="tips">
                <p>请求方式：GET</p>
                <p>请求参数：taskId、taskNodeId</p>
              </div>
            </el-alert>
            <el-form-item label="自定义发起事件">
              <el-switch v-model="properties.hasInitFunc" />
            </el-form-item>
            <template v-if="properties.hasInitFunc">
              <el-form-item label="发起事件请求路径">
                <el-input v-model="properties.initInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义结束事件">
              <el-switch v-model="properties.hasEndFunc" />
            </el-form-item>
            <template v-if="properties.hasEndFunc">
              <el-form-item label="结束事件请求路径">
                <el-input v-model="properties.endInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义撤回事件">
              <el-switch v-model="properties.hasFlowRecallFunc" />
            </el-form-item>
            <template v-if="properties.hasFlowRecallFunc">
              <el-form-item label="撤回事件请求路径">
                <el-input v-model="properties.flowRecallInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- 审批人 -->
    <section class="approver-pane" v-if="value && isApproverNode()">
      <el-tabs v-model="activeName" style="height:100%;">
        <el-tab-pane label="基础设置" name="config">
          <el-form label-position="top" :model="approverForm" class="pd-10">
            <el-form-item label="审批设置">
              <el-radio-group v-model="approverForm.assigneeType" @change="resetOrgColl">
                <el-radio v-for="item in assigneeTypeOptions" :label="item.value" :key="item.value"
                  :disabled="item.disabled" class="radio-item">{{item.label}}
                </el-radio>
              </el-radio-group>
              <div v-if="approverForm.assigneeType === 1" class="option-box-tip">
                发起人主管将作为审批人处理审批单</div>
              <div v-if="approverForm.assigneeType === 2" class="option-box-tip">
                发起人的部门主管将作为审批人处理审批单</div>
              <div v-if="approverForm.assigneeType === 3" class="option-box-tip">
                发起人自己将作为审批人处理审批单</div>
              <div v-if="approverForm.assigneeType === 4" class="option-box-tip">
                选择流程表单字段的值作为审批人</div>
              <div v-if="approverForm.assigneeType === 5" class="option-box-tip">
                设置审批人为审批流程中某个环节的审批人</div>
              <div v-if="approverForm.assigneeType === 6" class="option-box-tip">
                任何一个审批人有审批操作，则节点审批完成</div>
              <div v-if="approverForm.assigneeType === 8" class="option-box-tip">
                无序会签，当审批达到会签比例时，则该审批通过，一人不同意则驳回</div>
              <div v-if="approverForm.assigneeType === 9" class="option-box-tip">
                通过第三方调用从目标服务中获取审批人</div>
              <el-alert type="warning" :closable="false" v-if="approverForm.assigneeType === 9">
                <div slot="title" class="tips">
                  <p>请求方式：GET</p>
                  <p>请求参数：taskId、taskNodeId</p>
                </div>
              </el-alert>
            </el-form-item>
            <el-form-item label="发起人的" v-if="approverForm.assigneeType === 1">
              <el-select v-model="approverForm.managerLevel">
                <el-option v-for="item in 10" :key="item" :label="item===1?'直接主管':'第'+item+'级主管'"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表单字段" v-if="approverForm.assigneeType === 4">
              <el-select v-model="approverForm.formField" placeholder="请选择字段">
                <el-option v-for="item in usedFormItems" :key="item.__vModel__"
                  :label="item.__config__.label" :value="item.__vModel__">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审批节点" v-if="approverForm.assigneeType === 5">
              <el-select v-model="approverForm.nodeId" placeholder="请选择节点">
                <el-option v-for="item in nodeOptions" :key="item.nodeId"
                  :label="item.properties.title" :value="item.nodeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请求路径" v-if="approverForm.assigneeType === 9">
              <el-input v-model="approverForm.getUserUrl" placeholder="请输入接口路径"></el-input>
            </el-form-item>
            <el-form-item v-if="approverForm.assigneeType === 6|| approverForm.assigneeType === 8">
              <org-select ref="approver-role-org" type="role" v-model="approverForm.approverRole"
                title="添加角色" class="mb-10" buttonType="button" />
              <org-select ref="approver-position-org" buttonType="button"
                v-model="approverForm.approverPos" title="添加岗位" type="position"
                @change="onOrgChange" class="mb-10" />
              <org-select ref="approver-user-org" buttonType="button"
                v-model="approverForm.approvers" title="添加用户" @change="onOrgChange" />
            </el-form-item>
            <el-form-item label="会签比例" v-if="approverForm.assigneeType === 8">
              <el-select v-model="approverForm.countersignRatio">
                <el-option v-for="item in 10" :key="item*10" :label="item*10+'%'" :value="item*10">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加签设置">
              <el-checkbox v-model="approverForm.hasFreeApprover">允许加签</el-checkbox>
            </el-form-item>
            <el-form-item label="进度设置" required>
              <el-select v-model="approverForm.progress" placeholder="请选择">
                <el-option v-for="item in progressOptions" :key="item" :label="item+'%'"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄送设置">
              <org-select ref="approver-copy-role-org" type="role"
                v-model="approverForm.circulateRole" title="添加抄送角色" class="mb-10"
                buttonType="button" />
              <org-select ref="approver-copy-position-org" buttonType="button"
                v-model="approverForm.circulatePosition" title="添加抄送岗位" type="position"
                @change="onOrgChange" class="mb-10" />
              <org-select ref="approver-copy-user-org" buttonType="button"
                v-model="approverForm.circulateUser" title="添加抄送用户" @change="onOrgChange"
                class="mb-10" />
              <el-checkbox v-model="approverForm.isCustomCopy">自定义抄送人</el-checkbox>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="高级设置" name="senior">
          <el-form label-position="top" class="pd-10">
            <el-form-item label="操作权限">
              <div class="per-cell">
                <el-checkbox v-model="approverForm.hasAuditBtn">同意</el-checkbox>
                <el-input v-model="approverForm.auditBtnText" />
              </div>
              <div class="per-cell">
                <el-checkbox v-model="approverForm.hasRejectBtn">驳回</el-checkbox>
                <el-input v-model="approverForm.rejectBtnText" />
              </div>
              <div class="per-cell">
                <el-checkbox v-model="approverForm.hasRevokeBtn">撤回</el-checkbox>
                <el-input v-model="approverForm.revokeBtnText" />
              </div>
              <div class="per-cell">
                <el-checkbox v-model="approverForm.hasTransferBtn">转办</el-checkbox>
                <el-input v-model="approverForm.transferBtnText" />
              </div>
              <div class="per-cell">
                <el-checkbox v-model="approverForm.hasSign">签名</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item label="超时设置">
              <el-switch v-model="approverForm.timeoutConfig.on" class="mr-10" />
              <template v-if="approverForm.timeoutConfig.on">
                <el-input-number v-model="approverForm.timeoutConfig.quantity"
                  controls-position="right" :min="1" class="mr-10"></el-input-number>
                <el-select v-model="approverForm.timeoutConfig.type" class="timeout-select mr-10">
                  <el-option label="天" value="day"></el-option>
                  <el-option label="小时" value="hour"></el-option>
                  <el-option label="分钟" value="minute"></el-option>
                </el-select>
                <el-radio-group v-model="approverForm.timeoutConfig.handler">
                  <el-radio :label="1">同意</el-radio>
                  <el-radio :label="2">驳回</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item label="驳回步骤">
              <el-select v-model="approverForm.rejectStep" placeholder="请选择">
                <el-option v-for="item in rejectStepOptions" :key="item.nodeId"
                  :label="item.properties.title" :value="item.nodeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通知设置">
              <el-checkbox-group v-model="approverForm.messageType">
                <el-checkbox :label="1">站内信</el-checkbox>
                <el-checkbox :label="2">邮箱</el-checkbox>
                <el-checkbox :label="3">短信</el-checkbox>
                <el-checkbox :label="4">钉钉</el-checkbox>
                <el-checkbox :label="5">企业微信</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="说明">
              <el-input v-model="approverForm.description" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="表单权限" name="formAuth">
          <div class="form-auth-table">
            <el-table :data="getFormOperates()" class="JNPF-common-table" size="mini">
              <el-table-column prop="name" label="表单字段" align="left"></el-table-column>
              <el-table-column prop="write" label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.read">可见</el-checkbox>
                  <el-checkbox v-model="scope.row.write">可写</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="节点事件">
          <el-form label-position="top" :model="approverForm" class="pd-10">
            <el-alert type="warning" :closable="false">
              <div slot="title" class="tips">
                <p>请求方式：GET</p>
                <p>请求参数：taskId、taskNodeId、handleStatus(撤回事件无此参数)</p>
                <p>处理状态：0-拒绝、1-同意</p>
              </div>
            </el-alert>
            <el-form-item label="自定义审批事件">
              <el-switch v-model="approverForm.hasApproverFunc" />
            </el-form-item>
            <template v-if="approverForm.hasApproverFunc">
              <el-form-item label="审批事件请求路径">
                <el-input v-model="approverForm.approverInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
            <el-form-item label="自定义撤回事件">
              <el-switch v-model="approverForm.hasRecallFunc" />
            </el-form-item>
            <template v-if="approverForm.hasRecallFunc">
              <el-form-item label="撤回事件请求路径">
                <el-input v-model="approverForm.recallInterfaceUrl" placeholder="请输入接口地址" />
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
    <div class="actions">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="confirm">确定</el-button>
    </div>
    <el-dialog title="数据传递" :close-on-click-modal="false" :visible.sync="ruleVisible"
      class="JNPF-dialog JNPF-dialog_center rule-dialog" lock-scroll append-to-body width='700px'>
      <div class="option-box-tip">当父流程流转到子流程时，将对应的字段赋值给子流程</div>
      <el-row :gutter="10" v-for="(item,i) in assignList" :key="i" class="mb-10">
        <el-col :span="2" class="rule-cell">父流程</el-col>
        <el-col :span="7" class="rule-cell">
          <el-select v-model="item.parentField" placeholder="请选择字段">
            <el-option v-for="item in usedFormItems" :key="item.__vModel__"
              :label="item.__config__.label" :value="item.__vModel__" />
          </el-select>
        </el-col>
        <el-col :span="4" class="rule-cell mid">赋值给</el-col>
        <el-col :span="2" class="rule-cell">子流程</el-col>
        <el-col :span="7" class="rule-cell">
          <el-select v-model="item.childField" placeholder="请选择字段">
            <el-option v-for="item in childFieldOptions" :key="item.vmodel" :label="item.label"
              :value="item.vmodel" />
          </el-select>
        </el-col>
        <el-col :span="2" class="rule-cell">
          <el-button type="danger" icon="el-icon-close" @click="delRule(i)">
          </el-button>
        </el-col>
      </el-row>
      <div class="table-actions" @click="addRule">
        <el-button type="text" icon="el-icon-plus">新增规则</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ruleVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRule">确定</el-button>
      </span>
    </el-dialog>
  </el-drawer>
</template>
<script>
import { FlowEngineSelector, getFormDataFields } from '@/api/workFlow/FlowEngine'
import { NodeUtils } from "../FlowCard/util.js"
import { getDrawingList } from '@/components/Generator/utils/db'
import OrgSelect from '../OrgSelect'
const defaultSubFlowForm = {
  initiateType: 1,
  managerLevel: 1,
  initiator: [],
  initiatePos: [],
  initiateRole: [],
  flowId: '',
  assignList: [],
  messageType: [1],
}
const defaultApproverForm = {
  approvers: [], // 审批人集合
  approverPos: [], // 审批岗位集合
  approverRole: [], // 审批角色集合
  assigneeType: 6, // 指定审批人
  formOperates: [], // 表单权限集合
  circulateRole: [],   // 抄送角色集合
  circulatePosition: [],   // 抄送岗位集合
  circulateUser: [],  // 抄送人集合
  isCustomCopy: false,
  progress: '50',  // 进度
  rejectStep: '0',  // 驳回步骤
  description: '',  // 节点描述
  managerLevel: 1,
  countersignRatio: 100,
  formField: '',
  nodeId: '',
  getUserUrl: '',
  noApproverHandler: true,
  hasFreeApprover: false,
  hasAuditBtn: true,
  auditBtnText: '通 过',
  hasRejectBtn: true,
  rejectBtnText: '拒 绝',
  hasRevokeBtn: true,
  revokeBtnText: '撤 回',
  hasTransferBtn: true,
  transferBtnText: '转 办',
  hasSign: false,
  timeoutConfig: {
    on: false,
    quantity: 1,
    type: 'day',
    handler: 1
  },
  messageType: [1],
  hasApproverFunc: false,
  approverInterfaceUrl: '',
  approverInterfaceType: 'GET',
  hasRecallFunc: false,
  recallInterfaceUrl: ''
}
const defaultStep = [{
  nodeId: '1',
  properties: { title: '上一审批人' }
}, {
  nodeId: '0',
  properties: { title: '发起人' }
}]
export default {
  props: [/*当前节点数据*/"value", /*整个节点数据*/"processData"],
  components: { OrgSelect },
  data() {
    return {
      visible: false,  // 控制面板显隐
      activeName: "config", // or formAuth  Tab面板key
      showingPCons: [], // 用户选择了得条件  被选中的才会被展示在面板上编辑
      pconditions: [], // 从vuex中获取的可以作为流程图条件的集合
      // 当前节点数据
      properties: {
        title: ''
      },
      // 发起人  start节点和condition节点需要
      initiator: [],
      initiatePos: [],
      initiateRole: [],
      priorityLength: 0, // 当为条件节点时  显示节点优先级选项的数据
      startForm: {
        formOperates: []
      },
      ruleVisible: false,
      subFlowForm: JSON.parse(JSON.stringify(defaultSubFlowForm)),
      approverForm: JSON.parse(JSON.stringify(defaultApproverForm)),
      initiateTypeOptions: ['指定成员', '部门主管', '发起者主管', '发起者本人'],
      assigneeTypeOptions: [
        {
          label: '或签',
          value: 6
        },
        {
          label: '会签',
          value: 8
        },
        {
          label: '发起人主管',
          value: 1
        },
        {
          label: '发起人',
          value: 3
        },
        {
          label: '部门主管',
          value: 2
        },
        {
          label: '变量',
          value: 4
        },
        {
          label: '环节',
          value: 5
        },
        {
          label: '服务',
          value: 9
        }],
      rejectStepOptions: [],
      progressOptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],
      symbolOptions: [
        {
          label: '大于等于',
          value: ">="
        },
        {
          label: '大于',
          value: ">"
        },
        {
          label: '等于',
          value: "=="
        },
        {
          label: '小于等于',
          value: "<="
        },
        {
          label: '小于',
          value: "<"
        },
        {
          label: '不等于',
          value: "<>"
        }],
      logicOptions: [
        {
          label: '并且',
          value: "&&"
        },
        {
          label: '或者',
          value: "||"
        }],
      assignList: [],
      flowOptions: [],
      childFieldOptions: [],
      nodeOptions: []
    };
  },
  computed: {
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      return this.pconditions.length - this.showingPCons.length + 1;
    },
    usedFormItems() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey !== 'table') list.push(data)
      }
      loop(getDrawingList())
      const formItems = list
      return formItems
    }
  },
  methods: {
    getFormOperates() {
      let res = []
      this.isApproverNode() && (res = this.approverForm.formOperates)
      this.isStartNode() && (res = this.startForm.formOperates)
      return res
    },
    resetOrgColl() {
      this.approverForm.approvers = []
      this.approverForm.approverPos = []
      this.approverForm.approverRole = []
    },
    onOrgChange(data) {
      // console.log(data)
    },
    timeTangeLabel(item) {
      const index = ['fc-time-duration', 'fc-date-duration'].findIndex(t => t === item.tag)
      if (index > -1) {
        return '时长' + ['(小时)', '(天)'][index]
      } else {
        return item.label
      }
    },
    getAssignTypeLabel() {
      const res = this.assigneeTypeOptions.find(t => t.value === this.approverForm.assigneeType)
      return res ? res.label : ''
    },
    changeAllFormOperate(val) {
      const target = this.isStartNode() ? this.startForm : this.approverForm
      target.formOperates.forEach(t => t.formOperate = val)
    },
    // 是否可以显示当前条件组件
    couldShowIt(item, ...tag) {
      return tag.includes(item.tag) && this.showingPCons.includes(item.formId);
    },

    initFormOperates(target) {
      const formOperates = target.properties && target.properties.formOperates || []
      let res = []
      const getWriteById = id => {
        const arr = formOperates.filter(o => o.id === id)
        return arr.length ? arr[0].write : NodeUtils.isStartNode(target)
      }
      const getReadById = id => {
        const arr = formOperates.filter(o => o.id === id)
        return arr.length ? arr[0].read : true
      }
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__) res.push({
          id: data.__vModel__,
          name: data.__config__.label,
          required: data.__config__.required,
          read: getReadById(data.__vModel__),
          write: getWriteById(data.__vModel__)
        })
      }
      loop(getDrawingList())
      return res
    },
    initCopyNode() {
      this.properties = this.value.properties
    },

    initStartNodeData() {
      this.initInitiator()
    },

    copyNodeConfirm() {
      this.$emit("confirm", this.properties, this.getOrgSelectLabel('copy') || '发起人自选');
      this.visible = false;
    },

    /**
     * 条件节点确认保存得回调
     */
    conditionNodeComfirm() {
      if (!this.exist()) return
      let nodeContent = ''
      this.properties.conditions = this.pconditions
      for (let i = 0; i < this.pconditions.length; i++) {
        const e = this.pconditions[i];
        nodeContent += `[${e.fieldName} ${e.symbol} ${e.filedValue}] ${i + 1 == this.pconditions.length ? '' : e.logicName}` + '\n'
      }
      this.$emit("confirm", this.properties, nodeContent || '请设置条件');
      this.visible = false;
    },

    getOrgSelectLabel(type) {
      return this.$refs[type + '-org']['selectedLabels']
    },
    /**
     * 开始节点确认保存
     */
    startNodeComfirm() {
      this.properties.initiator = this.initiator
      this.properties.initiatePos = this.initiatePos
      this.properties.initiateRole = this.initiateRole
      let content = '',
        initiatorText = this.getOrgSelectLabel('start-user'),
        initiatorPosText = this.getOrgSelectLabel('start-position'),
        initiatorRoleText = this.getOrgSelectLabel('start-role')
      if (!initiatorRoleText && !initiatorText && !initiatorPosText) {
        content = "所有人"
      } else {
        content += initiatorRoleText
        content += (content && initiatorPosText ? ',' : '') + initiatorPosText
        content += (content && initiatorText ? ',' : '') + initiatorText
      }
      Object.assign(this.properties, this.startForm)
      this.$emit("confirm", this.properties, content);
      this.visible = false;
    },
    /**
     * 定时器节点确认保存
     */
    timerNodeComfirm() {
      let content = ''
      let { day, hour, minute, second } = this.properties
      if (!day && !hour && !minute && !second) {
        content = '请设置时间'
      } else {
        content = `将于${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}${second ? second + '秒' : ''}后流转`
      }
      this.$emit("confirm", this.properties, content);
      this.visible = false;
    },
    /**
     * 子流程节点确认保存
     */
    subFlowNodeComfirm() {
      if (!this.properties.title) {
        this.$message({
          message: '请输入子流程名称',
          type: 'error',
        })
        return
      }
      let content = ''
      if (this.subFlowForm.initiateType === 1) {
        if (!this.subFlowForm.initiator.length && !this.subFlowForm.initiatePos.length && !this.subFlowForm.initiateRole.length) {
          this.$message({
            message: '请设置发起人',
            type: 'error',
          })
          return
        }
        let initiatorText = this.getOrgSelectLabel('subFlow-user'),
          initiatePosText = this.getOrgSelectLabel('subFlow-position'),
          initiateRoleText = this.getOrgSelectLabel('subFlow-role')
        content += initiateRoleText
        content += (content && initiatePosText ? ',' : '') + initiatePosText
        content += (content && initiatorText ? ',' : '') + initiatorText
      } else {
        content = this.initiateTypeOptions[this.subFlowForm.initiateType - 1]
      }
      if (!this.subFlowForm.flowId) {
        this.$message({
          message: '请选择子流程表单',
          type: 'error',
        })
        return
      }
      let titleObj = {
        title: this.properties.title
      }
      Object.assign(this.properties, this.subFlowForm, titleObj)
      this.$emit("confirm", this.properties, content);
      this.visible = false;
    },
    /**
     * 审批节点确认保存
     */
    approverNodeComfirm() {
      if (!this.properties.title) {
        this.$message({
          message: '请输入节点名称',
          type: 'error',
        })
        return
      }
      const assigneeType = this.approverForm.assigneeType
      let content = ''
      if ([6, 8].includes(assigneeType)) {
        if (!this.approverForm.approvers.length && !this.approverForm.approverPos.length && !this.approverForm.approverRole.length) {
          this.$message({
            message: '请设置审批人',
            type: 'error',
          })
          return
        }
        // approver
        let approverText = this.getOrgSelectLabel('approver-user'),
          approverPosText = this.getOrgSelectLabel('approver-position'),
          approverRoleText = this.getOrgSelectLabel('approver-role')
        content += approverRoleText
        content += (content && approverPosText ? ',' : '') + approverPosText
        content += (content && approverText ? ',' : '') + approverText
      } else {
        content = this.assigneeTypeOptions.find(t => t.value === assigneeType).label
      }
      if (assigneeType == 4 && !this.approverForm.formField) {
        this.$message({
          message: '请选择表单字段',
          type: 'error',
        })
        return
      }
      if (assigneeType == 5 && !this.approverForm.nodeId) {
        this.$message({
          message: '请选择节点',
          type: 'error',
        })
        return
      }
      if (assigneeType == 9 && !this.approverForm.getUserUrl) {
        this.$message({
          message: '请输入接口路径',
          type: 'error',
        })
        return
      }
      // let copyContent = '', copyText = this.getOrgSelectLabel('approver-copy-user'),
      //   copyPosText = this.getOrgSelectLabel('approver-copy-position')
      // if (this.approverForm.circulatePosition.length || this.approverForm.circulateUser.length) {
      //   copyContent = '抄送:' + copyPosText + (copyText && copyPosText ? ',' : '') + copyText
      // }
      // let totalContent = '审批：' + content + copyContent
      let titleObj = {
        title: this.properties.title
      }
      Object.assign(this.properties, this.approverForm, titleObj)
      this.$emit("confirm", this.properties, content || '请设置审批人')
      this.visible = false

    },
    // 确认修改
    confirm() {
      this.isCopyNode() && this.copyNodeConfirm()
      this.isStartNode() && this.startNodeComfirm()
      this.isTimerNode() && this.timerNodeComfirm()
      this.isSubFlowNode() && this.subFlowNodeComfirm()
      this.isApproverNode() && this.approverNodeComfirm()
      this.isConditionNode() && this.conditionNodeComfirm()
    },
    // 关闭抽屉
    cancel() {
      setTimeout(() => {
        this.$emit("cancel");
        this.visible = false;
      }, 0)
    },
    /**
     * 删除流程条件
     */
    onDelCondition(index) {
      this.pconditions.splice(index, 1)
    },
    // 配合getPriorityLength 获取前一个节点条件数组长度 用于设置优先级
    getPrevData() {
      return NodeUtils.getPreviousNode(this.value.prevId, this.processData);
    },
    // 用于获取节点优先级范围
    getPriorityLength() {
      this.priorityLength = this.getPrevData().conditionNodes.length;
    },
    // 判断是否是条件节点
    isConditionNode() {
      return this.value ? NodeUtils.isConditionNode(this.value) : false;
    },
    /** 判断是否是审批节点*/
    isApproverNode() {
      return this.value ? NodeUtils.isApproverNode(this.value) : false;
    },

    isStartNode() {
      return this.value ? NodeUtils.isStartNode(this.value) : false;
    },
    isCopyNode() {
      return this.value ? NodeUtils.isCopyNode(this.value) : false
    },
    isTimerNode() {
      return this.value ? NodeUtils.isTimerNode(this.value) : false
    },
    isSubFlowNode() {
      return this.value ? NodeUtils.isSubFlowNode(this.value) : false
    },
    // 初始化发起人节点
    initInitiator() {
      this.initiator = this.value.properties && this.value.properties.initiator
      this.initiatePos = this.value.properties && this.value.properties.initiatePos
      this.startForm.formOperates = this.initFormOperates(this.value)
    },
    /**
    * 初始化审批节点所需数据
    */
    initApproverNodeData() {
      this.activeName = 'config'
      Object.assign(this.approverForm, this.value.properties)
      this.getNodeOption()
      this.approverForm.formOperates = this.initFormOperates(this.value)
    },
    initSubFlowData() {
      this.getFlowOptions()
      Object.assign(this.subFlowForm, this.value.properties)
    },
    openRuleBox() {
      if (!this.subFlowForm.flowId) {
        this.$message({
          message: '请选择子流程表单',
          type: 'error',
        })
        return
      }
      getFormDataFields(this.subFlowForm.flowId).then(res => {
        this.childFieldOptions = res.data.list
        this.assignList = this.subFlowForm.assignList
        this.ruleVisible = true
      })
    },
    addRule() {
      this.assignList.push({
        parentField: '',
        childField: ''
      })
    },
    delRule(i) {
      this.assignList.splice(i, 1)
    },
    saveRule() {
      let boo = true
      for (let i = 0; i < this.assignList.length; i++) {
        const element = this.assignList[i];
        if (!element.parentField) {
          boo = false
          this.$message({
            message: '请选择父流程字段',
            type: 'error',
          })
          break
        }
        if (!element.childField) {
          boo = false
          this.$message({
            message: '请选择子流程字段',
            type: 'error',
          })
          break
        }
      }
      if (!boo) return
      this.subFlowForm.assignList = this.assignList
      this.ruleVisible = false
      this.assignList = []
    },
    getFlowOptions() {
      FlowEngineSelector().then(res => {
        this.flowOptions = res.data.list
      })
    },
    // 获取驳回步骤选项
    getNodeOption() {
      let list = [], _this = this
      const loop = data => {
        if (Array.isArray(data)) data.forEach(d => loop(d))
        if (data.type === 'approver') list.push(data)
        if (data.conditionNodes && Array.isArray(data.conditionNodes)) loop(data.conditionNodes)
        if (data.childNode) loop(data.childNode)
      }
      loop(this.processData)
      let realList = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].nodeId === _this.value.nodeId) break
        realList.push(list[i])
      }
      this.rejectStepOptions = [...defaultStep, ...realList]
      let nodeOptions = list.filter(o => o.nodeId !== _this.value.nodeId)
      this.nodeOptions = nodeOptions
    },
    /**
     * 初始化条件节点数据
     */
    initConditionNodeData() {
      // 初始化条件表单数据
      let nodeConditions = this.value.properties && this.value.properties.conditions
      this.pconditions = nodeConditions
    },
    addCondition() {
      let item = {
        fieldName: '',
        symbolName: '',
        filedValue: '',
        logicName: '并且',
        field: '',
        symbol: '',
        logic: '&&',
      }
      this.pconditions.push(item)
    },
    fieldNameChange(val, item) {
      let obj = this.usedFormItems.filter(o => o.__vModel__ == val)[0]
      item.fieldName = obj.__config__.label
    },
    symbolChange(val, item) {
      let obj = this.symbolOptions.filter(o => o.value == val)[0]
      item.symbolName = obj.label
    },
    logicChange(val, item) {
      let obj = this.logicOptions.filter(o => o.value == val)[0]
      item.logicName = obj.label
    },
    // 条件字段验证
    exist() {
      let isOk = true;
      //  遍历数组，判断非空
      for (let i = 0; i < this.pconditions.length; i++) {
        const e = this.pconditions[i];
        if (!e.field) {
          this.$message({
            showClose: true,
            message: '字段名称不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.symbol) {
          this.$message({
            showClose: true,
            message: '比较不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        if (!e.filedValue) {
          this.$message({
            showClose: true,
            message: '数据值不能为空',
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      return isOk;
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        this.approverForm = JSON.parse(JSON.stringify(defaultApproverForm)) // 重置数据为默认状态
        this.subFlowForm = JSON.parse(JSON.stringify(defaultSubFlowForm))
        return
      }
      if (!this.processData.properties.formOperates || !this.processData.properties.formOperates.length) {
        this.processData.properties.formOperates = this.initFormOperates(this.processData)
      }
      this.isStartNode() && this.initStartNodeData()
      this.isSubFlowNode() && this.initSubFlowData()
      this.isApproverNode() && this.initApproverNodeData()
      this.isConditionNode() && this.initConditionNodeData()
    },
    value(newVal) {
      if (newVal && newVal.properties) {
        this.visible = true;
        this.properties = JSON.parse(JSON.stringify(newVal.properties));
        if (this.properties) {
          NodeUtils.isConditionNode(newVal) && this.getPriorityLength();
        }
      }
    }
  },
};
</script>
<style lang="scss">
.condition-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
}
</style>
<style lang="scss" scoped>
.tips p {
  line-height: 24px;
}
.drawer {
  >>> .el-drawer__body {
    padding-bottom: 62px;
    overflow: hidden;
  }
  .el-select {
    width: 100%;
    &.timeout-select {
      width: 80px;
    }
  }

  >>> .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

  >>> .el-tabs__item:focus {
    box-shadow: none !important;
  }

  >>> .el-tabs__header {
    margin-bottom: 0;
  }
}
.mr-10 {
  margin-right: 10px;
}

.header {
  line-height: 28px;
}

.actions {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 20px 20px;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
}

.radio-item {
  line-height: 30px;
  width: calc(25% - 30px);
}

.priority-select {
  width: 118px;
  position: absolute;
  right: 26px;
}

.form-auth-table {
  font-size: 14px;
  .auth-table-header {
    background: #fafafa;
    line-height: 40px;
  }
  .row {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 12px;
    border-bottom: 1px solid #efefef;
    &:hover {
      background: #f5f7fa;
    }
    .label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .required {
        color: #f2725e;
      }
    }
    .radio-group {
      flex: 2;
      display: flex;
      justify-content: space-between;
    }
  }
}

.approver-pane {
  height: 100%;
  overflow: hidden;
  >>> .el-tabs__content {
    height: calc(100% - 40px);
    .el-tab-pane {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .per-cell {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .el-checkbox {
      margin-right: 40px;
    }
  }
}
.option-box-tip {
  font-size: 14px;
  color: #a5a5a5;
}
.option-box {
  font-size: 14px;
  padding-left: 1rem;
}

.condition-pane {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.condition-list {
  font-size: 14px;
  line-height: 36px;
  >>> .el-col {
    text-align: center;
    padding: 0 4px;
    .el-input,
    .el-select {
      width: 100%;
    }
  }
}
.rule-dialog {
  >>> .el-dialog__body {
    min-height: 300px !important;
    padding: 20px 20px 10px !important;
  }
  .option-box-tip {
    margin-bottom: 20px;
  }
  .rule-cell {
    line-height: 32px;
    &.mid {
      color: #1890ff;
      text-align: center;
    }
  }
}
</style>