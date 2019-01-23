export default class TodoStorageService {

    TODOS_STORAGE_KEY = 'todoList';
    TODO_ID_STORAGE_KEY = 'todoId';

    constructor() {
        this.key = this.TODOS_STORAGE_KEY;
        this.storage = window.localStorage;
    }

    setTodos(todos) {
        this.storage.setItem(this.TODOS_STORAGE_KEY, JSON.stringify(todos));
    }

    getTodos() {
        const todosString = this.storage.getItem(this.TODOS_STORAGE_KEY);
        return todosString ? JSON.parse(todosString) : [];
    }

    generateId() {
        let id;
        const lastId = this.storage.getItem(this.TODO_ID_STORAGE_KEY);
        if (lastId !== null) {
            id = parseInt(lastId) + 1;
        } else {
            id = 1;
        }

        this.storage.setItem(this.TODO_ID_STORAGE_KEY, id);

        return id;
    }

}