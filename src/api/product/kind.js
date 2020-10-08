import request from '@/api/request'

function kindList(data) {
  return request({
    url: '/api/leju/admin/kind/list',
    method: 'get',
    data
  })
}

export default {
  kindList
}
