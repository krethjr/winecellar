import Api from "@/services/Api";

export default {
  index() {
    return Api().get("wineries", {});
  },
  listAll() {
    return Api().get("wineries/ddlist", {});
  },
  find(search) {
    return Api().get("wineries/search", {
      params: {
        value: search
      }
    });
  },
  show(wineId) {
    return Api().get(`wineries/${wineId}`);
  },
  post(wine) {
    return Api().post("wineries", wine);
  },
  put(wine) {
    return Api().put(`wineries/${wine.id}`, wine);
  }
};
