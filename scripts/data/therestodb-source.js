import API_ENDPOINT from '../globals/api-endpoint';

class TheRestoDbSource {
  static async getListResto() {
    try {
      const response = await fetch(API_ENDPOINT.LIST_OF_RESTO);
      const responseJson = await response.json();

      return responseJson;

    } catch (error) {
      return error;
    }
  }

  static async getDetailResto(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL_OF_RESTO(id));
      const responseJson = await response.json();

      return responseJson;

    } catch (error) {
      return error;
    }
  }


}

export default TheRestoDbSource;