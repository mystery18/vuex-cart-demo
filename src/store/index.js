import Vue from 'vue'
import Vuex from 'vuex'
// 1. 注册刚刚那两个模块
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

// 定义这个插件
const myPlugin = store => {
  store.subscribe((mutation, state) => {
    // 首先判断当前提交的mutation是否是cart模块的mutation
    if (mutation.type.startsWith('cart/')) {
      // 每次mutation 我都把购物车重新丢进localstorage
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 2. 配置这两个模块
    products,
    cart
  },
  // 注册插件
  plugins: [myPlugin]
})
