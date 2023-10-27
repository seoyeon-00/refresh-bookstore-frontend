import OrderListItem from "../../../components/order-list/OrderListItem";

const OrderList = () => {
  return (
    <section className="border-l border-light_gray min-h-[70vh] p-4 flex-1">
      <OrderListItem />
      <OrderListItem />
    </section>
  );
};

export default OrderList;
