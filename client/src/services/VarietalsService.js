import Api from "@/services/Api";

export default {
  index() {
    return Api().get("varietals", {});
  },
  listAll() {
    return Api().get("varietals/ddlist", {});
  },
  find(search) {
    return Api().get("varietals/search", {
      params: {
        value: search
      }
    });
  },
  show(varietalId) {
    return Api().get(`varietals/${varietalId}`);
  },
  post(varietal) {
    return Api().post("varietals", varietal);
  },
  put(varietal) {
    return Api().put(`varietals/${varietal.id}`, varietal);
  }
};
