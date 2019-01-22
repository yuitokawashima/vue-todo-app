<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="todo-input-wrap">
                <input
                    v-model="form.title"
                    type="text"
                    :placeholder="inputPlaceholder"
                    @focus="focusedForm = true"
                >
            </div>
            <div v-if="focusedForm" class="todo-form-sub">
                <input v-model="form.limitTime" type="date" placeholder="Add Limit Date">
                <div class="todo-form-action">
                    <a class="todo-link" @click="resetForm">キャンセル</a>
                    <button :disabled="invalidForm" class="todo-button" type="submit">add</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            focusedForm: false,
            form: this.getInitialForm()
        }
    },
    computed: {
        inputPlaceholder () {
            return 'Click Here to Add Task!'
        },
        invalidForm () {
            return (
                this.form.title === ''
            )
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        handleSubmit() {
            this.addTodo({
                title: this.form.title.trim(),
                limitTime: new Date(this.form.limitTime).getTime()
            });
            this.resetForm();
        },
        getInitialForm() {
            return {
                title: '',
                limitTime: ''
            }
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

input {
    -webkit-appearance: none;
    border: 1px solid $bd-color-base;
    border-radius: 4px;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;

    &:focus {
        outline-color: #4db6ac;
    }

    &[type="text"] {
        padding: 8px 16px;
        font-size: 15px;
        width: 100%;
    }
    &[type="date"] {
        padding: 4px 12px;
        font-size: 13px;
        width: 100%;
        max-width: 180px;
    }
}
.todo-form-sub {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 12px;

    > * {
        + * {
            margin-left: 24px;
        }
    }
}
.todo-form-action {
    display: flex;
    align-items: center;

    > * {
        + * {
            margin-left: 8px;
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
.todo-button {
    position: relative;
    -webkit-appearance: none;
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #4db6ac;
    border-radius: 4px;
    background-color: #4db6ac;
    color: #FFFFFF;
    transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
    outline: none;
    cursor: pointer;

    &:active {
        box-shadow: $shadow-base;
    }

    &:hover {
        background-color: #26a69a;
    }
    
    &[disabled] {
        background-color: #E1E1E1;
        border-color: #E1E1E1;
        color: #C0C0C0;
        cursor: not-allowed;
    }
}
</style>
