const OrderComplete = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh]">
      <h1 className="text-[25px] mb-8">주문이 완료되었습니다!</h1>
      <div className="flex text-medium">
        <button className="rounded text-white font-medium bg-point w-[130px] h-[40px] disabled:bg-gray m-2">
          메인으로
        </button>
        <button className="rounded text-white font-medium bg-point w-[130px] h-[40px] disabled:bg-gray m-2">
          주문내역확인
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
