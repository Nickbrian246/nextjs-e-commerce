// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: Category;
//   images: string[];
// }

// interface Category {
//   id: number;
//   name: string;
//   image: string;
// }
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}
