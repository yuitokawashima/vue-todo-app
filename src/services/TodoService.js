import {FilterKeys, SortKeys} from '../models/TodoSearchFormModel';
import DateService from './DateService';

export default class TodoService {

    constructor () {
        this.dateService = new DateService();
    }

    filterTodos (todos, filterKey) {
        return todos.filter((v) => {
            switch (filterKey) {
                case FilterKeys.ALL: return true;
                case FilterKeys.DONE: return v.done;
                case FilterKeys.UNDONE: return !v.done;
            }
        });
    }

    searchByFreeText (todos, freeText) {
        if (freeText === '') return todos;
        return todos.filter((v) => v.title.indexOf(freeText) !== -1);
    }

    sortTodos (todos, sortKey) {
        switch (sortKey) {
            case SortKeys.NEW:
                return todos.sort((a, b) => a.createdTime > b.createdTime ? 1 : -1);
            case SortKeys.LIMIT: {
                const hasLimitTodos = todos.filter((v) => v.limitTime !== null).sort((a, b) => {
                    return a.limitTime > b.limitTime ? 1 : -1;
                });
                const hasNotLimitTodos = todos.filter((v) => v.limitTime === null).sort((a, b) => a.createdTime > b.createdTime ? 1 : -1);
                return hasLimitTodos.concat(hasNotLimitTodos)
            }
        }
    }

    getLimitTimeDisplay (limitTime) {
        if (!limitTime) return 'unset';
        const limitDate = new Date(limitTime);
        const limitYear = limitDate.getFullYear();
        const limitMonth = limitDate.getMonth() + 1;
        const limitDay = limitDate.getDate();
        const currentDate = new Date();

        if (limitYear === currentDate.getFullYear()) {
            if (limitMonth === currentDate.getMonth() + 1) {
                const currentDay = currentDate.getDate();
                if (limitDay === currentDay) return 'today';
                if (limitDay === currentDay + 1) return 'tomorrow';
            }

            return this.dateService.formatDate(limitDate, 'MM/DD');

        } else {
            return this.dateService.formatDate(limitDate, 'YYYY/MM/DD')
        }
    }

}