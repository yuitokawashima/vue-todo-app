import Vue from 'vue'
import Vuex from 'vuex'
import TodoModel from "./models/TodoModel";
import TodoStorageService from "./services/TodoStorageService";

Vue.use(Vuex);

const todoStorageService = new TodoStorageService();

export default new Vuex.Store({
    state () {
        return {
            todos: todoStorageService.getTodos().map((v) => new TodoModel(v))
        }
    },
    mutations: {
        addTodo (state, todo) {
            state.todos = state.todos.concat([todo]);
        },
        deleteTodo (state, id) {
            state.todos = state.todos.filter((v) => v.id !== id);
        },
        editTodo (state, { id, title, limitTime }) {
            const index = state.todos.findIndex((v) => v.id === id);
            if (index === -1) return;
            state.todos[index] = Object.assign(state.todos[index], {
                title,
                limitTime
            });
        },
        doneTodo (state, { id, done }) {
            const index = state.todos.findIndex((v) => v.id === id);
            if (index === -1) return;
            state.todos[index].done = done;
        }
    },
    actions: {
        addTodo ({commit, state}, { title, limitTime }) {
            const id = todoStorageService.generateId();
            const todo = new TodoModel({ id, title, limitTime });
            commit('addTodo', todo);
            todoStorageService.setTodos(state.todos);
        },
        deleteTodo ({commit, state}, todoId) {
            commit('deleteTodo', todoId);
            todoStorageService.setTodos(state.todos);
        },
        editTodo ({commit, state}, { id, title, limitTime }) {
            commit('editTodo', { id, title, limitTime });
            todoStorageService.setTodos(state.todos);
        },
        doneTodo ({commit, state}, { id, done }) {
            commit('doneTodo', { id, done });
            todoStorageService.setTodos(state.todos);
        }
    }
})
