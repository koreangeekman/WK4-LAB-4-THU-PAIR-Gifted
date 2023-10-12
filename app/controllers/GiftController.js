import { AppState } from "../AppState.js";
import { giftService } from "../services/GiftService.js";
import { setHTML } from "../utils/Writer.js";


function _drawGIFs() {
  let contentHTML = '';
  console.log('search results length', AppState.searchResults.length);
  AppState.searchResults.forEach(result => contentHTML += `
      <div class="card cardTemplate m-3" onclick="app.GiftController.selectGIF('${result.id}')">
        <img src="${result.images.preview_gif.url}" alt="${result.title}"></img>
      </div>
      `)
  setHTML('listGIFs', contentHTML)
}

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

  async search() {
    document.getElementById('giftList').classList.add('d-none')
    document.getElementById('listGIFs').classList.remove('d-none')
    const query = document.getElementById('search').value
    await giftService.search(query)
    _drawGIFs();
  }

  selectGIF(id) {

  }

}