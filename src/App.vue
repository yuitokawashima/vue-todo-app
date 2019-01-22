<template>
    <main id="app">
        <section class="todo-add-section">
            <todo-add-form />
        </section>
        <section class="todo-search-section">
            <todo-search-form :search-form="searchForm" />
        </section>
        <section class="todo-list-section">
            <todo-list :todos="searchedTodos" />
        </section>
    </main>
</template>

<script>
import TodoList from './components/TodoList'
import TodoAddForm from './components/TodoAddForm'
import TodoSearchFormModel, {FilterKeys, SortKeys} from './models/TodoSearchFormModel'
import TodoSearchForm from './components/TodoSearchForm'
import {mapState} from 'vuex'

export default {
    components: {
        TodoList,
        TodoAddForm,
        TodoSearchForm
    },
    data() {
        return {
            searchForm: new TodoSearchFormModel()
        }
    },
    computed: {
        ...mapState({
            todos: (state) => state.todos
        }),
        searchedTodos () {
            let todos = this.todos.slice(0);

            todos = this.searchByText(todos);
            todos = this.filterTodos(todos);
            return this.sortTodos(todos);
        }
    },
    methods: {
        filterTodos (todos) {
            return todos.filter((v) => {
                switch (this.searchForm.filterKey) {
                    case FilterKeys.ALL: return true;
                    case FilterKeys.DONE: return v.done;
                    case FilterKeys.UNDONE: return !v.done;
                }
            });
        },
        searchByText (todos) {
            if (this.searchForm.freeText === '') return todos;
            return todos.filter((v) => v.title.indexOf(this.searchForm.freeText) !== -1);
        },
        sortTodos (todos) {
            switch (this.searchForm.sortKey) {
                case SortKeys.NEW:
                    return todos.sort((a, b) => a.registeredTime > b.registeredTime ? 1 : -1);
                case SortKeys.DUE_DATE:
                    return todos.sort((a, b) => a.limitTime !== null || a.limitTime > b.limitTime ? 1 : -1);
            }
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 40px;
}
.todo-search-section {
    margin-top: 32px;
}
.todo-list-section {
    margin-top: 16px;
}
</style>
