<template>
    <div>
        book
    </div>
</template>

<script>
export default {
    created(){
        
        this.$emit('switchTab', 'book');
    }
}
</script>


<style lang="scss" scoped>

</style>
