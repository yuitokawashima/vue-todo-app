import Vue from 'vue'
import Vuex from 'vuex'
import TodoModel from "./models/TodoModel";

Vue.use(Vuex);

let lastId = 2;

export default new Vuex.Store({
    state () {
        return {
            todos: [
                new TodoModel({id: 0, title: 'sample1', limitTime: new Date().getTime()}),
                new TodoModel({id: 1, title: 'sample2', limitTime: new Date().getTime()}),
            ]
        }
    },
    mutations: {
        addTodo (state, todo) {
            state.todos = state.todos.concat([todo]);
        },
        deleteTodo (state, id) {
            console.log(id);
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
        addTodo ({commit}, { title, limitTime }) {
            const todo = new TodoModel({ id: lastId++, title, limitTime });
            console.log(todo);
            commit('addTodo', todo);
        },
        deleteTodo ({commit}, todoId) {
            commit('deleteTodo', todoId);
        },
        editTodo ({commit}, { id, title, limitDate }) {
            commit('editTodo', { id, title, limitDate });
        },
        doneTodo ({commit}, { id, done }) {
            commit('doneTodo', { id, done });
        }
    }
})
