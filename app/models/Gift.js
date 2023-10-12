export class Gift {
  constructor(data) {
    this.id = data.id || ''
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened || false
    this.creatorId = data.creatorId || ''
  }

  get giftClosedTemplate() {
    if (this.opened) {
      return `
      <div class="card cardTemplate m-3">
        <img src="${this.url}" alt="the gift">
        <p class="tagLine blueBG text-center">${this.tag}</p>
      </div>
      `
    }
    return `
    <div type="button" class="card cardTemplate m-3" onclick="app.GiftController.openGift('${this.id}')">
      <img src="https://images.unsplash.com/photo-1592903297149-37fb25202dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lmdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="wrapping paper">
    </div>
    `
  }

}