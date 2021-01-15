import Api from "@/services/Api";
import WinesService from "@/services/WinesService";

export default {
  index() {
    return Api().get("cellarWines", {});
  },
  find(search) {
    return Api().get("cellarWines/search", {
      params: {
        value: search
      }
    });
  },
  show(mywineId) {
    return Api().get(`cellarWines/${mywineId}`);
  },
  post(mywine) {
    var cwResult = null;

    WinesService.post(mywine)
      .then(result => {
        mywine.wineId = result.data.id;
        // eslint-disable-next-line no-console
        console.log("mywine:", mywine);
        cwResult = Api().post("cellarWines", mywine);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Service Error", error.response);
      });

    // eslint-disable-next-line no-console
    console.log("Service Result:", cwResult);
    return cwResult;
  },
  put(mywine) {
    return Api().put(`cellarWines/${mywine.id}`, mywine);
  }
};
