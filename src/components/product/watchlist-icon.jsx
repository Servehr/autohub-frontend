import { addToWatchlist, deleteWatchListItem } from "@/apis/watchlist";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { queryClient } from "@/main";

const WatchListIcon = ({onClick, id, inWatchlist }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { data: user, refetch } = useUser();

  useEffect(() => {
    setIsInWatchlist(inWatchlist);
    console.log(isInWatchlist)
  }, [inWatchlist]);

  const handleAddToWatchlist = (e) => {
    console.log(id)
    e.stopPropagation();

    if (!user) {
      return toast.error("Please login to add to watchlist", {
        position: "top-center",
      });
    }

    if (isInWatchlist) {
      setIsInWatchlist(false);
      deleteWatchListItem(id)
        .then(() => {
          toast.success("Product removed from watchlist", {
            position: "top-center",
          });
          onClick(true)
          queryClient.invalidateQueries("watchlist");
        })
        .catch((err) => {
          toast.error(`${err}`, { position: "top-center" });
        });
    } else {
      const data = { product_id: id };
      // Call the API function to add to the watchlist
      addToWatchlist(data)
        .then(() => {
          setIsInWatchlist(true);
          onClick(true)
          toast.success("Product Added to watchlist", { position: "top-center" });
        })
        .catch((err) => {
          toast.error(`${err}`, { position: "top-center" });
        });
    }
  };

  return (
    <>
      <button
        onClick={handleAddToWatchlist}
        className="text-brandGreen text-lg bg-white flex justify-center items-center h-[30px] w-[30px] rounded-full shadow"
      >
        {isInWatchlist ? (
          <FaHeart className="text-brandGreen" />
        ) : (
          <FaRegHeart />
        )}
      </button>
    </>
  );
};

export default WatchListIcon;
