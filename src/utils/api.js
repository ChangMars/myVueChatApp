import { useStore } from "vuex";
var socket = null;

export const connectSocket = () => {
  socket = new WebSocket(wsUrl); // 這邊就是剛剛上面的process.env.VUE_APP_API_URL
  const store = useStore();

  socket.onopen = function() { //連線(onopen)
    console.log("websocket connected!!");
  };
  socket.onmessage = function(msg) { //監聽訊息(onmessage)
    console.log("onmessage", msg);
    store.commit("ws/setWsRes", JSON.parse(msg ?? {}));
  };
  socket.onerror = function(err) { //監聽錯誤(onerror)
    console.log("error", err);
  };
};
