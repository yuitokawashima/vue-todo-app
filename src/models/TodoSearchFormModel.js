export const SortKeys = {
    NEW: 'NEW',
    LIMIT: 'LIMIT'
}

export const FilterKeys = {
    ALL: 'ALL',
    UNDONE: 'UNDONE',
    DONE: 'DONE'
}

export default class TodoSearchFormModel {
    constructor(
        {
            sortKey = SortKeys.NEW,
            freeText = '',
            filterKey = FilterKeys.ALL
        } = {}
    ) {
        Object.assign(this, {
            sortKey,
            freeText,
            filterKey
        })
    }
}