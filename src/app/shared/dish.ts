import { Comment } from './comment';

export class Dish {
  id: number;
  name: string;
  image: string;
  category: string;
  label: string;
  price: boolean;
  featured: boolean;
  description: string;
  comments: Comment[];
}
