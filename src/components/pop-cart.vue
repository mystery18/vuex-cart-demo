<template>
  <el-popover
    width="350"
    trigger="hover"
  >
    <!-- 购物车组件的列表 是从vuex中的拿到的数据，vux中的购物车数据是从首页商品添加到购物车的 -->
    <el-table :data="cartProducts" size="mini">
      <el-table-column property="title" width="130" label="商品"></el-table-column>
      <el-table-column property="price" label="价格"></el-table-column>
      <el-table-column property="count" width="50" label="数量"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="DelFromCart(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 商品数量和价格的统计用 getters ，因为刚好数据也在vuex中 -->
    <div>
      <p>共 {{ getTotalCount }} 件商品 共计¥{{ getTotalPrice }}</p>
      <el-button size="mini" type="danger" @click="$router.push({ name: 'cart' })">去购物车</el-button>
    </div>
    <el-badge :value="getTotalCount" class="item" slot="reference">
      <el-button type="primary">我的购物车</el-button>
    </el-badge>
  </el-popover>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'PopCart',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['getTotalCount', 'getTotalPrice'])
  },
  methods: {
    ...mapMutations('cart', ['DelFromCart'])
  }
  // data () {
  //   return {
  //     cartProducts: [
  //       { id: 1, title: 'iPad Pro', price: 500.01, isChecked: false, count: 0 },
  //       { id: 2, title: 'H&M T-Shirt White', price: 10.99, isChecked: false, count: 0 },
  //       { id: 3, title: 'Charli XCX - Sucker CD', price: 19.99, isChecked: false, count: 0 }
  //     ]
  //   }
  // }
}
</script>

<style>

</style>
