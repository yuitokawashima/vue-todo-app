<template>
    <button
        :type="type"
        :class="[variation]"
        :disabled="disabled"
        class="todo-button"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        variation: {
            type: String,
            default: 'normal'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.todo-button {
    position: relative;
    -webkit-appearance: none;
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #4db6ac;
    border-radius: 4px;
    background-color: #4db6ac;
    color: #FFFFFF;
    transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
    outline: none;
    cursor: pointer;

    &:active {
        box-shadow: $shadow-base;
    }

    &:hover {
        background-color: #26a69a;
    }

    &[disabled] {
        background-color: #E1E1E1;
        border-color: #E1E1E1;
        color: #C0C0C0;
        cursor: not-allowed;
    }
}
</style>