import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Apple MacBook Air (M1, 2020)",
      image: "https://m.media-amazon.com/images/I/51oOE6k7n-L._AC_SL1500_.jpg",
      price: 35000,
      stock: 10,
    },
    {
      title: "Dell XPS 13 (2021)",
      image:
        "https://i.rtings.com/assets/products/Sg92Amv1/dell-xps-13-2021/design-medium.jpg?format=auto",
      price: 11150,
      stock: 15,
    },
    {
      title: "HP Spectre x360 (2021)",
      image:
        "https://cdn.mos.cms.futurecdn.net/Hrq2TjjHh64VLrc3YgFYA8-1200-80.jpg",
      price: 12500,
      stock: 20,
    },
    {
      title: "Asus ROG Zephyrus G14",
      image: "https://m.media-amazon.com/images/I/71+DAcqLZmL._AC_SL1500_.jpg",
      price: 14500,
      stock: 15,
    },
    {
      title: "Lenovo ThinkPad X1 Carbon (Gen 9)",
      image: "https://m.media-amazon.com/images/I/51FOmWwmqaL.jpg",
      price: 14000,
      stock: 25,
    },
    {
      title: "Microsoft Surface Laptop 4",
      image: "https://m.media-amazon.com/images/I/71qKfFqgEiL._AC_SL1500_.jpg",
      price: 28000,
      stock: 40,
    },
    {
      title: "Acer Swift 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipYTEhjo2csEET9y2c0-sAdrcyNEHIl2G9Q&s",
      price: 68000,
      stock: 60,
    },
    {
      title: "Razer Blade 15",
      image:
        "https://m.media-amazon.com/images/I/71Ka8WrKOEL._AC_UF894,1000_QL80_.jpg",
      price: 28000,
      stock: 10,
    },
    {
      title: "Samsung Galaxy Book Pro",
      image: "https://m.media-amazon.com/images/I/61t8BoU1lFS._AC_SL1440_.jpg",
      price: 12500,
      stock: 18,
    },
    {
      title: "Google Pixelbook Go",
      image:
        "https://cdn.mos.cms.futurecdn.net/efhFoMEcdnPXQFDQPBiZD3-1200-80.jpg",
      price: 22000,
      stock: 22,
    },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
