export type bookDataType = {
  id?: string;
  categoryId: string | number;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  isbn: string;
  description: string;
  price: number;
  imagePath: string;
  isBestSeller: boolean;
  originalISBN?: string | undefined;
  amount?: number | undefined;
};
