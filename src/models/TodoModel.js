export default class TodoModel {
    constructor(
        {
            id,
            title,
            limitTime,
            done = false,
            createdTime = new Date().getTime()
        }
    ) {
        Object.assign(this, {
            id,
            title,
            limitTime,
            done,
            createdTime
        })
    }
}