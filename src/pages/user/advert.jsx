import { logOut } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { browserType } from "@/store";
import { BeatLoader, BounceLoader } from "react-spinners";

export default function Advert() {
  const { data, isLoading } = useUser();
  const { isMobile } = browserType();
  return (
    <div>
      {/* Profile Picture and Button */}
      <div className="md:hidden flex flex-col justify-center items-center mb-10">
        <div className="flex items-center gap-5">
          <div className="border h-[130px] rounded-full aspect-square w-max p-2 md:p-4">
            <div className="h-full w-full aspect-square rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
              {data && (
                <img
                    src={
                      data.data.avatar
                        ? data.data.avatar
                        : data.data.profile_photo_url
                    }
                  alt=""
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
          <div className="h-[58px] flex flex-col items-center justify-center gap-[1px] rounded-[10px]">
            <p className="text-brandGreen text-sm sm:text-base font-bold">
              {data && data.data?.name}
            </p>
            <p className="font-medium text-sm sm:text-base">
              {data && data.data?.phoneno}
            </p>
          </div>
        </div>

        <div className="w-full justify-center gap-4 flex md:hidden text-xs">
          <div className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold">
            Change Password
          </div>
          <div className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold">
            Edit Profile
          </div>
        </div>
        
      </div>
      <h2 className="text-sm md:text-base font-bold text-brandGreen">
        Profile
      </h2>
      <div className="gap-5 p-5 md:px-0 min-h-[100vh-350px] h-full bg-white shadow md:shadow-none rounded-lg mt-2">
        {isLoading && (
          <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
            {isMobile ? (
              <BeatLoader color="#1c9236" />
            ) : (
              <BounceLoader color="#1c9236" />
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5  ">
          <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
            <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
              Name
            </p>
            <p className="w-full text-ellipsis truncate">{data?.data?.name}</p>
          </div>

          <EditDetails />
          <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
            <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
              Email
            </p>
            <p className="w-full text-ellipsis truncate">{data?.data?.email}</p>
          </div>
          <div className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold">
            <p className="absolute -top-2 left-4 font-semibold text-xs text-brandDarkGray bg-white px-2">
              Phone Number
            </p>
            <p className="w-full text-ellipsis truncate">
              {data?.data?.phoneno}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-end flex">
        <div
          className={`p-2 px-4  bg-brandDarkGray w-max text-sm text-white font-medium rounded-lg`}
          // onClick={() => logOut()}
        >
          Save Changes
        </div>
      </div> */}

      {/* Change Profile Picture Button */}
      {/* <div className="w-full my-2">
        <div
          className="text-xs"
          // className="p-2 px-4  bg-brandGreen w-max text-sm text-white font-medium rounded-lg"
          // onClick={() => logOut()}
        >
          Change Profile Picture
        </div>
      </div> */}

      <div className="w-full justify-center flex md:hidden">
        <div
          className="p-4 py-3 my-2 bg-brandGreen/10 w-max rounded-full text-brandGreen font-semibold"
          onClick={() => logOut()}
        >
          Log Out
        </div>
      </div>
    </div>
  );
}

const EditDetails = ({}) => {
  <input
    type="text"
    className="w-full h-[50px] rounded-lg border border-brandGreen relative flex items-center px-3 text-sm text-brandDarkGray font-bold"
  />;
};


// const Highlight = ()