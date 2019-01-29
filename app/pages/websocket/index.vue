<template>
  <div>
    <textarea v-model="message" />
    <button @click="send">送信</button>
    <p>You recieved message: <b>{{ answer }}</b></p>
  </div>
</template>

<script>
  import { w3cwebsocket } from 'websocket'
  const W3CWebSocket = w3cwebsocket


  export default {
    data: function() {
      return {
        // WebSocketクライアントの生成
        socket: new W3CWebSocket('ws://localhost:8081/ws'),
        // クライアントから送る値（textarea）
        message: '',
        // サーバから受け取る値
        answer: ''
      }
    },
    // createdライフサイクルで、Vueインスタンスが作成されたら
    // イベントリスナーを登録しておく
    created: function() {
      // イベントリスナーからVueコンポーネントに値を渡すために一度selfで変数化しておく
      const self = this
      self.socket.onmessage = function(e) {
        if (typeof e.data === 'string') {
          self.answer = e.data
        }
      }
    },
    methods: {
      send: function() {
        // ボタン押下でサーバに値を送る
        this.socket.send(this.message)
      }
    }
  }
</script>
