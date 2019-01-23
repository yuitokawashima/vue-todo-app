<template>
    <input
        :value="value"
        :class="classes"
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
        },
        wSmall: {
            type: Boolean,
            default: false
        },
        wMedium: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        classes () {
            return {
                'small': this.small,
                'w-small': this.wSmall,
                'w-medium': this.wMedium,
            }
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
    padding: 0 16px;
    font-size: 15px;
    width: 100%;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;
    color: $text-color-base;
    height: 40px;
    line-height: 40px;

    &:focus {
        outline-color: #4db6ac;
    }

    &.small {
        padding: 0 12px;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
    }

    &.w-small {
        max-width: 200px;
    }

    &.w-medium {
        max-width: 320px;
    }
}
</style>