import Vue from 'vue'
import Router from 'vue-router'

// 页面级组件

Vue.use(Router)

let router = new Router({
	routes: [{
			path: '/login',
			alias: "/",
			name: 'Login',
			component: () => import("./views/User/Login.vue"),
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import("./views/User/Register.vue"),
		},
		{
			path: '/user/',
			name: 'User',
			component: () => import("@/components/Layout.vue"),
			children: [{
				path: 'list',
				name: 'UserList',
				component: () => import("./views/User/List.vue"),
			}, {
				path: 'group',
				name: 'UserGroup',
				component: () => import("./views/User/Group.vue"),
			}, {
				path: 'edit/:id',
				name: 'UserEdit',
				props: true,
				component: () => import("./views/User/Edit.vue"),
			}],
		}, {
			path: '/article/',
			name: 'Article',
			component: () => import("@/components/Layout.vue"),
			children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import("./views/Article/List.vue"),
			}, {
				path: 'edit/:id',
				name: 'ArticleEdit',
				props: true,
				component: () => import("./views/Article/Edit.vue"),
			}, {
				path: 'release',
				name: 'ArticleRelease',
				component: () => import("./views/Article/Release.vue"),
			}, ],
		}, {
			path: '/category/',
			name: 'Category',
			component: () => import("@/components/Layout.vue"),
			children: [{
				path: 'list',
				name: 'CategoryList',
				component: () => import("./views/Category/List.vue"),
			}],
		}
	]
})

export default router
