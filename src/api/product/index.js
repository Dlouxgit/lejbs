import request from '@/api/request'

function productList(data) {
  return request({
    url: '/api/leju/admin/product/list',
    method: 'get',
    data
  })
}

export default {
  productList
}
