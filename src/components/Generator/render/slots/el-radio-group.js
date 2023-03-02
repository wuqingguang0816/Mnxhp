export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach(item => {
      if (conf.optionType === 'button') {
        list.push(<el-radio-button label={item[conf.__config__.props.value]}>{item[conf.__config__.props.label]}</el-radio-button>)
      } else {
        list.push(<el-radio label={item[conf.__config__.props.value]} border={conf.border}>{item[conf.__config__.props.label]}</el-radio>)
      }
    })
    return list
  }
}
