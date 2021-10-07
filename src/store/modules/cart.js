const state = {
  // 记录所有的购物车数据
  // cartProducts: []
  // 要把数据持久化，目前这个demo只是在购物车的时候需要凸显一下，购物车应该从本地存储获取
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}

const getters = {
  // 悬浮框的东西，要显示 总共多少商品、总共多少钱
  getTotalCount (state) {
    // return state.cartProducts.length
    return state.cartProducts.reduce((prev, cur) => prev + cur.count, 0)
  },
  getTotalPrice (state) {
    return (state.cartProducts.reduce((prev, cur) => prev + cur.totalPrice, 0)).toFixed(2)
  },
  // 把选中的商品统计出来（要在购物车中显示：已选xx件商品，所以用了filter过滤）
  SelectedCount (state) {
    const prods = state.cartProducts.filter(item => item.isChecked === true)
    return prods.length === 0 ? 0 : prods.length
    // return state.cartProducts.reduce((prev, cur) => {
    //   if (cur.isChecked) {
    //     prev += cur.count
    //   }
    //   return prev
    // }, 0)
  },
  // 哎其实就是遍历它 并判断ischecked就好了，如果有你就加上去。。。是我搞复杂了
  SelectedPrice (state) {
    const prods = state.cartProducts.filter(item => item.isChecked === true)
    return prods.length === 0 ? 0 : prods.reduce((prev, cur) => prev + cur.totalPrice, 0)
    // return state.cartProducts.reduce((prev, cur) => {
    //   if (cur.isChecked) {
    //     prev += cur.totalPrice
    //   }
    //   return prev
    // }, 0)
  }
}

// mutation中的所有方法都是来更改状态的。都更改了购物车的数据
const mutations = {
  // 添加到购物车事件，是要接收一个商品参数
  AddToCart (state, product) {
    // 当添加购物车时，有2种情况：1、还没有这个商品 此时要把商品添加到数组中 2、已经有了就加一，要在购物车中选中，还要重新计算
    // 1. 没有：商品添加到数组，并增加count isChecked totalPrice
    // 2. 有：数量加一，选中 计算小计
    const prod = state.cartProducts.find(item => item.id === product.id)
    // 判断是否找到了
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product, // 商品对象本来就有的东西原封不动加进来，再附加一些我们想给的属性
        count: 1,
        isChecked: true,
        totalPrice: product.price // 没找到，那总价就是默认这个商品的价格（这里是一种商品的总价，不是所有商品）
      })
    }
  },
  // 感觉要删掉数组中某一件商品，要找到它的索引，然后根据索引去删，splice方法要根据索引
  DelFromCart (state, productID) {
    const index = state.cartProducts.findIndex(item => item.id === productID)
    // 判断索引是否存在
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  // 全选
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(prod => {
      prod.isChecked = checked
    })
  },
  updateProductChecked (state, { checked, prodId }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    prod && (prod.isChecked = checked)
  },
  // 点击+-计数，我们需要商品的id和它的count。直接把传过来的对象解构出来
  updateProuct (state, { prodId, count }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    if (prod) {
      prod.count = count
      prod.totalPrice = count * prod.price
    }
  }
}
const actions = {}

export default {
  // 为了方便模块管理，我们都开启 命名空间namespaced
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
