import { giftService } from "../services/GiftService.js";

export class GiftController {

  constructor() {
  }

  async openGift(id) {
    try {
      giftService.openGift(id)
    } catch (error) {
      console.error('attempted to open gift', error);
    }
  }

}