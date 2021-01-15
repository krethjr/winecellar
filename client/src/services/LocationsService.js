import Api from "@/services/Api";

export default {
  index() {
    return Api().get("locations", {});
  },
  listAll() {
    return Api().get("locations/ddlist", {});
  },
  find(search) {
    return Api().get("locations/search", {
      params: {
        value: search
      }
    });
  },
  show(locationId) {
    return Api().get(`locations/${locationId}`);
  },
  post(location) {
    return Api().post("locations", location);
  },
  put(location) {
    return Api().put(`locations/${location.id}`, location);
  }
};
