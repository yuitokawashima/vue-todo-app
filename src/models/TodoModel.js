export default class TodoModel {
    constructor(
        {
            id,
            title,
            limitTime,
            done = false,
            registeredTime = new Date()
        }
    ) {
        Object.assign(this, {
            id,
            title,
            limitTime,
            done,
            registeredTime
        })
    }
}