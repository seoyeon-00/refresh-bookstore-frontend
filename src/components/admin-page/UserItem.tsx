import { userDataType } from "@/types/userDataType";
import SettingIcon from "../Common/Icons/SettingIcon";
import UserMinusIcon from "../Common/Icons/UserMinusIcon";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteUser, updateUserRole } from "@/api/user";

type UserItemProps = {
  item: userDataType;
  index: number;
  fetchUser: () => void;
};

const UserItem = ({ item, index, fetchUser }: UserItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    item.isAdmin ? "ADMIN" : "MEMBER"
  );
  const router = useRouter();

  const permissionOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const updateRoleHandler = async (event: any) => {
    event.preventDefault();

    const isAdminStr = item.isAdmin ? "AMDIN" : "MEMBER";
    if (selectedValue === isAdminStr) {
      toast.error("현재 권한 상태와 동일합니다.");
      return;
    }

    const data = {
      id: item.id,
      role: selectedValue,
    };

    const result = await updateUserRole(data);
    if (result.status === 200) {
      toast.success("회원 권한이 수정되었습니다.");
      router.push("/mypage/admin-page");
      setIsOpen(false);
      fetchUser();
    } else {
      toast.error("수정 실패");
    }
  };

  const deleteUserHandler = async () => {
    const shouldDelete = window.confirm(
      `정말로 ${item.name}님을 탈퇴하시겠습니까?`
    );

    if (shouldDelete) {
      try {
        const fetchData = await deleteUser(item.id);
        if (fetchData.status === 200) {
          toast.success(`회원 탈퇴 완료!`);
          fetchUser();
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  return (
    <div className="bg-neutral-100 p-3 text-sm text-center">
      <div className="flex text-sm justify-between items-center">
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
          <button onClick={permissionOpen} className="py-1 px-1">
            <SettingIcon color={"#7b7b7b"} width={"17px"} />
          </button>
          <button onClick={deleteUserHandler} className="py-1 px-1">
            <UserMinusIcon color={"#1bc557"} width={"20px"} />
          </button>
        </div>
      </div>
      <div>
        {isOpen ? (
          <div className="mt-4 flex gap-1 justify-end">
            <div>
              <input
                className="hidden peer"
                type="radio"
                id="ADMIN"
                value="ADMIN"
                name="role"
                onChange={handleChange}
                defaultChecked={item.isAdmin === true ? true : false}
              />
              <label
                className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-neutral-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                htmlFor="ADMIN"
              >
                {" "}
                관리자
              </label>
            </div>
            <div>
              <input
                className="hidden peer"
                type="radio"
                id="MEMBER"
                value="MEMBER"
                name="role"
                onChange={handleChange}
                defaultChecked={item.isAdmin === false ? true : false}
              />
              <label
                className="inline-flex items-center justify-between w-full p-3 text-neutral-400 bg-white border border-neutral-300 rounded-lg cursor-pointer dark:hover:text-neutral-300 dark:border-gray-700 dark:peer-checked:text-point peer-checked:border-point peer-checked:text-point hover:text-gray-600 hover:bg-neutral-100"
                htmlFor="MEMBER"
              >
                회원
              </label>
            </div>
            <button
              onClick={updateRoleHandler}
              className="bg-point text-white px-3 rounded-md"
            >
              수정하기
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserItem;
