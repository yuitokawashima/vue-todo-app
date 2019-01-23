<template>
    <div class="todo-search-form">
        <div class="todo-search-form-block">
            <div class="tab-container">
                <ul class="tab-list">
                    <li v-for="obj in filterItems" :key="obj.key">
                        <a :class="{active: searchForm.filterKey === obj.key}"
                           class="tab-item"
                           @click="searchForm.filterKey = obj.key">{{ obj.label }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="todo-search-form-block">
            <ul class="todo-search-form-items">
                <li>
                    <todo-icon-input v-model="searchForm.freeText"
                                     small
                                     icon-name="search"
                                     placeholder="Search By Free Word" />
                </li>
                <li>
                    <todo-selectbox v-model="searchForm.sortKey" :options="sortOptions" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TodoSearchFormModel, {FilterKeys, SortKeys} from "../models/TodoSearchFormModel";
import TodoIconInput from './atoms/TodoIconInput';
import TodoSelectbox from './atoms/TodoSelectbox';

export default {
    components: {TodoSelectbox, TodoIconInput},
    props: {
        searchForm: {
            type: TodoSearchFormModel,
            required: true
        }
    },
    computed: {
        filterItems: () => [
            { label: 'すべて', key: FilterKeys.ALL },
            { label: '未完了', key: FilterKeys.UNDONE },
            { label: '完了', key: FilterKeys.DONE },
        ],
        sortOptions: () => [
            { label: '新規登録順', value: SortKeys.NEW },
            { label: '期限が近い順', value: SortKeys.LIMIT },
        ]
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
.todo-search-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.todo-search-form-items {
    display: flex;
    align-items: center;

    > li {
        + li {
            margin-left: 16px;
        }
    }
}
.tab-container {
    display: inline-block;
}
.tab-list {
    border-radius: 4px;
    display: flex;
    border: 1px solid $bd-color-base;

    > li {
        + li {
            border-left: 1px solid $bd-color-base;
        }
    }
}
.tab-item {
    display: block;
    padding: 5px 16px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba($bd-color-base, 0.6);
    }

    &.active {
        background-color: $bd-color-base;
    }
}
</style>