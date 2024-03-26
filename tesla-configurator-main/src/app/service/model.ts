export interface Model {
  code: string;
  description: string;
  price: number;
}
export interface ModelList {
  code: string;
  description: string;
  colors: Model[];
}
