class Card {
  constructor(title, imageUrl, technos) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.technos = technos || [];
    this.createdAt = new Date().toISOString();
  }
}
