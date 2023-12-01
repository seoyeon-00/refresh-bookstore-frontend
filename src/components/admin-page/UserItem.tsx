import { userDataType } from "@/types/userDataType";
import SettingIcon from "../Common/Icons/SettingIcon";

type UserItemProps = {
  item: userDataType;
  index: number;
};

const UserItem = ({ item, index }: UserItemProps) => {
  return (
    <div className="bg-neutral-100 p-3 flex text-sm justify-between items-center text-center">
      <div className="w-[5%]">{index + 1}</div>
      <div className="w-[20%]">{item.name}</div>
      <div className="w-[35%]">{item.email}</div>
      <div className="w-[10%] text-xs">
        <div className="w-fit m-auto">
          {item.isAdmin ? (
            <div className="bg-point text-white px-1">관리자</div>
          ) : (
            <div className="bg-neutral-500 text-white px-1">회원</div>
          )}
        </div>
      </div>
      <div className="w-[25%] flex justify-center gap-1">
        <button className=" py-1 px-2">
          <SettingIcon color={"#7b7b7b"} width={"17px"} />
        </button>
        <button className="bg-[#f06d6d] text-white py-1 px-2">탈퇴</button>
      </div>
    </div>
  );
};

export default UserItem;
