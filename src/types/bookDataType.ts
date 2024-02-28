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

export type paginationProduct = {
  pagination: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  products: bookDataType[];
};
