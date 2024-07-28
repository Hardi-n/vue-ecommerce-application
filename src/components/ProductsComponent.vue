<template>
  <div>
    <div class="filters">
      <h2>Filter by Category</h2>
      <div v-for="category in categories" :key="category">
        <label>
          <input
            type="checkbox"
            :value="category"
            v-model="selectedCategories"
          />
          {{ category }}
        </label>
      </div>
    </div>
    <div class="main-content">
      <input
        type="text"
        placeholder="Search"
        v-model="search"
      />
      <label for="">Search Here</label>
      <div class="container">
        <h1>Product List</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error loading data</div>
        <div v-else>
          <div class="product-grid">
            <div
              class="product"
              v-for="item in filterItems()"
              :key="item.id"
            >
              <div class="product-info">
                <h2 class="product-title">{{ item.title }}</h2>
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="product-image"
                />
                <div class="product-footer">
                  <p class="product-price">$.{{ item.price }}</p>
                  <div v-if="isInCart(item)">
                    <button @click="decrementItem(item)">-</button>
                    <span>{{ getCartItemQuantity(item) }}</span>
                    <button @click="incrementItem(item)">+</button>
                  </div>
                  <button v-else @click="addToCart(item)" class="add-to-cart-button">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductsComponent",
  data() {
    return {
      items: [],
      loading: true,
      error: false,
      search: '',
      selectedCategories: [],
      categories: [], // to store unique categories
      cart: JSON.parse(localStorage.getItem('cart')) || [], // Load cart from localStorage
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.items = response.data;
        this.extractCategories();
      } catch (error) {
        console.error("Error fetching data:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    extractCategories() {
      const categoriesSet = new Set(this.items.map(item => item.category));
      this.categories = Array.from(categoriesSet);
    },
    filterItems() {
      return this.items.filter(item =>
        (this.selectedCategories.length === 0 || this.selectedCategories.includes(item.category))
        && item.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    addToCart(item) {
      const cartItem = { ...item, quantity: 1 };
      this.cart.push(cartItem);
      this.updateCart();
    },
    incrementItem(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      cartItem.quantity += 1;
      this.updateCart();
    },
    decrementItem(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
      }
      this.updateCart();
    },
    isInCart(item) {
      return this.cart.some(cartItem => cartItem.id === item.id);
    },
    getCartItemQuantity(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      return cartItem ? cartItem.quantity : 0;
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
};
</script>

<style scoped>
.filters {
  float: left;
  width: 20%;
  padding: 20px;
}

.main-content {
  float: right;
  width: 75%;
  padding: 20px;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  height: 200px; /* Fixed height for images */
  object-fit: cover; /* Ensure the image covers the area without distortion */
  margin-bottom: 10px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
}

.add-to-cart-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
}
</style>
