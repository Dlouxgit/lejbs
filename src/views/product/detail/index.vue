<template>
  <div class="product-detail-main">
    <div class="step-bar">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" />
      </el-steps>
    </div>
    <el-card class="card-form card">
      <el-form ref="product" :model="product" label-width="80px">

        <!-- 第二步表单内容开始 -->
        <div v-show="active == 1" class="step-two">
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="详情标题">
                <el-input v-model="product.detail_title" size="small" placeholder="仙女凳/减肥凳" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="副标题">
                <el-input
                  v-model="product.detail_desc"
                  size="small"
                  placeholder="仙女凳/减肥凳/红色/绿色/黄色/橘黄色"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="20">
              <el-form-item label="添加sku">
                <span>颜色:</span>
                <div class="sku-color-list">
                  <el-checkbox-group v-model="attrSelectArr">
                    <el-checkbox v-for="colorAttr in tempSkuAttrs" :key="colorAttr.id" :style="{color: colorAttr.color}" :label="colorAttr.id">{{ colorAttr.color_text }}</el-checkbox>
                  </el-checkbox-group>
                  <el-button type="primary" size="small" @click="createSkuList">生成sku列表</el-button>

                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col :span="6">
                <el-input v-model="tempColor.color_text" size="small" placeholder="颜色描述" />
              </el-col>
              <el-col :span="6" :offset="1">
                <el-input v-model="tempColor.color" size="small" placeholder="色号,16进制,比如#ffaacc" />
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small" @click="createSkuAttr">创建sku属性</el-button>
              </el-col>
              <el-col :span="24">
                <el-table :data="skuList" border stripe>
                  <el-table-column label="颜色描述" prop="color_text" width="200" />
                  <el-table-column label="色号:" prop="color" width="200" />
                  <el-table-column label="sku编号" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sku_code" size="small" placeholder="sku编号" />
                    </template>
                  </el-table-column>
                  <el-table-column label="价格" prop="color_text" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price" size="small" placeholder="价格" />
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" prop="color_text" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.count" size="small" placeholder="库存" />
                    </template>
                  </el-table-column>
                </el-table>

              </el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="轮播图" />
            </el-col>
            <el-col :span="16" />
          </el-row>
          <div>
            <el-form-item label="商品详情">
              <!-- <TinEditor ref="tin" upload-url="http://bufantec.com/api/leju/admin/material/uploadImg" /> -->
            </el-form-item>
          </div>
        </div>
        <!-- 第三步表单内容开始 -->
        <div v-show="active == 2" class="step-three">
          <el-form-item label="第三步">
            <el-input v-model="product.gname" />
          </el-form-item>
        </div>

      </el-form>
      <el-button type="primary" @click="goPre">上一步</el-button>
      <el-button type="primary" @click="goNext">下一步</el-button>

    </el-card>

  </div>
</template>

<script>
import kindApi from '@/api/product/kind'
import _ from 'lodash'
export default {
  name: 'ProductDetail',
  components: {

  },
  data() {
    return {
      active: 1,
      product: {
        cover_img: '',
        kindIds: []
      },
      brandList: [],
      cityOptions: [],
      selectedCity: [],
      kindList: [],
      seriesList: [],
      tempColor: {}, // 临时的颜色model
      tempSkuAttrs: [], // 临时行的sku颜色属性的集合
      attrSelectArr: [], // 选中的sku属性集合
      skuList: [] // 最终生成的sku列表集合
    }
  },
  computed: {

  },
  created() {
    //   1. 初始化分类列表
    this.getKindList()
  },
  mounted() {

  },
  methods: {
    stepNext() {
      if (this.active++ > 2) this.active = 0
    },
    goPre() {
      if (this.active === 0) return
      this.active--
    },
    goNext() {
      if (this.active === 2) return
      this.active++
    },
    // 上传成功回调
    coverSuccess(response) {
      this.product.cover_img = response.ossUrl
    },
    getKindList() {
      kindApi.kindList()
        .then(res => {
          this.kindList = res.data
        })
    },
    // 创建sku的属性,这里指颜色
    createSkuAttr() {
      // 从临时颜色model中取值 push到列表
      // clone
      var colorObj = _.clone(this.tempColor)
      this.tempSkuAttrs.push({
        id: new Date().getTime(),
        ... colorObj
      })
      this.tempColor = {}
    },
    // 根据颜色生成sku列表
    createSkuList() {
      // 通过对生成的sku进行过滤 把过滤后的结果生成到skuList中
      this.skuList = this.tempSkuAttrs.filter(item => this.attrSelectArr.includes(item.id))
    }
  }
}
</script>

<style scoped lang="scss">
    .product-detail-main{
        .card{
            margin: 30px;
        }
        .step-bar{
            width: 900px;
            margin: 30px auto;
        }
        .cover-img{
            width: 100px;
            height: 100px;
        }
    }
</style>

