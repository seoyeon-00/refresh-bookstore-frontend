import OrderListItem from "../../../components/order-list/OrderListItem";

const OrderList = () => {
  return (
    <section className="border-l border-light_gray min-h-[70vh] p-[2.5rem] flex-1">
      <div className="font-semibold text-lg mb-7">
        <span>n개</span>의 주문내역이 있습니다.
      </div>
      <OrderListItem />
      <OrderListItem />
    </section>
  );
};

export default OrderList;
