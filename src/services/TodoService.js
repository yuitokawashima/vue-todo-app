import {FilterKeys, SortKeys} from '../models/TodoSearchFormModel';

export default class TodoService {

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
            case SortKeys.DUE_DATE:
                return todos.sort((a, b) => a.limitTime !== null || a.limitTime > b.limitTime ? 1 : -1);
        }
    }

    getLimitTimeDisplay (limitTime) {
        if (!limitTime) return null;
        const limitDate = new Date(limitTime);
        const limitYear = limitDate.getFullYear();
        const limitMonth = limitDate.getMonth() + 1;
        const limitDay = limitDate.getDate();
        const currentDate = new Date();

        if (limitDate.getFullYear() === currentDate.getFullYear()) {
            if (limitMonth === currentDate.getMonth() + 1) {
                const currentDay = currentDate.getDate();
                if (limitDay === currentDay) return '今日';
                if (limitDay === currentDay + 1) return '明日';
            }

            return `${limitMonth}/${limitDay}`

        } else {
            return `${limitYear}/${limitMonth}/${limitDay}`
        }
    }

}