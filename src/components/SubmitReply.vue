<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'
const props = defineProps({
  value: String
})
const emits = defineEmits(['submit'])
const reply = ref(props.value)
onMounted(() => {
  document.getElementById('textarea').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      submit()
    }
  })
})
function growTextArea({ target }) {
 
  target.style.height = '5px'
  target.style.height = target.scrollHeight + 'px'
}

function submit() {
  emits('submit', reply.value)
  reply.value = ''
}
</script>

<template>
  <div class="flex">
    <textarea v-model="reply" class="w-100" id="textarea" @input="growTextArea" />
    <img
      src="https://cdn0.iconfinder.com/data/icons/superglyph-communication/30/message-sending-1024.png"
      aria-role="button"
      class="reply-button"
      @click="submit()"
    />
  </div>
</template>

<style scoped>
textarea{
  min-height: 30px;
}
.reply-button {
  height: 30px;
  width: 30px;
  margin-left: 12px;
}
</style>
