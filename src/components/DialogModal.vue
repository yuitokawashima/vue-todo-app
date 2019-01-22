<template>
  <div class="modal-layer">
    <div class="modal">
      <div class="modal-inner">
        <div class="modal-main">
          <slot />
        </div>
        <div class="modal-action">
          <button class="">{{ applyLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    applyLabel: {
      type: String,
      default: 'OK'
    }
  }
}
</script>

<style lang="scss">
.modal-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FFFFFF;
  min-width: 320px;
}
.modal-inner {
  padding: 20px 24px;
}
.modal-action {
  margin-top: 24px;
  text-align: right;
}
</style>

