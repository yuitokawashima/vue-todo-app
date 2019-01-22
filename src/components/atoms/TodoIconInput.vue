<template>
    <div class="todo-icon-input">
        <input
            :value="value"
            :type="type"
            :placeholder="placeholder"
            :name="name"
            :class="{small}"
            @input="update"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
        />
        <i class="material-icons">{{ iconName }}</i>
    </div>
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
        iconName: {
            type: String,
            required: true
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

.todo-icon-input {
    position: relative;
    z-index: 1;
    border-radius: 4px;
    border: 1px solid $bd-color-base;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;

    &.small {
        input {
            padding: 4px 12px 4px 40px;

            &:focus {
                padding-left: 16px;
            }
        }
    }

    input {
        -webkit-appearance: none;
        border: 0;
        padding: 8px 16px 8px 40px;
        outline: none;
        background: none;
        transition: padding-left 0.2s;
        width: 100%;
        font-size: 14px;
        color: $text-color-base;

        &:focus {
            padding-left: 16px;

            + .material-icons {
                transform: translateY(-50%) scale(0);
            }
        }
    }

    .material-icons {
        position: absolute;
        font-size: 20px;
        top: 50%;
        left: 8px;
        transform: translateY(-50%) scale(1);
        color: #BBBBBB;
        transition: transform 0.2s;
    }
}
</style>