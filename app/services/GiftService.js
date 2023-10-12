import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { api, giphyApi } from "../services/AxiosService.js";

class GiftService {

  async openGift(id) {
    try {
      const giftIndex = AppState.gifts.findIndex(gift => gift.id == id)
      const selectedGift = AppState.gifts[giftIndex]
      selectedGift.opened = true
      const res = await api.put(`api/gifts/${id}`, selectedGift)
      AppState.gifts.splice(giftIndex, 1, new Gift(res.data))
      AppState.emit('gifts')
      console.log(selectedGift, 'array', AppState.gifts);
    } catch (error) {
      console.error('attempted to open gift', error);
    }
  }

  async search(query) {
    console.log(query);
    const res = await giphyApi.get('search', {
      params: {
        q: query
      }
    });
    AppState.searchResults = res.data.data
    console.log(AppState.searchResults);

  }

}

export const giftService = new GiftService();