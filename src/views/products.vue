<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <!-- <template slot-scope="scope"> -->
        <!-- 在template位置用作用域插槽获取插槽数据 vue2.6之后，上面这个已经过时了  -->
        <template v-slot="scope">
          <!-- 点击加入购物车，需要传入当前的商品数据！ -->
          <el-button @click="AddToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'ProductList',
  // 因为模块中开启了命名空间，所以这里的mapState的第一个参数是命名空间 在modules中写的模块的名字。然后是我们要映射过来的属性products
  computed: {
    ...mapState('products', ['products']) // 从vuex拿数据，渲染到商品列表页
  },
  methods: {
    ...mapActions('products', ['getProducts']), // 第二个参数是你action的名字（调用这个方法，获取商品）
    ...mapMutations('cart', ['AddToCart']) // 添加购物车事件 要传参的（放到vuex中）
  },
  created () {
    // 当组件创建完毕，调用getProducts方法 发送请求，获取商品数据，把商品数据放到vuex（异步请求，所以用actions）
    this.getProducts()
  }
  // data () {
  //   return {
  //     products: [
  //       { id: 1, title: 'iPad Pro', price: 500.01 },
  //       { id: 2, title: 'H&M T-Shirt White', price: 10.99 },
  //       { id: 3, title: 'Charli XCX - Sucker CD', price: 19.99 }
  //     ]
  //   }
  // }
}
</script>

<style></style>
