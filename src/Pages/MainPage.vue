<template>
    <HomePage>
        
        <div>
            <ProductsComponent></ProductsComponent>
        </div>
    </HomePage>
</template>


<script>
import ProductsComponent from '@/components/ProductsComponent.vue';
import HomePage from './HomePage.vue';

export default {
    name:'MainPage',
    components:{
        HomePage,
        ProductsComponent
    },
    data() {
        return {
            
        }
    },
}
</script>