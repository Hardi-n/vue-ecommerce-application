<template>
    <div class="header-container">
      <!-- This is header Component -->
      <div class="logo">
        <router-link to="/">
          TeeRex Store
        </router-link>
      </div>
      <div class="nav-items">
        <span class="nav-link">
          Products
        </span>
        <span class="nav-link">
          <router-link to="/CartPage">
            <img src="../assets/shopping-cart.png" alt="Cart" class="cart-icon" />
          </router-link>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  .header-container {
    background-color: rgb(218, 210, 210); /* Light gray background */
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
  
  .nav-items {
    display: flex;
    align-items: center;
  }
  
  .nav-link {
    margin-left: 20px;
    font-size: 1rem;
  }
  
  .nav-link a {
    text-decoration: none;
    color: #333;
  }
  
  .nav-link a:hover {
    color: #007bff; /* Hover color for links */
  }
  
  .cart-icon {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 768px) {
    .header-container {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .nav-items {
      margin-top: 10px;
    }
  
    .nav-link {
      margin-left: 0;
      margin-right: 20px;
    }
  }
  </style>
  