<template>
    <label class="todo-checkbox-label">
        <input :checked="checked"
               :value="value"
               :name="name"
               type="checkbox"
               class="todo-checkbox"
               @change="updateValue">
        <span class="todo-checkbox-circle"></span>
    </label>
</template>

<script>
export default {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: { type: Boolean, required: false, default: Array },
        name: { type: String, default: '' },
        value: { type: Boolean, required: true },
        disabled: { type: Boolean, default: false },
    },
    methods: {
        updateValue (e) {
            this.$emit('change', e.target.checked);
            this.$emit('checked', e.target.checked);
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variables.scss";

.todo-checkbox {
    -webkit-appearance: none;
    display: none;

    &:checked {
        + .todo-checkbox-circle {
            background-color: #2e7b32;
            border-color: #2e7b32;

            &:before {
                opacity: 1;
                border-bottom-color: $bg-base;
                border-left-color: $bg-base;
            }
        }
    }
}
.todo-checkbox-circle {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border: 1px solid $bd-color-base;
    border-radius: 100%;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
        &:before {
            opacity: 1;
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 12px;
        height: 6px;
        border-bottom: 2px solid $bd-color-base;
        border-left: 2px solid $bd-color-base;
        transform: translate(-50%, -50%) rotate(-45deg);
        margin-top: -2px;
        opacity: 0;
        transition: opacity 0.2s, border-bottom-color 0.2s, border-left-color 0.2s;
    }
}
</style>