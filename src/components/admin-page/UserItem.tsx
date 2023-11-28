import { userDataType } from "@/types/userDataType";

type UserItemProps = {
  item: userDataType;
  index: number;
};

const UserItem = ({ item, index }: UserItemProps) => {
  return (
    <div className="bg-neutral-100 p-3 flex text-sm justify-between items-center">
      <div className="w-[5%]">{index + 1}</div>
      <div className="w-[20%]">{item.name}</div>
      <div className="w-[35%]">{item.email}</div>
      <div className="w-[10%] text-xs">
        <div className="w-fit">
          {item.isAdmin ? (
            <div className="bg-point text-white px-1">관리자</div>
          ) : (
            <div className="bg-neutral-500 text-white px-1">회원</div>
          )}
        </div>
      </div>
      <div className="w-[25%] flex justify-end gap-1">
        <button className="bg-neutral-600 text-white py-1 px-2">
          권한설정
        </button>
        <button className="bg-[#f06d6d] text-white py-1 px-2">탈퇴</button>
      </div>
    </div>
  );
};

export default UserItem;
