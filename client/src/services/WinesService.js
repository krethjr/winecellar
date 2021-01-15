import Api from "@/services/Api";

export default {
  index() {
    return Api().get("wines", {});
  },
  find(search) {
    return Api().get("wines/search", {
      params: {
        value: search
      }
    });
  },
  show(wineId) {
    return Api().get(`wines/${wineId}`);
  },
  wotd() {
    return Api().get(`wines/random`);
  },
  post(wine) {
    return Api().post("wines", wine);
  },
  put(wine) {
    return Api().put(`wines/${wine.id}`, wine);
  }
};
