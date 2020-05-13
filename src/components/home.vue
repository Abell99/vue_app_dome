<template>
  <el-container>
    <el-header style="text-align: center;">主页顶部区域</el-header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>这是一个Form表单</span>
          <el-button type="text" style="float: right; padding: 3px 0" round> 关闭 </el-button>
        </div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="input">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职业类型">
          <el-button plain @click="dialogVisible = true">{{job}}</el-button>
          </el-form-item>
          <el-form-item label="级联选择器">
            <div class="block">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"></el-cascader>
            </div>
            <el-button type="text" @click="open">弹窗上面的三级联动</el-button>
          </el-form-item>

          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-tabs :tab-position="tabPosition" style="height: 300px;">
        <el-tab-pane label="用户管理">
          <el-radio v-model="radio" :label="item.name" v-for="item in cityArr" :key="item.name" @change="city=item.name">{{item.name}}</el-radio>
          <el-card class="box-card" style="margin-top: 40px">
            <el-button v-for="item in districtArr" :key="item.name" @click="job=item.name">{{item.name}}</el-button>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-footer style="text-align: center;">主页底部区域</el-footer> -->
  </el-container>
</template>
<script src="https://www.jq22.com/jquery/vue.min.js"></script>
<script type="text/javascript" src="../assets/items.js"></script>
<script>
var arrAll =
    [
      {
        name: "厨房",
        sub: [
          {name: "请选择", sub: []},
          {
            name: "电路",
            sub: [{name: "请选择"}, {name: "灯具"},{name: "电闸"},{name: "房屋停电"},{name: "开关"},{name: "排风扇"},{name: "插座"},{name: "线路"},],
            type: 0
          },{
            name: "电器",
            sub: [{name: "请选择"}, {name: "电磁炉"},{name: "油烟机"},{name: "热水器"},{name: "燃气灶"},{name: "微波炉"}],
            type: 0
          },{
            name: "家具",
            sub: [{name: "请选择"}, {name: "电热水壶"}],
            type: 0
          },{
            name: "家居",
            sub: [{name: "请选择"}, {name: "桌台"}],
            type: 0
          },{
            name: "疏通",
            sub: [{name: "请选择"}, {name: "地漏疏通"},{name: "洗池疏通"},{name: "管道疏通"}],
            type: 0
          },{
            name: "水暖",
            sub: [{name: "请选择"}, {name: "闸门"},{name: "水龙头"},{name: "水管"},{name: "主管道"},{name: "暖气"}],
            type: 0
          },{
            name: "锁类",
            sub: [{name: "请选择"}, {name: "机械锁"},{name: "门锁"}],
            type: 0
          },{
            name: "主体",
            sub: [{name: "请选择"}, {name: "窗户"}],
            type: 0
          },
        ], type: 1
      },
      {
        name: "客厅",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
      {
        name: "客厅卫生间",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
      {
        name: "客厅阳台",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
      {
        name: "卧室",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
      {
        name: "卧室阳台",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
      {
        name: "卧室卫生间",
        sub: [{name: "请选择", sub: []},
          {
            name: "餐桌",
            sub: [{name: "请选择"}, {name: "桌角"}],
            type: 0
          }],
        type: 1
      },
    ]
export default {
  data () {
    return {
      aaaa: '',
      radio: '1',
      job: '请选择职业',
      arr: arrAll,
      prov: '厨房',
      city: '电路',
      district: '灯具',
      cityArr: [],
      districtArr: [],
      tabPosition: 'left',
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      value: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleChange (value) {
      console.log(value)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    open () {
      this.dialogVisible = true
      // this.$router.push('ganged')
    },
    updateCity: function () {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1].name;
    },
    updateDistrict: function () {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = '';
      }
    },
    BIAN: function (a) {
      console.log(a)
    }
    // updateDistrict: function () {
    //   // districtArr
    //   for (var item in this.arr[0][2]) {
    //       console.log(item)
    //   }
    // }
  },
  beforeMount: function () {
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    prov: function () {
      this.updateCity();
      this.updateDistrict();
    },
    city: function () {
      this.updateDistrict();
    },
    cityArr: function () {
      this.updateDistrict()
    }
  }
}
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
    >.el-main {
      >.el-card {
        margin: 10px auto;
        width: 60%;
      }
    }
  }
</style>
