<template>
    <div class="todo-icon-input">
        <input
            :value="value"
            :type="type"
            :placeholder="placeholder"
            :name="name"
            :class="{active, small}"
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
    computed: {
        active () {
            return this.value !== ''
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

    input {
        -webkit-appearance: none;
        border: 0;
        padding-right: 16px;
        padding-left: 40px;
        outline: none;
        background: none;
        transition: padding-left 0.2s;
        width: 100%;
        font-size: 14px;
        color: $text-color-base;
        min-width: 240px;
        height: 40px;
        line-height: 40px;

        &:focus,
        &.active {
            padding-left: 16px;

            + .material-icons {
                transform: translateY(-50%) scale(0);
            }
        }

        &.small {
            padding-right: 12px;
            padding-left: 40px;
            height: 32px;
            line-height: 32px;

            &:focus {
                padding-left: 16px;
            }
        }
    }

    .material-icons {
        position: absolute;
        font-size: 20px;
        top: 50%;
        left: 12px;
        transform: translateY(-50%) scale(1);
        color: #BBBBBB;
        transition: transform 0.2s;
    }
}
</style>