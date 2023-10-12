import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawGifts() {
  let contentHTML = '';
  AppState.gifts.forEach(gift => contentHTML += gift.giftClosedTemplate)
  setHTML('giftList', contentHTML)
}

export class SandboxController {
  constructor() {
    AppState.on('account', sandboxService.getGifts)
    AppState.on('gifts', _drawGifts)
  }

  addGift(event) {
    try {
      event.preventDefault();
      const newGift = getFormData(event.target);
      sandboxService.addGifts(newGift);
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async removeOpenedGift(id) {
    try {
      await sandboxService.removeOpenedGift(id);
    } catch (error) {
      console.error('attempted to remove an already opened gift', error);
    }
  }

}