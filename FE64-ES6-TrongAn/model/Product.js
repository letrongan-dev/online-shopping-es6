export class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    desc,
    type,
    image,
    inventory,
    rating
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.desc = desc;
    this.type = type;
    this.image = image;
    this.inventory = inventory;
    this.rating = rating;
  }
  renderProdList() {
    return `
    <div class="col-4 mt-2">
      <div class="card">
        <img src= ${this.image} height="250"/>
        <p>${this.desc}</p>
        <button class="btn btn-success">Cart</button>
      </div>
    </div>`;
  }
}
