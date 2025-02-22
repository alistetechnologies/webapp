import Select from "react-select";
import { fetchUserHouses } from "./api/house";
import { useUser } from "../auth/api/userStore";
import { useEffect, useState } from "react";
import { ArrowBigLeft, CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RefreshDataButton from "@/components/ui/common/RefreshData";

let rerender = 0;

export default function Filter({
  house,
  setSelectedHouse,
  date,
  setDate,
  dateShow = true,
  backBtn = false,
  link = "/",
  refreshBtn = true,
  onClick,
}) {
  const [options, setOptions] = useState([]);

  const user = useUser.getState().user;
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
      setOptions([...options, ...memberof]);
    };
    getUserHouses();
  }, [user]);

  rerender += 1;

  const houseName = options?.find((h) => {
    return h?.value === house?.value;
  });

  return (
    <div className="w-full bg-white p-4 mb-6 rounded-md">
      <div className="space-y-4 flex gap-4 items-center">
        <div className="flex gap-4 items-center flex-1">
          {backBtn && <CircleChevronLeft onClick={() => navigate("/lock")} />}
          <h2 className="text-2xl hover:underline">House Name:</h2>

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
            <h2 className=" text-2xl">Date:</h2>
            <input
              type="date"
              className="border p-2 rounded-md border-[rgb(204,204,204)] hover:border-slate-600 w-52 mt-0"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
