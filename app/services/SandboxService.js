import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { Pop } from "../utils/Pop.js";
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

  async removeOpenedGift(id) {
    try {
      const yes = await Pop.confirm('Are you sure you want to remove this GIFt?')
      if (!yes) { return }
      const res = await api.delete(`api/gifts/${id}`)
      // console.log('attempting delete', res.data);
      AppState.gifts = AppState.gifts.filter(gift => gift.id != id)
    } catch (error) {
      console.error('attempted to remove an already opened gift', error);

    }
  }
}

export const sandboxService = new SandboxService();