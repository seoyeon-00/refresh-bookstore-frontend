export const deleteOrderItem = async (id: number) => {
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    throw new Error("accessToken is null");
  }

  const item = JSON.parse(accessToken);

  try {
    const response = await fetch(`/api/order-items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${item.value}`,
      },
    });

    if (response.ok) {
      const deleteItem = await response.json();
      return deleteItem;
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
