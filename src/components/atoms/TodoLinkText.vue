<template>
    <a class="todo-link" @click="$emit('click')">
        <slot />
    </a>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.todo-link {
    font-size: 13px;
    color: #195CB3;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>