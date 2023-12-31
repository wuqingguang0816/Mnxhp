<script>
import { NodeUtils } from "./util.js";
const isCondition = data => data.type === "condition" || (data.type === "approver" && (data.isInterflow || data.isBranchFlow));
const notEmptyArray = arr => Array.isArray(arr) && arr.length > 0;
const hasBranch = data => notEmptyArray(data.conditionNodes);
const stopPro = ev => ev.stopPropagation();

function createNormalCard(ctx, conf, h) {
  let classList = ['flow-path-card']
  if (conf.state) classList.push(conf.state)
  const afterTrue = (isTrue, name) => (isTrue && classList.push(name), isTrue)
  const isStartNode = afterTrue(NodeUtils.isStartNode(conf), 'start-node')
  const isApprNode = afterTrue(NodeUtils.isApproverNode(conf), 'approver')
  const isCopyNode = afterTrue(NodeUtils.isCopyNode(conf), 'copy')
  const isTimerNode = afterTrue(NodeUtils.isTimerNode(conf), 'timer')
  const isSubFlowNode = afterTrue(NodeUtils.isSubFlowNode(conf), 'subFlow')
  return (
    <section class={classList.join(' ')} onClick={this.eventLauncher.bind(ctx, "edit", conf)} >
      <header class="header">
        <div class="title-box" style="height: 100%;width:190px;">
          <span class="title-text">{conf.properties.title}</span>
        </div>
        {(isSubFlowNode) && (
          <el-tag class="async-state" size="mini" effect="plain" style="right:10px">{conf.properties.isAsync ? '异步' : '同步'}</el-tag>
        )}
      </header>
      <div class="body">
        <span class="text">{conf.content}</span>
      </div>
    </section>
  );
}
// arg = ctx, data, h
const createFunc = (...arg) => createNormalCard.call(arg[0], ...arg)
let nodes = {
  start: createFunc,
  approver: createFunc,
  copy: createFunc,
  timer: createFunc,
  subFlow: createFunc,
  interflow: createFunc,
  branchFlow: createFunc,
  empty: _ => '',
  condition: function (ctx, conf, h) {
    return (
      <section class="flow-path-card condition">
        <header class="header">
          <div class="title-box" style="height: 20px;width:160px;">
            <span class="title-text">{conf.properties.title}</span>
          </div>
        </header>
        <div class="body">
          <div class="text">{conf.content}</div>
        </div>
      </section>
    );
  }
};

function addNodeButton(ctx, data, h, isBranch = false) {
  // 只有非条件节点和条件分支树下面的那个按钮 才能添加新分支树
  let couldAddBranch = !hasBranch(data) || isBranch;
  let isEmpty = data.type === "empty";
  if (isEmpty && !isBranch) {
    return "";
  }
  return (
    <div class="add-node-btn-box flex justify-center"></div>
  );
}

function NodeFactory(ctx, data, h) {
  if (!data) return
  const showErrorTip = ctx.verifyMode && NodeUtils.checkNode(data) === false
  let res = [],
    branchNode = "",
    selfNode = (
      <div class="node-wrap">
        <div class={`node-wrap-box ${data.type} ${NodeUtils.isInterflowNode(data) ? 'interflow' : ''} ${NodeUtils.isBranchFlowNode(data) ? 'branchFlow' : ''} ${showErrorTip ? 'error' : ''}`}>
          {nodes[data.type].call(ctx, ctx, data, h)}
          {addNodeButton.call(ctx, ctx, data, h)}
        </div>
      </div>
    );

  if (hasBranch(data)) {
    // 如果节点是数组 一定为条件分支 添加分支样式包裹
    // {data.childNode && NodeFactory.call(ctx, ctx, data.childNode, h)}
    branchNode = (
      <div class="branch-wrap">
        <div class="branch-box-wrap">
          <div class="branch-box flex justify-center relative">
            <span class="line"></span>
            {data.conditionNodes.map(d => NodeFactory.call(ctx, ctx, d, h))}
          </div>
        </div>
        {addNodeButton.call(ctx, ctx, data, h, true)}
      </div>
    );
  }

  if (isCondition(data)) {
    return (
      <div class="col-box">
        <div class="center-line"></div>
        <div class="top-cover-line"></div>
        <div class="bottom-cover-line"></div>
        {selfNode}
        {branchNode}
        {NodeFactory.call(ctx, ctx, data.childNode, h)}
      </div>
    );
  }
  res.push(selfNode);
  branchNode && res.push(branchNode);
  data.childNode && res.push(NodeFactory.call(ctx, ctx, data.childNode, h));
  return res;
}

function addEndNode(h) {
  return <section class="end-node">流程结束</section>;
}

export default {
  props: {
    data: { type: Object, required: true },
    // 点击发布时需要校验节点数据完整性 此时打开校验模式
    verifyMode: { type: Boolean, default: true },
  },
  watch: {

  },
  methods: {
    /**
     *事件触发器 统筹本组件所有事件并转发到父组件中
     * @param { Object } 包含event（事件名）和args（事件参数）两个参数
     */
    eventLauncher(event, ...args) {
      // args.slice(0,-1) vue 会注入MouseEvent到最后一个参数 去除事件对象
      let param = { event, args: args.slice(0, -1) };
      this.$emit("emits", param);
    }
  },
  render(h) {
    return (
      <div style="display: inline-flex; flex-direction: column; align-items: center;">
        {this.data && NodeFactory.call(this, this, this.data, h)}
        {addEndNode(h)}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>