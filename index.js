Vue.component("board-list", {
  template: "<li>{{name}} {{date}}</br>{{message}}</li>",
  props: ["name", "message", "date"]
});
//gitcommandでの変更
Vue.component("board-form", {
  template:
    '<div class="form-area"><label class="username">名前 : </label><input v-model="name"> </br>メッセージ: \
    <textarea v-model="message" class="chat-area"></textarea> </br><button v-on:click="doAdd">send</button></div>',
  data: function() {
    return {
      message: "",
      name: ""
    };
  },
  methods: {
    doAdd: function() {
      this.$emit("input", this.name, this.message);
    }
  }
});

var board = new Vue({
  el: "#board",
  data: {
    lists: []
  },
  created: function() {
    var vue = this;
    firebase
      .database()
      .ref("board")
      .on("value", function(snapshot) {
        vue.lists = snapshot.val();
      });
  },
  methods: {
    doAdd: function(name, message) {
      var now = new Date();
      firebase
        .database()
        .ref("board")
        .push({
          name: name,
          message: message,
          date:
            now.getMonth() +
            1 +
            "月" +
            now.getDate() +
            "日" +
            now.getHours() +
            "時" +
            now.getMinutes() +
            "分"
        });
    }
  }
});
