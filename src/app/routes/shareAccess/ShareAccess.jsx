import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/features/auth/api/userStore";
import { useAuth } from "@/features/auth/api/authStore";
import { useNavigate } from "react-router-dom";

import { fetchHouse } from "@/features/dashboard/api/house";
import Filter from "@/features/dashboard/filter";
import useHouseStore from "@/features/dashboard/houseStore";
import { ShareAccessChild } from "@/features/shareAccess/ShareAccessChild";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ShareAccess() {
  const user = useUser.getState().user;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    if (user?.selectedHouse) {
      setSelectedHouse({ value: user.selectedHouse });
    } else {
      setSelectedHouse(null);
    }
  }, [user]);

  const getUserHouse = async () => {
    if (!isLoggedIn() || !selectedHouse?.value) return;
    setLoading(true);
    try {
      const houseDetails = await fetchHouse(selectedHouse.value);

      if (!houseDetails.success) {
        toast.error("Failed to fetch House!");
        setLoading(false);
        return;
      }

      setHouse(houseDetails.data);
      useHouseStore.getState().updateHouse(houseDetails.data);
    } catch (error) {
      toast.error("Error fetching house data!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn() && selectedHouse?.value) {
      getUserHouse();
    }
  }, [selectedHouse?.value, isLoggedIn]);
  if (!selectedHouse) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 pt-0 overflow-y-scroll">
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
        dateShow={false}
        onClick={getUserHouse}
      />

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && house && <ShareAccessChild />}
    </div>
  );
}
