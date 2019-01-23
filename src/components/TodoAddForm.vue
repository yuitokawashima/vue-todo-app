<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="todo-input-wrap">
                <todo-icon-input
                    v-model="form.title"
                    icon-name="create"
                    type="text"
                    placeholder="Click Here to Add Task!"
                    @focus="focusedForm = true"
                />
            </div>
            <div v-if="focusedForm" class="todo-form-sub">
                <todo-input v-model="form.limitTime" small w-small type="date" placeholder="Add Limit Date" />
                <div class="todo-form-action">
                    <a class="todo-link" @click="resetForm">キャンセル</a>
                    <todo-button :disabled="invalidForm" label="Add Todo" type="submit" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import TodoInput from './atoms/TodoInput';
import TodoButton from './atoms/TodoButton';
import TodoIconInput from './atoms/TodoIconInput';

export default {
    components: {TodoIconInput, TodoButton, TodoInput},
    data() {
        return {
            focusedForm: false,
            form: this.getInitialForm()
        }
    },
    computed: {
        invalidForm () {
            return this.form.title === ''
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        handleSubmit() {
            const title = this.form.title.trim();
            const limitTime = this.form.limitTime ? new Date(this.form.limitTime).getTime() : null;

            this.addTodo({ title, limitTime });
            this.resetForm();
        },
        getInitialForm() {
            return { title: '', limitTime: '' }
        },
        resetForm () {
            this.focusedForm = false;
            this.form = this.getInitialForm();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.todo-form-sub {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 12px;

    > * {
        + * {
            margin-left: 32px;
        }
    }
}
.todo-form-action {
    display: flex;
    align-items: center;

    > * {
        + * {
            margin-left: 16px;
        }
    }
}
.todo-link {
    color: #616161;
    font-size: 13px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
</style>
