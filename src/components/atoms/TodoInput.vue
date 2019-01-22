<template>
    <input
        v-model="value"
        :class="{small}"
        :type="type"
        :placeholder="placeholder"
        @input="update"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
    >
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: null
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        update (e) {
            this.$emit('input', e.target.value);
            this.$emit('change', e.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

input {
    -webkit-appearance: none;
    border: 1px solid $bd-color-base;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 15px;
    width: 100%;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;
    color: $text-color-base;

    &:focus {
        outline-color: #4db6ac;
    }

    &.small {
        padding: 4px 12px;
        font-size: 14px;
        max-width: 180px;
    }
}
</style>