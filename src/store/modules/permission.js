import { asyncRouterMap, constantRouterMap } from '@/router/index'

//递归函数
// function hasPermission(roles, route) {
//     if (route.meta && route.meta.roles) {
//         return roles.some(role => route.meta.roles.includes(role))
//     } else {
//         return true
//     }
// }
function hasPermission(roles, route) {
    if(route.children && route.children[0].meta.roles){
        return roles.some(role => route.children[0].meta.roles.includes(role))
    }
}
//过滤异步路由,返回符合用户角色权限的路由表
function filterAsyncRouter(routes, roles) {
    const res = []
  console.log('这里是filterAsyncRouter')
  console.log(routes)
    routes.forEach(route => {
      const tmp = { ...route }
      console.log('这里是tmp')
      console.log(tmp)
      if (hasPermission(roles, tmp)) {
        // if (tmp.children) {
        //   tmp.children = filterAsyncRouter(tmp.children, roles)
        // }
        res.push(tmp)
      }
    })
  
    return res
  }


const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        //设置动态路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const  roles  = data
                console.log(roles[0])
                let accessedRouters
                if (roles.includes('super_admin')){
                    accessedRouters = asyncRouterMap
                }else {
                    console.log('这里是GenerateRoutes')
                    accessedRouters = filterAsyncRouter(asyncRouterMap,roles)
                }
                commit('SET_ROUTERS',accessedRouters)
                resolve()
            })
        }
    }
}

export default permission