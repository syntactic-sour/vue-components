<script setup lang="ts">
import { ref, computed, nextTick, useTemplateRef, getCurrentInstance, defineProps } from 'vue'

import getAllFocusableElements from '../../utils/dom/getFocusableElements.ts'

const { heading } = defineProps<{ heading: string }>()

const isOpen = ref(false)
const dialogRef = useTemplateRef('dialog')
const buttonRef = useTemplateRef('button')

const { uid } = getCurrentInstance() || {}
const headingId = computed(() => `modal-${uid}-heading`)

function openModal() {
  isOpen.value = true
  nextTick(focusDialog)
}

function closeModal() {
  isOpen.value = false
  // TODO: handle case when button may not exist anymore (emit event? hide button according to some prop?) should parent component handle focusing next?
  buttonRef.value?.focus()
}

function focusLast(e: FocusEvent) {
  if (!dialogRef.value) {
    return
  }

  if (e.relatedTarget === dialogRef.value) {
    focusFirst()
    return
  }

  const children = getAllFocusableElements(dialogRef.value)

  if (children.length > 1) {
    children[children.length - 2].focus()
  }
}

function focusDialog() {
  dialogRef.value?.focus()
}

function focusFirst() {
  if (!dialogRef.value) {
    return
  }
  const children = getAllFocusableElements(dialogRef.value)
  if (children.length) {
    children[1].focus()
  }
}
</script>

<template>
  <!-- TODO: add aria attributes -->
  <button type="button" @click="openModal" ref="button">
    <slot name="openBtn">Open Modal</slot>
  </button>
  <Teleport to="body">
    <!-- Since modal has a close button, it is safe to use div (backdrop) to listen click -->
    <!-- eslint-disable vuejs-accessibility/click-events-have-key-events vuejs-accessibility/no-static-element-interactions -->
    <div v-if="isOpen" class="modal-backdrop" tabindex="-1" @click.self="closeModal">
      <!-- Dialog doesn't have 100% support yet, role attribute is a fallback -->
      <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -->
      <dialog
        role="dialog"
        class="modal"
        ref="dialog"
        tabindex="-1"
        aria-modal="true"
        :aria-labelledby="headingId"
        @keydown.esc="closeModal"
      >
        <div @focus="focusLast" tabindex="0"></div>
        <h2 :id="headingId">{{ heading }}</h2>
        <!-- TODO: use icon -->
        <button class="close-btn" type="button" @click="closeModal">Close</button>
        <slot></slot>
        <div @focus="focusFirst" tabindex="0"></div>
      </dialog>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: absolute;
  inset-block: 0;
  inset-inline: 0;
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  inline-size: 25rem;
  block-size: 25rem;
  background: white;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 0 auto;
  max-inline-size: 100%;
  max-block-size: 100%;
  min-inline-size: 6.25rem;
  min-block-size: 6.25rem;
  position: relative;
  overflow: auto;
}

.close-btn {
  position: absolute;
  inset-inline-end: 0;
  inset-block-start: 0;
}
</style>
