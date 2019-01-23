<template>
    <article class="todo-item">
        <template v-if="!activeEdit">
            <div class="todo-item-main">
                <todo-circle-checkbox
                        v-model="todo.done"
                        :value="true"
                        :name="`todo-done-${todo.id}`"
                        @change="handleChangeDone"
                />
                <span v-if="!activeEdit">{{ todo.title }}</span>
            </div>
            <div class="todo-item-sub">
                <span class="todo-item-caption">{{ limitDateDisplay }}</span>
                <div :class="{ active: activeMenu }" class="todo-item-menu" @click.stop="$emit('click-menu', $event, todo.id)">
                    <i class="material-icons todo-item-menu-trigger">more_horiz</i>
                </div>
            </div>
        </template>
        <template v-if="activeEdit">
            <div class="todo-item-main">
                <todo-input v-model="editForm.title" small />
                <todo-input type="date" v-model="editForm.limitTime" small />
            </div>
            <div class="todo-item-sub">
                <todo-link-text @click="emitEndEdit">キャンセル</todo-link-text>
                <todo-button label="OK" @click="handleApplyEdit" />
            </div>
        </template>
    </article>
</template>

<script>
import TodoModel from '../models/TodoModel'
import {mapActions} from 'vuex'
import TodoInput from './atoms/TodoInput';
import TodoService from '../services/TodoService';
import TodoCircleCheckbox from './atoms/TodoCircleCheckbox';
import TodoLinkText from './atoms/TodoLinkText';
import TodoButton from './atoms/TodoButton';
import DateService from '../services/DateService';

const todoService = new TodoService();
const dateService = new DateService();

export default {
    components: {TodoButton, TodoCircleCheckbox, TodoInput, TodoLinkText},
    props: {
        todo: { type: TodoModel, required: true },
        activeMenu: { type: Boolean, default: false },
        activeEdit: { type: Boolean, default: false }
    },
    data() {
        return {
            editForm: this.getInitialEditForm()
        }
    },
    watch: {
        activeEdit (v) {
            if (v === true) {
                this.editForm.title = this.todo.title;
                this.editForm.limitTime = dateService.formatDate(new Date(this.todo.limitTime), 'YYYY-MM-DD');
            } else {
                this.editForm = this.getInitialEditForm();
            }
        }
    },
    computed: {
        limitDateDisplay () {
            return todoService.getLimitTimeDisplay(this.todo.limitTime)
        }
    },
    methods: {
        ...mapActions(['doneTodo', 'editTodo']),
        handleChangeDone (v) {
            this.doneTodo({ id: this.todo.id, done: v });
        },
        handleApplyEdit () {
            const title = this.editForm.title.trim();
            const limitTime = this.editForm.limitTime ? new Date(this.editForm.limitTime) : null;

            this.editTodo({
                id: this.todo.id,
                title: title,
                limitTime: limitTime
            });
        },
        emitEndEdit () {
            this.$emit('end-edit');
        },
        getInitialEditForm () {
            return {
                title: null,
                limitTime: null
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 8px 8px 16px;

    &:hover {
        .todo-item-menu-trigger {
            opacity: 1;
        }
    }
}
.todo-item-main {
    display: flex;
    align-items: center;

    > * {
        + * {
            margin-left: 16px;
        }
    }
}
.todo-item-sub {
    display: flex;
    align-items: center;

    > * {
        + * {
            margin-left: 16px;
        }
    }
}
.todo-item-menu {
    position: relative;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 100%;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 1px solid rgba(0, 0, 0, 0);
        transform: translate(-50%, -50%) scale(0.8);
        transition: border-color 0.25s ease-in-out, transform 0.25s ease-in-out;
    }

    &:hover,
    &.active {
        &:before {
            border-color: $text-color-caption;
            transform: translate(-50%, -50%) scale(1);
        }

        .todo-item-menu-trigger {
            opacity: 1;
        }
    }

    &.active {
        background-color: $text-color-caption;

        .todo-item-menu-trigger {
            opacity: 1;
            color: #FFFFFF;
            transform: translateX(0);
            margin-left: 0;
        }
    }
}
.todo-item-menu-trigger {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $text-color-caption;
    font-size: 17px;
    opacity: 0;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}
.todo-item-caption {
    color: $text-color-caption;
    font-size: $text-size-caption;
}
</style>
