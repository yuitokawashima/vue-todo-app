<template>
    <div class="todo-select">
        <select :selected="selected" :name="name" @change="updateValue">
            <option v-for="obj in options" :value="obj.value" :key="obj.value">
                {{ obj.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: {
        selected: { type: String, required: true },
        name: { type: String, default: '' },
        options: { type: Array[Object], required: true }
    },
    methods: {
        updateValue (e) {
            this.$emit('selected', e.target.value);
            this.$emit('change', e.target.value);
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/variables";

.todo-select {
    position: relative;
    display: block;
    font-size: 0;
    width: 100%;
    max-width: 278px;
    overflow: hidden;

    &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-25%);
        width: 0;
        height: 0;
        border: 4px solid rgba(255, 255, 255, 0);
        border-top-color: $bd-color-base;
    }
}

select {
    display: block;
    position: relative;
    -webkit-appearance: none;
    width: 100%;
    background-color: $bg-base;
    padding: 9px 40px 9px 16px;
    border-color: $bd-color-base;
    line-height: 1;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;
    font-size: 14px;
    color: $text-color-base;

    &:focus {
        outline: none;
    }

    &::-ms-expand {
        display: none;
    }
}
</style>