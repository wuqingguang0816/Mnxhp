
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";
import JsBarcode from "jsbarcode";
import request from "@/utils/request";
import { getAmountChinese } from "@/components/Generator/utils/index"
/**
 * 打印模板
 */
const printOptionApi = {
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      width: '',
      height: '',
      barcodeId: '',
      data: {},
      printTemplate: "",
      recordList: [],
      loading: false,
      qrcodeId: '',
      showContainer: false,
      qrTemp: [],
      barTemp: []
    }
  },
  methods: {
    initData() {
      this.barTemp = []
      this.qrTemp = []
      this.batchData = [];
      this.printTemplate = "";
    },
    qrbarReplace() {
      if (this.barTemp.length > 0) {
        let array = this.barTemp
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          // 在页面中设置这个dom,获取码的html字符串
          const id = this.jnpf.idGenerator()
          let dom = this.$refs.barcodewrap
          let imgdom = document.createElement('img');
          imgdom.width = '100';
          imgdom.height = '100';
          imgdom.id = `barcode${id}`
          dom.appendChild(imgdom)
          this.$nextTick(() => {
            this.getJsBarcode(element.value, `#barcode${id}`, element.width, element.height)
            let dom = document.querySelector(`#barcode${id}`)
            if (!dom) return
            this.printTemplate = this.printTemplate.replace(element.replaceStr, dom.outerHTML)
          })
        }
      }
      if (this.qrTemp.length > 0) {
        let array = this.qrTemp
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          // 在页面中设置这个dom,获取码的html字符串
          const id = this.jnpf.idGenerator()
          let dom = this.$refs.qrcodewrap
          let imgdom = document.createElement('img');
          imgdom.width = '100';
          imgdom.height = '100';
          imgdom.id = `qrCode${id}`
          dom.appendChild(imgdom)
          this.$nextTick(() => {
            let base64Url = this.getJsQrcode(element.value, `qrCode${id}`, element.width, element.height)
            this.printTemplate = this.printTemplate.replace(element.replaceStr, `<img id='qrCode${id}'  width='${element.width}' height='${element.height}' src='${base64Url}'/>`)
          })
        }
      }
    },
    subDo(domCurrent) {
      return new Promise((resolve, reject) => {
        const tableList = domCurrent.getElementsByTagName('table')
        if (tableList.length) {
          for (let j = 0; j < tableList.length; j++) {
            const tableObj = tableList[j];
            let tds = []
            let newTable = []
            for (let i = 0; i < tableObj.rows.length; i++) {
              tds = tableObj.rows[i]
              const dataTag = this.isChildTable(tds.cells)

              if (dataTag) {
                this.retrieveData(dataTag, tableObj, tds, newTable)
              } else {
                newTable.push(tds)
              }
            }
            let copy = tableObj.getElementsByTagName('tbody')[0].innerHTML
            tableObj.getElementsByTagName('tbody')[0].innerHTML = ''
            for (let i = 0; i < newTable.length; i++) {
              tableObj.getElementsByTagName('tbody')[0].appendChild(newTable[i])
            }
            this.printTemplate = this.printTemplate.replace(copy, tableObj.innerHTML)
            this.qrbarReplace()
          }
          resolve(1)
        }
      })
    },
    async handleData(data, domCurrent, index) {
      return new Promise(async (resolve, reject) => {
        this.data = data.printData
        this.recordList = data.operatorRecordList || []
        this.$nextTick(async () => {
          this.printTemplate = domCurrent.innerHTML
          // 数字替换优先,顺序必须第一
          this.replaceNum(domCurrent)
          // 这个数据替换也必须在下面几个之前
          this.replaceRemainData(domCurrent)
          // 表格
          await this.subDo(domCurrent)

          this.replaceRemainData(domCurrent)

          this.replaceSysValue()
          this.replaceImg()

          this.replaceQrCode()
          this.replaceBarCode()
          this.qrbarReplace()

          const pageBreak = '<p style="page-break-after:always;"></p>'
          this.printTemplate = this.printTemplate.replace('<p><!-- pagebreak --></p>', pageBreak)
          resolve(this.printTemplate)
        })
      })
    },
    replaceMe(key, value) {
      this.printTemplate = this.printTemplate.replace(key, value)
    },
    replaceRemainData(dom) {
      let dataList = dom.querySelectorAll('span')
      dataList.forEach(element => {
        let dataTag = element.getAttribute('data-tag') ? element.getAttribute('data-tag').split('.')[0] : false
        let dataKey = element.innerText
        if (dataTag && dataTag != 'null' && dataKey.startsWith("{")) {
          dataKey = dataKey.replace('{', '').replace('}', '')
          if (dataTag == 'headTable') {
            this.replaceMe(element.outerHTML, this.data[dataKey])
          } else {
            let subData = this.data[dataTag] && this.data[dataTag].length > 0 && this.data[dataTag][0]
            if (subData) {
              this.replaceMe(element.outerHTML, subData[dataKey])
            }
          }
        }
      })
    },
    replaceNum(dom) {
      var stringToHTML = function (str) {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
      };
      let reg = /大写金额\((.+?)\)/g;
      let list = this.printTemplate.match(reg);
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          let data = this.getAmount(element)
          if (isNaN(data)) {
            data = stringToHTML(data)
            let subData = data.querySelectorAll('span') ? data.querySelectorAll('span')[0] : ''
            let [subDataTag, data_] = subData.getAttribute('data-tag') ? subData.getAttribute('data-tag').split('.') : []
            let value = subDataTag == 'headTable' ? getAmountChinese(this.data[data_]) : getAmountChinese(this.data[subDataTag][0][data_])
            this.printTemplate = this.printTemplate.replace(element, value)
          } else {
            this.printTemplate = this.printTemplate.replace(element, getAmountChinese(data))
          }
        }
      }
      let reg1 = /千位分隔符\((.+?)\)/g;
      let list1 = this.printTemplate.match(reg1);
      if (list1 && list1.length) {
        for (let i = 0; i < list1.length; i++) {
          const element = list1[i];
          let [data, place] = this.getAmount(element).split(',')
          if (isNaN(data)) {
            data = stringToHTML(data)
            let subData = data.querySelectorAll('span') ? data.querySelectorAll('span')[0] : ''
            let [subDataTag, data_] = subData.getAttribute('data-tag') ? subData.getAttribute('data-tag').split('.') : []
            let value = subDataTag == 'headTable' ? this.getThousands(this.data[data_], place) : this.getThousands(this.data[subDataTag][0][data_], place)
            this.printTemplate = this.printTemplate.replace(element, value)
          } else {
            this.printTemplate = this.printTemplate.replace(element, this.getThousands(data, place))
          }
        }
      }
    },
    isChildTable(cells) {
      let tableName = ''
      outer: for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        let spanList = cells[j].getElementsByTagName('span')
        if (!spanList.length) break outer;
        let hasChildTable = false
        inner: for (let j = 0; j < spanList.length; j++) {
          const spanEle = spanList[j];
          const dataTag = spanEle.getAttribute('data-tag') ? spanEle.getAttribute('data-tag').split('.')[0] : 'null'
          if (dataTag && dataTag !== 'headTable' && dataTag !== 'null') {
            hasChildTable = true
            tableName = dataTag
            break inner
          }
        }
        if (hasChildTable) break outer;
      }
      return tableName
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    generateTable(data, tds) {
      for (let key in data) {
        for (let j = 0; j < tds.cells.length; j++) {
          let spanList = tds.cells[j].getElementsByTagName('span')
          for (let i = 0; i < spanList.length; i++) {
            const dataTag = spanList[i].getAttribute('data-tag') ? spanList[i].getAttribute('data-tag').split('.')[1] : 'null'
            if (key == dataTag) {
              spanList[i].innerHTML = data[key]
            }
          }
        }
      }
      return tds
    },
    retrieveData(dataTag, tableObj, tds, newTable) {
      for (let key in this.data) {
        if (key == dataTag) {
          for (let j = 0; j < this.data[key].length; j++) {
            let tr = this.generateTable(this.data[key][j], tds.cloneNode(true))
            let tds1 = tr.children
            for (let i = 0; i < tds1.length; i++) {
              const element = tds1[i];
              this.replaceImg(element)
              this.replaceBarCode(element)
              this.replaceQrCode(element)
            }
            newTable.push(tr)
          }
        }
      }
    },
    getHandleName(handleStatus) {
      if (handleStatus == 0) return "退回"
      if (handleStatus == 1) return "通过"
      if (handleStatus == 2) return "发起"
      if (handleStatus == 3) return "撤回"
      if (handleStatus == 4) return "终止"
      if (handleStatus == 5) return "指派"
      if (handleStatus == 6) return "加签"
      if (handleStatus == 7) return "转审"
      if (handleStatus == 8) return "变更"
      if (handleStatus == 9) return "复活"
      return ''
    },
    replaceSysValue() {
      const recordList = this.recordList
      const systemPrinter = this.userInfo.userName + '/' + this.userInfo.userAccount
      const systemPrintTime = this.jnpf.toDate(new Date())
      let systemApprovalContent = ''
      if (recordList.length) {
        systemApprovalContent += '<table style="border-collapse: collapse; width: 100%;" border="1" data-mce-style="border-collapse: collapse; width: 100%;"><tbody><tr><td style="width:20%;" data-mce-style="width: 20%;">节点名称</td><td style="width:20%;" data-mce-style="width: 20%;">操作人员</td><td style="width:20%;" data-mce-style="width: 20%;">操作时间</td><td style="width:20%;" data-mce-style="width: 20%;">执行动作</td><td style="width: 20%;" data-mce-style="width: 20%;">备注</td></tr>'
        let content = ''
        for (let i = 0; i < recordList.length; i++) {
          const record = recordList[i];
          content += `<tr><td style="width: 20%;" data-mce-style="width: 20%;"><span class="wk-print-tag-wukong wk-tiny-color--common" contenteditable="false">${record.nodeName}</span></td><td style="width: 20%;" data-mce-style="width: 20%;"><span class="wk-print-tag-wukong wk-tiny-color--common" contenteditable="false">${record.userName}</span></td><td style="width: 20%;" data-mce-style="width: 20%;"><span class="wk-print-tag-wukong wk-tiny-color--common" contenteditable="false">${this.jnpf.toDate(record.handleTime)}</span></td><td style="width: 20%;" data-mce-style="width: 20%;"><span class="wk-print-tag-wukong wk-tiny-color--common" contenteditable="false">${this.getHandleName(record.handleStatus)}</span></td><td style="width: 20%;" data-mce-style="width: 20%;"><span class="wk-print-tag-wukong wk-tiny-color--common" contenteditable="false">${record.handleOpinion || ""}</span></td></tr>`
        }
        systemApprovalContent += content
        systemApprovalContent += '</tbody></table>'
      }
      this.printTemplate = this.printTemplate.replace('{systemPrinter}', systemPrinter)
      this.printTemplate = this.printTemplate.replace('{systemPrintTime}', systemPrintTime)
      this.printTemplate = this.printTemplate.replace('{systemApprovalContent}', systemApprovalContent)
    },
    getThousands(value, place) {
      if (!value && value !== 0) return ''
      place = place ? place : this.getPlace(value)
      const numArr = value.toString().split('.');
      numArr[0] = numArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      numArr[1] = numArr[1] ? numArr[1].toString().substring(0, place) : ''
      return numArr[1] ? numArr.join('.') : numArr[0];
    },
    getPlace(value) {
      if (!value || value.toString().indexOf(".") == -1) return 0
      var index = value.toString().indexOf(".") + 1;
      var count = value.toString().length - index;
      return count
    },
    replaceImg(childItem) {
      let imgRegular = /&lt;img(\S|\s)*?&lt;\/img&gt;/g
      let imgList = []
      if (childItem) {
        const element = childItem.innerHTML
        imgList = element.match(imgRegular)
      } else {
        imgList = this.printTemplate.match(imgRegular)
      }
      if (imgList && imgList.length) {
        for (var i = 0; i < imgList.length; i++) {
          const item = imgList[i]
          if (this.getIsChildren(item) && !childItem) continue
          const width = this.getWidthHeight(item)
          const height = this.getWidthHeight(item, 'height')
          let value = this.getValue(item)
          const replaceImg = (template) => {
            if (childItem) {
              childItem.innerHTML = template
            } else {
              this.printTemplate = this.printTemplate.replace(item, template)
            }
          }
          let isArray = false
          try {
            isArray = Array.isArray(JSON.parse(value))
          } catch (error) {
            isArray = false
          }
          if (isArray) {
            const list = JSON.parse(value)
            let template = ''
            for (let index = 0; index < list.length; index++) {
              const element = list[index];
              if (element.url) {
                value = new RegExp('http').test(element.url) ? value : this.define.comUrl + element.url
                template += `<img width='${width}' height='${height}' src='${value}'/>`
              }
            }
            replaceImg(template)
          } else {
            value = new RegExp('http').test(value) ? value : this.define.comUrl + value
            let template = `<img width='${width}' height='${height}' src='${value}'/>`
            replaceImg(template)
          }
        }
      }
    },
    replaceBarCode(childItem) {
      let imgRegular = /&lt;barCode(\S|\s)*?&lt;\/barCode&gt;/g
      let imgList = []
      if (childItem) {
        const element = childItem.innerHTML
        imgList = element.match(imgRegular)
      } else {
        imgList = this.printTemplate.match(imgRegular)
      }
      if (imgList && imgList.length) {
        for (var i = 0; i < imgList.length; i++) {
          const item = imgList[i]
          if (this.getIsChildren(item) && !childItem) continue
          const width = this.getWidthHeight(item)
          const height = this.getWidthHeight(item, 'height')
          const value = this.getValue(item)
          const id = this.jnpf.idGenerator()
          // 先收集码生成的信息
          let info = {
            replaceStr: item,
            width, height,
            barcodeId: `barcode${id}`,
            value
          }
          this.barTemp.push(info)
        }
      }
    },
    replaceQrCode(childItem) {
      let imgRegular = /&lt;qrCode(\S|\s)*?&lt;\/qrCode&gt;/g
      let imgList = []
      if (childItem) {
        const element = childItem.innerHTML
        imgList = element.match(imgRegular)
      } else {
        imgList = this.printTemplate.match(imgRegular)
      }
      if (imgList && imgList.length) {
        for (var i = 0; i < imgList.length; i++) {
          const item = imgList[i]
          if (this.getIsChildren(item) && !childItem) continue
          const width = this.getWidthHeight(item)
          const height = this.getWidthHeight(item, 'height')
          const value = this.getValue(item)
          const id = this.jnpf.idGenerator()
          // 先收集码生成的信息
          let info = {
            replaceStr: item,
            width, height,
            barcodeId: `qrCode${id}`,
            value
          }
          this.qrTemp.push(info)
        }
      }
    },
    getWidthHeight(item, type = 'width') {
      let regular = ""
      if (type == 'width') regular = /width=[\"|'](.*?)[\"|']/gi;
      if (type == 'height') regular = /height=[\"|'](.*?)[\"|']/gi;
      let quotes = /["|'](.*)["|']/;
      let data = item.match(regular)
      let value = ""
      if (data && data.length) {
        let res = data[0].match(quotes)
        value = res && res.length ? res[1] : 100
      }
      return value
    },
    getValue(item) {
      let regexp = /((^(<|&lt;)[a-zA-Z-]+?){0,1}(>|&gt;))([\s\S]+)((<|&lt;)\/[a-zA-Z-]+((>|&gt;){0,1}))/g
      let data = regexp.exec(item)
      let value = data && data.length ? data[5] : ''
      let regexp_ = /<span(\S|\s)*?<\/span>/g
      let data_ = value.match(regexp_)
      if (data_ && data_.length) {
        let res = data_[0].match(regexp)
        value = res && res.length ? res[0] : ''
        value = value.replace('</span>', "");
        value = value.replace('>', "");
        return this.data[value] ? this.data[value] : value
      } else {
        return this.data[value] ? this.data[value] : value
      }
    },
    getIsChildren(item) {
      let regular = /data-tag=[\"|'](.*?)[\"|']/gi;
      let quotes = /["|'](.*)["|']/;
      let data = item.match(regular)
      if (data && data.length) {
        let res = data[0].match(quotes)
        data = res && res.length ? res[1] : ""
        if (data) {
          const dataTag = data.split('.')[0]
          if (dataTag && dataTag !== 'headTable' && dataTag !== 'null') return true
        }
      }
    },
    getJsBarcode(value, id, width, height) {
      if (!value) return
      JsBarcode(id, value, {
        width: width ? width : 4,
        height: height ? height : 80,
        displayValue: false
      });
    },
    getJsQrcode(value, id, width, height) {
      if (!value) return
      let dom = document.getElementById(id)
      if (!dom) return
      let qrcode = new QRCode(dom, {
        width: width ? width : 265,
        height: height ? height : 265, // 高度
        text: value, // 二维码内容
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      let canvas = qrcode._el.querySelector("canvas");//获取生成二维码中的canvas，并将canvas转换成base64
      let base64Text = canvas.toDataURL("image/png");
      return base64Text
    },
    getAmount(element) {
      let reg = /\((.+?)\)/g;
      let res = element.match(reg);
      let data = res ? res[0] : ''
      data = data.replace('(', '')
      data = data.replace(')', '')
      return data
    },
    word() {
      let print = this.$refs.tsPrint.innerHTML
      const blob = new Blob([print], {
        type: ''
      })
      const name = this.fullName ? `${this.fullName}.doc` : '下载文档.doc'
      this.downloadFile(blob, name)
    },
    downloadFile(data, name, type) {
      let blob = new Blob([data], {
        type: type || ''
      })
      let downloadElement = document.createElement('a')
      let href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = name
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
    },
    print() {
      let print = this.$refs.tsPrint.innerHTML
      print = print + `<style>html * {word-break:break-all}</style>`
      let iframe = document.createElement('IFRAME');
      document.body.appendChild(iframe);
      iframe.setAttribute("style", "position:absolute;width:0px;height:0px;left:-500px;top:-500px;");
      iframe.contentWindow.focus();
      let doc = iframe.contentWindow.document
      let _this = this
      iframe.onload = function () {
        let oldTitle = document.title;
        iframe.contentWindow.onafterprint = function (e) {
          let title = oldTitle.split('-')[0]
          let data = {
            printTitle: _this.fullName ? _this.fullName : title,
            printNum: 1,
            printId: _this.id
          }
          request({
            url: `/api/system/printLog/save`,
            method: "post",
            data
          }).then((res) => {
          });
        };
        document.title = "JNPF快速开发平台";
        iframe.contentWindow.print();
        document.title = oldTitle;
        document.body.removeChild(iframe);
      }
      doc.write(print);
      doc.close();
    },
  },
  mounted() {
  }
}
export default printOptionApi;
