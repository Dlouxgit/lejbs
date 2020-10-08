<template>
  <div class="product-main">
    <el-card class="card search-bar" shadow="hover">
      <div slot="header">
        <span>搜索栏</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
      </el-row>
      <el-row :gutter="30" style="margin-top: 30px">
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button type="primary" size="small" @click="doSearch">搜索</el-button>

        </el-col>

      </el-row>

    </el-card>

    <!-- 数据部分开始 -->
    <el-card class="container card">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">新增</el-button>
      </div>
      <el-table v-loading="loading" :data="productList" border stripe>
        <el-table-column
          v-for="col in columns"
          :key="col.id"
          :prop="col.id"
          :label="col.label"
          :width="col.width"
        />
      </el-table>

      <el-pagination
        :current-page="page.start"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"
        @size-change="sizeChange"
        @current-change="currentChange"
      />

    </el-card>

  </div>
</template>

<script>
import productApi from '@/api/product/index'
import _ from 'lodash'
export default {
  name: 'ProductList',
  components: {

  },
  data() {
    return {
      loading: false,
      search: {

      },
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
        totalCount: 0
      },
      productList: []
    }
  },
  computed: {

  },
  created() {
    this.getProductList()
  },
  mounted() {

  },
  methods: {
    doSearch() {
      // 重置分页
      this.page.start = 1
      this.getProductList()
    },
    async getProductList() {
      this.loading = true
      // 条件查询
      var params = {
        ...this.search,
        start: this.page.start,
        limit: this.page.limit
      }
      // 需要对params过滤无效条件
      params = _.pickBy(params, item => item)
      var res = await productApi.productList(params)
      // 结果  对象  分页数据和list
      this.productList = res.data.list
      // 重置分页数量
      this.page.totalCount = res.data.totalRow
      // 关闭loading
      this.loading = false
    },
    // 去新增页面
    goAdd() {
      // 跳转
      this.$router.push({ name: 'productAdd' })
    },
    sizeChange(v) {
      this.page.limit = v
      this.getProductList()
    },
    currentChange(v) {
      this.page.start = v
      this.getProductList()
    }

  }
}
</script>

<style scoped lang="scss">
    .product-main{
        .card{
            margin: 30px;
        }
    }
</style>
