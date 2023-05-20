import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useMessageStore = defineStore('messages', () => {
  const myUser = ref({})
  const conversations = ref({})
  function setMessages(message) {
    conversations.value = message
  }
  function setReplies(reply) {
    conversations.value.push(reply)
  }
  function setUser(user) {
    myUser.value = user
  }

  return { myUser, conversations, setMessages, setUser, setReplies }
})
