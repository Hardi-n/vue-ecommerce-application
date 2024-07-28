<template>
    <HeaderComponent/>
    <slot/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: 'HomePage',
    components: {
        HeaderComponent,
    },
}
</script>

<style scoped>
/* Your styles here */
</style>
