import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useUser } from "@/features/auth/api/userStore";
import { useAuth } from "@/features/auth/api/authStore";
import { useNavigate } from "react-router-dom";
import { AutoCuts } from "@/features/AutoCut/AutoCuts";

import { fetchHouse } from "@/features/dashboard/api/house";
import Filter from "@/features/dashboard/filter";
import useHouseStore from "@/features/dashboard/houseStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function AutoCut() {
  const user = useUser.getState().user;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const getUserHouse = async () => {
    if (!isLoggedIn()) return;
    setLoading(true);
    const houseDetails = await fetchHouse(selectedHouse?.value);

    if (!houseDetails.success) {
      toast.error("Failed to fetch House!!");
      setLoading(false);
      return;
    }

    setHouse(houseDetails?.data);
    setLoading(false);
    useHouseStore.getState().updateHouse(houseDetails?.data);
  };

  useEffect(() => {
    if (!isLoggedIn()) return;
    getUserHouse();
  }, [selectedHouse?.value, isLoggedIn]);

  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 pt-0 overflow-y-scroll">
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
        dateShow={false}
        refreshBtn={true}
        onClick={getUserHouse}
      />

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && <AutoCuts />}
    </div>
  );
}
