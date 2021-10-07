<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartProducts"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <template v-slot:header>
          <!-- 全选框与计算属性绑定，get遍历vuex购物车里所有商品的状态，有一个false就返回false -->
          <el-checkbox size="mini" v-model="checkedAll">
          </el-checkbox>
          <!-- set即你修改的时候，把值传过去给vuex，并且把该状态赋值给所有商品的isChecked属性 -->
        </template>
        <!--
          @change="updateProductChecked"  默认参数：更新后的值
          @change="updateProductChecked(productId, $event)"  123, 原来那个默认参数
            当你传递了自定义参数的时候，还想得到原来那个默认参数，就手动传递一个 $event
         -->
        <template v-slot="scope">
          <!-- 首先绑定当前商品的状态 -->
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({ prodId: scope.row.id, checked: $event })"
          >
          </el-checkbox>
          <!-- 单选框，每次点击都要获取该商品的id和是否checked，把他们两个传给vuex，让他在商品购物车里找这个商品 -->
          <!-- 之所以要这两个值：1、根据id去找这个商品；2、找到这个商品，把该状态赋值给isChecked -->
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <template v-slot="scope">
          <!-- $event就是 事件触发的时候，传递过来的参数，即我们文本框中的值 -->
          <el-input-number :min="1" size="mini" :value="scope.row.count" @change="updateProuct({ prodId: scope.row.id, count: $event })"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="DelFromCart(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ SelectedCount }}</span> 件商品，总价：<span>{{ SelectedPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['SelectedCount', 'SelectedPrice']),
    checkedAll: {
      get () {
        // 返回当前购物车中的商品是否都是选中状态，如果有一个没有选中直接返回false
        return this.cartProducts.every(prod => prod.isChecked)
      },
      // set是CheckBox状态改变的时候，会执行的方法，它需要一个参数 接收当前CheckBox的状态
      set (value) {
        this.updateAllProductChecked(value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['updateAllProductChecked', 'updateProductChecked', 'updateProuct', 'DelFromCart'])
  }
}
</script>

<style></style>
