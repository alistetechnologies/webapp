import Select from "react-select";
import { fetchUserHouses } from "./api/house";
import { useUser } from "../auth/api/userStore";
import { useEffect, useState } from "react";
import { ArrowBigLeft, CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RefreshDataButton from "@/components/ui/common/RefreshData";
import useUserHousesStore from "./housesStore";
import { isOctiot } from "@/utils/browser";
import { octiotFont } from "@/constants/config";

export default function Filter({
  house,
  setSelectedHouse,
  date,
  setDate,
  dateShow = true,
  backBtn = false,
  backLink = "/",
  link = "/",
  refreshBtn = true,
  onClick,
}) {
  const [options, setOptions] = useState([]);

  const user = useUser.getState().user;
  const updateHouse = useUserHousesStore((state) => state.updateHouses);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserHouses = async () => {
      const response = await fetchUserHouses(user?.email);

      const options = response?.masterOf?.map((h) => ({
        label: h?.houseName,
        value: h?.houseAccessCode,
      }));
      let memberof = response?.memberOf?.map((h) => ({
        label: h?.houseName,
        value: h?.houseAccessCode,
      }));
      const allHouses = [...options, ...memberof];
      setOptions(allHouses);
      updateHouse(allHouses);
    };
    getUserHouses();
  }, [user]);

  const houseName = options?.find((h) => {
    return h?.value === house?.value;
  });

  return (
    <div className="w-full bg-white p-4 mb-6 rounded-md top-0 sticky mt-8 z-10">
      <div className="space-y-4 flex gap-4 items-center">
        <div className="flex gap-4 items-center flex-1">
          {backBtn && <CircleChevronLeft onClick={() => navigate(backLink)} />}
          <h2 className="text-2xl hover:underline"  style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>House Name:</h2>

          <Select
            options={options}
            placeholder="Select a house"
            value={houseName}
            onChange={(value) => {
              setSelectedHouse(value);
              useUser
                .getState()
                .updateUser({ ...user, selectedHouse: value.value });
            }}
            className="flex-1 mt-0"
          />
        </div>
        {dateShow && (
          <div
            className="flex gap-4 items-center m-0 mt-0 flex-1"
            style={{ marginTop: 0 }}
          >
            <h2 className=" text-2xl"  style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Date:</h2>
            <input
              type="date"
              className="border p-2 rounded-md border-[rgb(204,204,204)] hover:border-slate-600 w-52 mt-0"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        )}

        {refreshBtn && (
          <RefreshDataButton
            onClick={() => onClick()}
            text="Refresh to load fresh data"
          />
        )}
      </div>
    </div>
  );
}
