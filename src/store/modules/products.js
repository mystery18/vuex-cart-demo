// import axios from 'axios'

const state = {
  // 实现商品列表，可以把商品列表中的数据存储到这个模块中
  // 1. 在state中定义一个属性 记录所有的商品数据
  // 2. 在mutations中添加一个方法来修改数据
  // 3. 在actions中增加一个方法来**异步向接口请求商品数据**
  products: [] // 我们要映射过去的属性
}
const getters = {}
const mutations = {
  setProducts (state, payload) {
    state.products = payload
  }
}

// 请求接口获取数据（所以得导入axios）
const actions = {
  // 我们可以直接把context中需要的内容给解构出来，我们这只需要commit方法
  getProducts ({ commit }) {
    // const { data } = await axios({
    //   methods: 'GET',
    //   url: 'http://127.0.0.1:3000/products'
    // })
    // 获取到数据之后，把结果存储到state中，我们需要提交mutation
    // commit('setProducts', data)
    commit('setProducts', [
      { id: 1, title: 'iPad Pro', price: 500.01 },
      { id: 2, title: 'H&M T-Shirt White', price: 10.99 },
      { id: 3, title: 'Charli XCX - Sucker CD', price: 19.99 }
    ])
  }
}

export default {
  // 为了方便模块管理，我们都开启 命名空间namespaced
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
