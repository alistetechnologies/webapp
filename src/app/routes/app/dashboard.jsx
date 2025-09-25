import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useUser } from "@/features/auth/api/userStore";

import {
  fetchHouse,
  fetchConnectedDevices,
  fetchUserHouses,
} from "@/features/dashboard/api/house";
import Filter from "@/features/dashboard/filter";
import Houses from "@/features/dashboard/houses";
import useHouseStore from "@/features/dashboard/houseStore";

import { MainHeader } from "@/features/dashboard/MainHeader";
import NoRooms from "@/features/dashboard/no-rooms";
import Rooms from "@/features/dashboard/Rooms";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Dashboard() {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!user?.email) {
      navigate("/", { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  const getUserHouses = async () => {
    try {
      setLoading(true);
      const response = await fetchUserHouses(user?.email);

      const options = response?.masterOf?.map((h) => ({
        label: h?.houseName,
        value: h?.houseAccessCode,
      }));

      setHouses(options);
    } catch (err) {
      toast.error("Failed to fetch houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      getUserHouses();
    }
  }, [user]);

  // if (loading) {
  //   return (
  //     <div className='flex justify-center items-center h-full w-full bg-[#EAEBF0]'>
  //       <Spinner size='lg' />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full p-8 pt-0 overflow-y-scroll bg-[#EAEBF0] ">
      {/* Search Box */}
      <div className="w-full bg-white p-4 mt-8 mb-6 rounded-md sticky top-0  z-10">
        <div className="flex gap-4 items-center pt-0">
          {/* <h2 className="text-xl hover:underline">House Name:</h2> */}

          <input
            type="text"
            className="border border-black p-2 rounded-lg flex-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search house..."
          />
        </div>
      </div>

      {/* Houses */}

      {loading ? (
        <div className="flex justify-center items-center  w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      ) : (
        <Houses
          houses={houses?.filter((e) =>
            e.label.toLowerCase().includes(searchText.toLowerCase())
          )}
          refreshUserHouses={getUserHouses}
        />
      )}
    </div>
  );
}
