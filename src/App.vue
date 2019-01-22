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
import TodoSearchFormModel from './models/TodoSearchFormModel'
import TodoSearchForm from './components/TodoSearchForm'
import {mapState} from 'vuex'
import TodoService from './services/TodoService';

const todoService = new TodoService();

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

            todos = todoService.searchByFreeText(todos, this.searchForm.freeText);
            todos = todoService.filterTodos(todos, this.searchForm.filterKey);

            return todoService.sortTodos(todos, this.searchForm.sortKey);
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
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
}
.todo-search-section {
    margin-top: 40px;
}
.todo-list-section {
    margin-top: 16px;
}
</style>
