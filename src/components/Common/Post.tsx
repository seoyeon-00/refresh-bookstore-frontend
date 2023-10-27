import { Dispatch, SetStateAction } from "react";
import DaumPostcode from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { postCodePopupStore } from "../../stores";

type addressType = {
  address: string;
  zonecode: string;
};
const Post = (props: {
  address: addressType;
  setAddress: Dispatch<SetStateAction<addressType>>;
}) => {
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );

  const complete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setAddress({
      ...props.address,
      address: fullAddress,
      zonecode: data.zonecode,
    });
    setPopup(!popup);
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <DaumPostcode
        onComplete={complete}
        className="max-w-[50%] min-w-[350px] min-h-[500px]"
      />
      <p
        className="fixed top-0 right-0 m-4 text-large cursor-pointer text-white"
        onClick={() => setPopup(!popup)}
      >
        ╳
      </p>
    </div>
  );
};

export default Post;
