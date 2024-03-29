// 配置路由信息
export default [{
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        mata: {
            show: true
        },
        // 二级路由组件
        children: [{
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        mata: {
            show: true
        }
    },
    {
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        mata: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        mata: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页必须是从购物车而来
            if (from.path == "/shopcart") {
                next()
            } else {
                // 其他的路由组件来的，停留在当前
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        mata: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        mata: {
            show: true
        }
    },
    {
        path: '/detail/:skuId',
        component: () =>
            import ('@/pages/Detail'),
        mata: {
            show: true
        }
    },
    {
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/search:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: {
            show: true
        },
        name: "search",
        props: true
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: {
            show: false
        }
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    },

]