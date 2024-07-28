<template>
    <HomePage>
    <div>
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0">
        Your cart is empty.
      </div>
      <div v-else>
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>
                <img :src="item.image" :alt="item.title" class="cart-image" />
                <div class="product-title">{{ item.title }}</div>
              </td>
              <td>{{ item.description }}</td>
              <td>
                <button @click="decrementItem(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="incrementItem(item)">+</button>
              </td>
              <td>$.{{ item.price }}</td>
              <td>$.{{ item.price * item.quantity }}</td>
              <td>
                <button @click="removeItem(item)">Remove</button>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="total-label">Total Amount:</td>
              <td colspan="2" class="total-amount">$.{{ totalAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </HomePage>
  </template>
  
  <script>
import HomePage from './HomePage.vue';

  export default {
    name: 'CartPage',
    components:{
        HomePage
    },
    data() {
      return {
        cartItems: [], // Initially empty
      };
    },
    mounted() {
      this.loadCartItems();
    },
    computed: {
      totalAmount() {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    methods: {
      loadCartItems() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      },
      incrementItem(item) {
        item.quantity += 1;
        this.updateCart();
      },
      decrementItem(item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        }
        this.updateCart();
      },
      removeItem(item) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        this.updateCart();
      },
      updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .cart-table th,
  .cart-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .cart-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .cart-image {
    width: 100px;
    height: auto;
  }
  
  .product-title {
    margin-top: 10px;
    font-weight: bold;
  }
  
  button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ddd;
  }
  
  .total-label {
    text-align: right;
    font-weight: bold;
  }
  
  .total-amount {
    font-weight: bold;
    color: #007bff;
  }
  </style>
  