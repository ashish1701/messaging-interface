<script setup>
import { computed, defineProps } from 'vue'
import { useMessageStore } from '@/stores/messages.js'
const messageStore = useMessageStore()

const props = defineProps({
  message: Object
})
const myUser = computed(() => messageStore.myUser)
const isMe = computed(() => myUser.value.id === props.message.from.id)
</script>

<template>
  <div class="user-chatbox" :class="{ 'current-user': isMe }">
    <img :src="props.message.from.thumbnail" class="thumbnail" />
    <p class="message" :class="{ 'user-message': isMe }">
      {{ props.message.message }}
    </p>
  </div>
</template>

<style scoped>
.thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.message {
  margin: 0 12px;
  max-width: 60%;
  margin: 24px 0;
  background-color: #e6e6e6;
  padding: 4px;
  border-radius: 10px;
  color: black;
}

.user-message {
  background-color: aqua;
}
.user-chatbox {
  display: flex;
  align-items: self-end;
}

.current-user {
  flex-direction: row-reverse;
}
</style>
