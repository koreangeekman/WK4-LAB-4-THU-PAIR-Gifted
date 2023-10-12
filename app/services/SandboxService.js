import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js";

class SandboxService {
  async addGifts(newGift) {
    try {
      const res = await api.post('api/gifts', newGift)
      AppState.gifts.push(new Gift(res.data))
      AppState.emit('gifts')
    } catch (error) {
      console.error('tried adding gift', error);
    }
  }

  async getGifts() {
    try {
      const res = await api.get('api/gifts');
      console.log(res.data);
      AppState.gifts = res.data.map(gift => new Gift(gift));
    } catch (error) {
      console.error('get gifts attempt', error);
    }
  }

}

export const sandboxService = new SandboxService();