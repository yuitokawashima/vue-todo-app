<template>
    <div>
        <div class="tab-container">
            <ul class="tab-list">
                <li>
                    <a :class="{active: searchForm.filterKey === filterKeys.ALL}"
                       class="tab-item"
                       @click="searchForm.filterKey = filterKeys.ALL">すべて</a>
                </li>
                <li>
                    <a :class="{active: searchForm.filterKey === filterKeys.UNDONE}"
                       class="tab-item"
                       @click="searchForm.filterKey = filterKeys.UNDONE">未完了</a>
                </li>
                <li>
                    <a :class="{active: searchForm.filterKey === filterKeys.DONE}"
                       class="tab-item"
                       @click="searchForm.filterKey = filterKeys.DONE">完了</a>
                </li>
            </ul>
        </div>
        <input v-model="searchForm.freeText" type="text" />
        <select v-model="searchForm.sortKey">
            <option v-for="obj in sortOptions" :value="obj.value">{{ obj.label }}</option>
        </select>
    </div>
</template>

<script>
import TodoSearchFormModel, {FilterKeys, SortKeys} from "../models/TodoSearchFormModel";

export default {
    props: {
        searchForm: {
            type: TodoSearchFormModel,
            required: true
        }
    },
    computed: {
        filterKeys: () => FilterKeys,
        sortOptions: () => [
            { label: '新規登録順', value: SortKeys.NEW },
            { label: '期限が近い順', value: SortKeys.DUE_DATE },
        ]
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

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
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
    cursor: pointer;

    &.active {
        background-color: $bd-color-base;
    }
}
</style>