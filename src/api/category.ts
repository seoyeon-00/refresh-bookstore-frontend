type getCategoryType = {
  page: number;
  size: number;
};

export const getCategory = async ({ page, size }: getCategoryType) => {
  try {
    const response = await fetch(`/api/categories?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const categoryData = await response.json();
      return categoryData;
    } else {
    }
  } catch (error) {
    console.error("");
  }
};
