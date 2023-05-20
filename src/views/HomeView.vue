<script setup>
import { onMounted, ref } from 'vue'
import { useMessageStore } from '@/stores/messages.js'
import { conversation, currentUser } from '../messages/mockapi'
import SubmitReply from '../components/SubmitReply.vue'
import { computed } from 'vue'
import MessageEntry from '../components/MessageEntry.vue'

const messageStore = useMessageStore()
const messageList = computed(() => messageStore.conversations)
const loading = ref({ user: false, conversation: false })

async function getMyUser() {
  loading.value.user = true
  //mocking api
  const promise = new Promise((resolve) => {
    resolve(currentUser)
  })
  const data = await promise.then((val) => JSON.parse(val))
  messageStore.setUser(data)
  loading.value.user = false
}
const reply = ref('')
async function sendReply(value) {
  const promise = new Promise((resolve) => {
    const replyObject = {
      id: Math.floor(Math.random() * 100) + 'reply',
      from: messageStore.myUser,
      message: value
    }
    resolve(JSON.stringify(replyObject))
    reply.value = ''
    setTimeout(() => {
      document.getElementById(replyObject.id).scrollIntoView()
    }, 10)
  })
  const data = await promise.then((val) => JSON.parse(val))
  messageStore.setReplies(data)
}
async function getMessages() {
  loading.value.conversation = true
  //mocking api
  const promise = new Promise((resolve) => {
    resolve(conversation)
  })
  const data = await promise.then((val) => JSON.parse(val))

  messageStore.setMessages(data)
  loading.value.conversation = false
}

onMounted(() => {
  getMyUser()
  getMessages()
})
</script>

<template>
  <main class="container">
    <div class="chat-box">
      <div v-for="item in messageList" :key="item.id" :id="item.id">
        <message-entry :message="item" />
      </div>
    </div>

    <submit-reply :value="reply" @submit="sendReply" />
  </main>
</template>

<style scoped>
.container {
  background-color: antiquewhite;
  padding: 16px;
  max-width: 60%;
  margin: auto;
}
.chat-box {
  max-height: 600px;
  color: black;
  font-size: 12px;
  overflow-y: scroll;
}
</style>
