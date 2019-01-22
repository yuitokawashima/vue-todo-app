<template>
    <article class="todo-item">
        <div class="todo-item-main">
            <label class="todo-checkbox-label">
                <input :checked="todo.done"
                       :value="true"
                       :name="`todo-done-${todo.id}`"
                       type="checkbox"
                       class="todo-checkbox"
                       @change="handleChangeDone">
                <span class="todo-checkbox-circle"></span>
            </label>
            <span>{{ todo.title }}</span>
        </div>
        <div class="todo-item-sub">
            <span class="todo-item-caption">{{ limitDateDisplay }}</span>
            <div :class="{ active: isActiveMenu }"
                 class="todo-item-menu"
                 @click.stop="$emit('click-menu', $event, todo.id)"
            >
                <i class="material-icons todo-item-menu-trigger">more_horiz</i>
            </div>
        </div>
    </article>
</template>

<script>
import TodoModel from '../models/TodoModel'
import {mapActions} from 'vuex'

const ONE_DAY_TIME = 1000 * 60 * 60 * 24;

export default {
    props: {
        todo: { type: TodoModel, required: true },
        activeMenu: { type: Boolean, default: false },
    },
    data() {
        return {
            isActiveMenu: false
        }
    },
    computed: {
        limitDateDisplay () {
            if (!this.todo.limitTime) return null;
            const limitDate = new Date(this.todo.limitTime);
            const currentDate = new Date();

            if (limitDate.getFullYear() === currentDate.getFullYear()) {
                const limitMonth = limitDate.getMonth() + 1;
                const limitDay = limitDate.getDate();

                if (limitMonth === currentDate.getMonth() + 1) {
                    const currentDay = currentDate.getDate();
                    if (limitDay === currentDay) return '今日';
                    if (limitDay === currentDay + 1) return '明日';
                    return `${limitMonth}/${limitDay}`
                } else {
                    return `${limitMonth}/${limitDay}`
                }
            } else {
                const limitYear = limitDate.getFullYear();
                const limitMonth = limitDate.getMonth() + 1;
                const limitDay = limitDate.getDate();
                return `${limitYear}/${limitMonth}/${limitDay}`
            }
        }
    },
    methods: {
        ...mapActions(['doneTodo']),
        handleChangeDone (e) {
            this.doneTodo({ id: this.todo.id, done: e.target.checked });
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
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}
.todo-item-caption {
    color: $text-color-caption;
    font-size: $text-size-caption;
}
.todo-checkbox {
    -webkit-appearance: none;
    display: none;

    &:checked {
        + .todo-checkbox-circle {
            background-color: #2e7b32;
            border-color: #2e7b32;

            &:before {
                opacity: 1;
                border-bottom-color: $bg-base;
                border-left-color: $bg-base;
            }
        }
    }
}
.todo-checkbox-circle {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border: 1px solid $bd-color-base;
    border-radius: 100%;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
        &:before {
            opacity: 1;
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 12px;
        height: 6px;
        border-bottom: 2px solid $bd-color-base;
        border-left: 2px solid $bd-color-base;
        transform: translate(-50%, -50%) rotate(-45deg);
        margin-top: -2px;
        opacity: 0;
        transition: opacity 0.2s, border-bottom-color 0.2s, border-left-color 0.2s;
    }
}
</style>
