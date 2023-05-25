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
      data: {},
      printTemplate: "",
      recordList: [],
      loading: false,
      showContainer: false,
      qrTemp: [],
      barTemp: [],
      thousandsPlaceMap: []
    }
  },
  methods: {
    initData() {
      this.barTemp = []
      this.qrTemp = []
      this.batchData = [];
      this.printTemplate = "";
    },
    async handleData(data, domCurrent, index) {
      return new Promise(async (resolve, reject) => {
        this.data = data.printData
        this.recordList = data.operatorRecordList || []
        this.$nextTick(async () => {
          this.printTemplate = domCurrent.innerHTML

          this.createTable(domCurrent)
         
          this.replaceOutValue(domCurrent)
          this.replaceSysValue()
          this.replaceQrCode()
          this.replaceBarCode()
          this.qrbarReplace()

          this.removeEmptyTable(domCurrent)

          const pageBreak = '<p style="page-break-after:always;"></p>'
          this.printTemplate = this.printTemplate.replace('<p><!-- pagebreak --></p>', pageBreak)
          // 移除文字
          this.printTemplate = this.printTemplate.replaceAll('大写金额(', '')
          this.printTemplate = this.printTemplate.replaceAll('千位分隔符(', '')
          this.thousandsPlaceMap.forEach(element => {
            this.printTemplate = this.printTemplate.replaceAll(element, '')
          });
          this.printTemplate = this.printTemplate.replaceAll(')', '')
          resolve(this.printTemplate)
        })
      })
    },
    removeEmptyTable() {

      var regex = /<table\s+style="border-collapse:\s*collapse;\s*width:\s*100%;\s*height:\s*(\d+)px;"\s+border="1"><div>/gi
      var matches = this.printTemplate.match(regex);
      if (matches) {
        for (var i = 0; i < matches.length; i++) {
          var match = matches[i];
          let str = match.replaceAll('\\', '');
          this.printTemplate = this.printTemplate.replaceAll(str, '')
        }
      }
    },
    createTr(table, tableKey, index) {
      let cloneTable = table.cloneNode(true);
      cloneTable.setAttribute('tableKey', tableKey + "." + index)
      if (index == 0) return cloneTable

      cloneTable.style.borderTop = 'none'
      let trs = cloneTable.querySelectorAll('tr')
      let tbody = cloneTable.querySelector('tbody')
      for (const tr of trs) {
        if (!tr.innerHTML.includes('{')) {
          tbody.removeChild(tr);
        }
      }
      return cloneTable;
    },
    createTable(domCurrent) {
      let tableList = domCurrent.querySelectorAll('table')
      for (let j = 0; j < tableList.length; j++) {
        let tableWrap = document.createElement('div');
        let table = tableList[j];
        let tableKey = this.getTableKey(table)
        let data = this.data[tableKey]
        if (data && Array.isArray(data)) {
          // 子表
          let tableSize = (data && Array.isArray(data)) ? data.length : 0
          for (let index = 0; index < tableSize; index++) {
            tableWrap.appendChild(this.createTr(table, tableKey, index))
          }
          this.replaceMe(table.innerHTML, tableWrap.innerHTML)
          this.replaceTableCell(tableWrap)
        } else {
          this.handleTable(table, null, null, 'main')
        }
      }
    },
    handleTable(table, tableKey, tableDataIndex, tag) {
      let allCells = table.querySelectorAll('td')
      for (const cell of allCells) {
        let tdDom = cell.querySelector("span")
        if (!tdDom) continue
        let dataTag = tdDom.getAttribute('data-tag')
        let reg = /\{(.+?)\}/g;
        let reg2 = /\((.+?)\)/g;
        let content = tdDom.innerText.match(reg);
        let place = tdDom.innerText.substring(tdDom.innerText.length - 3)
        // 异常数据处理
        if (!content) {
          content = tdDom.innerText.match(reg2);
          if (!content) continue
          content = content[0].replace("，", ",").replace('(', '').replace(')', '')
          if (['thousands'].includes(dataTag)) {
            if (!content.includes(',')) {
              this.parseThousand(tdDom, content, 0)
            } else {
              let value = content.split(',')[0]
              let place = content.split(',')[1]
              this.parseThousand(tdDom, value, place)
            }
          }
          if (['isAmountChinese'].includes(dataTag)) {
            this.parseChinese(tdDom, content)
            let replaceDom = tdDom.cloneNode(true);
            replaceDom.innerHTML = getAmountChinese(content)
            this.replaceMe(tdDom.outerHTML, replaceDom.outerHTML)
          }
          continue
        }

        // 正常数据逻辑
        content = content[0].replace('{', '').replace('}', '')
        let mainValue = ''
        if (tag == 'main') {
          mainValue = this.data[content]
        }

        let value = mainValue ? mainValue : this.data[tableKey][tableDataIndex][content]
        let isImg = cell.innerText.includes("<img width='100' height='100'>")
        if (isImg) {
          this.replaceMyImg(cell, value)
        }

        if (!value) return

        if (['thousands'].includes(dataTag)) {

          if (place.charAt(0) === ',') place = place.charAt(1)
          place = isNaN(place) ? 0 : place
          this.parseThousand(tdDom, value, place)
        }
        if (['isAmountChinese'].includes(dataTag)) {
          this.parseChinese(tdDom, value)
        }
        this.replaceMe(tdDom.outerHTML, value)

      }
    },
    replaceTableCell(domCurrent) {
      const tableList = domCurrent.querySelectorAll('table')
      for (let j = 0; j < tableList.length; j++) {
        let table = tableList[j]
        let tableData = table.getAttribute("tableKey")
        if (!tableData) continue
        let tableKey = tableData.split('.')[0]
        let tableDataIndex = tableData.split('.')[1]

        this.handleTable(table, tableKey, tableDataIndex, null)

      }

    },
    /**获取节点的数字精度位数 */
    placeNum(dom) {
      let place = dom.innerText.substring(dom.innerText.length - 3)
      if (place.charAt(0) === ',') place = place.charAt(1)
      place = isNaN(place) ? 0 : place
      return place
    },
    /**替换表格以外的数字 */
    replaceMyNum(element, dataTag) {
      let spanNum = element.querySelectorAll('span')
      let last = spanNum[spanNum.length - 1]
      let pre = spanNum[spanNum.length - 2]
      let place = this.placeNum(pre)
      let spanTag = last.getAttribute('data-tag')
      if (!spanTag) return

      let tableKey = spanTag.split('.')[0]
      let field = spanTag.split('.')[1]
      let value = ''
      if (tableKey == 'headTable') {
        value = this.data[field]
      } else {
        if (!field) return
        if (Array.isArray(this.data[tableKey])) {
          for (const arr of this.data[tableKey]) {
            value = arr[field]
          }
        }

      }
      if (dataTag == 'thousands') {
        this.parseThousand(pre, value, place)
      }

      if (dataTag == 'isAmountChinese') {
        this.parseChinese(pre, value)
      }
    },
    replaceMyImg(dom, data) {
      let list = JSON.parse(data)
      
      if(JSON.stringify(list)=='[]'){
        let replaceDom = dom.cloneNode(true);
        replaceDom.innerHTML = ''
        this.replaceMe(dom.innerHTML, replaceDom.innerHTML)
      }
      let template = ''
      const width = this.getWidthHeight(dom.innerHTML)
      const height = this.getWidthHeight(dom.innerHTML, 'height')
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.url) {
          let value = this.define.comUrl + element.url
          template += `<img width='${width}' height='${height}' src='${value}'/>`
        }
      }

      let replaceDom = dom.cloneNode(true);
      replaceDom.innerHTML = template
      this.replaceMe(dom.innerHTML, replaceDom.innerHTML)
     
    },
    replaceOutValue(dom) {
      let dataList = dom.querySelectorAll('p')
      for (const element of dataList) {
        let innerText = element.innerText.trim()
        if (!innerText.includes('{') && !innerText.includes('(')) continue

        let span = element.querySelector('span')
        if (!span.getAttribute('data-tag')) continue
        let dataTag = span.getAttribute('data-tag').split('.')[0]
        let dataKey = span.getAttribute('data-tag').split('.')[1]

        span.getAttribute('data-tag').split('.')[0]

        let isQrcode = element.innerText.includes("<qrCode width='100' height='100'>")
        let isBarcode = element.innerText.includes("<barCode width='100' height='100'>")
        if (isQrcode || isBarcode) continue


        if (['thousands', 'isAmountChinese'].includes(dataTag)) {
          this.replaceMyNum(element, dataTag)
        } else {
          let isImg = element.innerText.includes("<img width='100' height='100'>")
          if (dataTag == 'headTable') {
            if (isImg) {
              this.replaceMyImg(element, this.data[dataKey])
            } else {
              this.replaceMe(element.innerHTML, this.data[dataKey])
            }
          } else {
            let subData = this.data[dataTag] && this.data[dataTag].length > 0 && this.data[dataTag][0]
            if (subData) {
              if (isImg) {
                this.replaceMyImg(element, subData[dataKey])
              } else {
                this.replaceMe(element.innerHTML, subData[dataKey])
              }
            }
          }
        }
      }
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
    parseThousand(dom, value, place) {
      let span = dom.querySelector('span')
      let replaceDom = ''
      if (span) {
        replaceDom = span.cloneNode(true);

        replaceDom.innerHTML = this.getThousands(value, place)
        this.replaceMe(span.outerHTML, replaceDom.outerHTML)
      } else {
        // 异常数据
        replaceDom = dom.cloneNode(true);

        replaceDom.innerHTML = this.getThousands(value, place)
        this.replaceMe(dom.outerHTML, replaceDom.outerHTML)
      }

      this.thousandsPlaceMap.push(`,${place})`)

    },
    parseChinese(dom, value) {

      let span = dom.querySelector('span')
      let replaceDom = ''
      if (span) {
        replaceDom = span.cloneNode(true);
        replaceDom.innerText = getAmountChinese(value)
        this.replaceMe(span.outerHTML, replaceDom.outerHTML)
      } else {
        // 异常数据
        replaceDom = dom.cloneNode(true);
        replaceDom.innerText = getAmountChinese(value)
        this.replaceMe(dom.outerHTML, replaceDom.outerHTML)
      }

    },
    replaceMe(key, value) {
      this.printTemplate = this.printTemplate.replace(key, value)
    },
    getTableKey(dom) {
      let tdDoms = dom.querySelectorAll('span')
      for (let tdDom of tdDoms) {
        let dataTag = tdDom.getAttribute('data-tag')
        if (['thousands', 'isAmountChinese'].includes(dataTag)) {
          tdDom = tdDom.querySelector('span')
          dataTag = tdDom.getAttribute('data-tag')
        }
        if (dataTag) {
          return dataTag.split(".")[0]
        }
      }
      return ''

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
      value = Number(value).toFixed(place)
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
    closeDialog() {
      this.$emit('update:visible', false)
    },
  },
  mounted() {
  }
}
export default printOptionApi;
