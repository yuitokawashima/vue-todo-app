export default class TodoStorageService {

    STORAGE_KEY = 'todoList';

    constructor() {
        this.key = this.STORAGE_KEY;
        this.storage = window.localStorage;
    }

    setTodo(data) {
        this.storage.setItem(this.key, data);
    }

    getData() {
        return this.storage.getItem(this.key);
    }

    hasData() {
        return this.getData(this.key) != null
    }

    removeData() {
        this.storage.removeItem(this.key);
    }

}