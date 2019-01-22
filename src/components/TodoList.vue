<template>
  <div class="todo-list-container">
      <transition-group tag="ul" name="todo-list" class="todo-list">
          <li v-for="todo in todos" :key="todo.id">
              <todo-item
                  :todo="todo"
                  :active-menu="activeActionId === todo.id"
                  :active-edit="editableTodoId === todo.id"
                  @click-menu="handleClickMenu"
                  @end-edit="editableTodoId = null"
              />
          </li>
      </transition-group>
      <div v-if="activeAction"
           :style="todoActionStyle"
           id="vi-todo-action"
           class="todo-action">
          <ul class="todo-action-list">
              <li v-for="obj in actionItems" :key="obj.key">
                  <a class="todo-action-item"
                     @click="handleClickActionLink(obj.key)"
                  >{{ obj.label }}</a>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import {mapActions} from 'vuex'
import DomService from '../services/DomService';

const ActionItems = {
    Edit: { key: 'edit', label: '編集' },
    Delete: { key: 'delete', label: '削除' },
};
const domService = new DomService();

export default {
    components: {TodoItem},
    props: {
        todos: {
            type: Array[TodoItem],
            required: true
        }
    },
    data () {
        return {
            activeActionId: null,
            editableTodoId: null,
            actionLeft: 0,
            actionTop: 0
        }
    },
    computed: {
        actionItems: () => ActionItems,
        activeAction () {
            return this.activeActionId !== null;
        },
        todoActionStyle () {
            return { left: `${this.actionLeft}px`, top: `${this.actionTop}px`, }
        }
    },
    methods: {
        ...mapActions(['deleteTodo']),
        handleClickMenu (e, id) {
            const rect = e.target.getBoundingClientRect();

            this.actionLeft = rect.left + rect.width;
            this.actionTop = rect.top + rect.height;
            this.activeActionId = id;
            this.bindClickDocumentEvent();
        },
        handleClickActionLink (key) {
            switch (key) {
                case ActionItems.Edit.key:
                    this.editableTodoId = this.activeActionId; break;
                case ActionItems.Delete.key:
                    this.deleteTodo(this.activeActionId); break;
            }
            this.resetActiveActionId();
        },
        handleClickDocument(e) {
            if (domService.closestElement(e.target, '#vi-todo-action') !== null) return;
            this.resetActiveActionId();
        },
        resetActiveActionId () {
            this.activeActionId = null;
            this.unbindClickDocumentEvent();
        },
        bindClickDocumentEvent () {
            document.addEventListener('click', this.handleClickDocument, false);
        },
        unbindClickDocumentEvent () {
            document.removeEventListener('click', this.handleClickDocument, false);
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.todo-list {
    > li {
        &:first-child {
            border-top: 1px solid #DBDBDB;
        }

        border-bottom: 1px solid #DBDBDB;
    }
}
.todo-action {
    position: fixed;
    max-width: 320px;
    transform: translateX(-100%);
    background-color: $bg-base;
    box-shadow: $shadow-depth;
}
.todo-action-list {
    > li {
        + li {
            border-top: 1px solid $bd-color-base;
        }
    }
}
.todo-action-item {
    display: block;
    text-align: left;
    padding: 6px 16px;
    font-size: 14px;
    white-space: nowrap;
    min-width: 80px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #FAFAFA;
    }
}
.todo-list-enter-active,
.todo-list-leave-to {
    opacity: 0;
}
.todo-list-enter,
.todo-list-leave-active {
    transition: opacity 0.2s;
}
.todo-list-move {
    /*transition: transform 0.2s;*/
}
</style>