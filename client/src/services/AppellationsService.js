import Api from "@/services/Api";

export default {
  index() {
    return Api().get("appellations", {});
  },
  listAll() {
    return Api().get("appellations/ddlist", {});
  },
  find(search) {
    return Api().get("appellations/search", {
      params: {
        value: search
      }
    });
  },
  show(appellationId) {
    return Api().get(`appellations/${appellationId}`);
  },
  post(appellation) {
    return Api().post("appellations", appellation);
  },
  put(appellation) {
    return Api().put(`appellations/${appellation.id}`, appellation);
  }
};
