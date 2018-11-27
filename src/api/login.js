import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
/*{
  "code": 20000,
  "data": {
    "roles": [
      "admin"
    ],
    "name": "admin",
    "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  }
}*/
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
/*{
  "code": 20000,
  "data": "success"
}*/
