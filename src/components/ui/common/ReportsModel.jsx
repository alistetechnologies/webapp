import { useState } from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { Input } from "../input";

import Select from "react-select";
import { CSVLink } from "react-csv";

import useUserHousesStore from "@/features/dashboard/housesStore";
import toast from "react-hot-toast";
import { fetchHouseRecords, fetchLockRecordData, fetchSyncAnalysisReport } from "@/features/reports/api/reports";
import moment from "moment";
import { Spinner } from "../spinner";
// import moment from "moment";

export default function ReportsModel({
  modelHeader = "Generate Report",
  modelDescription = "Fill the details to generate the report",
  isDateRequired
}) {
  const houses = useUserHousesStore((state) => state.houses);

  const [selectedHouses, setSelectedHouses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleSelectHouse(data) {
    setSelectedHouses(data);
  }

  const handleLockRecordData = async () => {
    if (selectedHouses.length === 0) {
			toast.error("Please select a house");
			return;
		}

    const payload = {
			houseIds: selectedHouses.map((h) => h.value),
		};

    setLoading(true);
    const response = await fetchLockRecordData(payload);

    const resData = response?.data;
		if (!response || !resData) {
			toast.error(response?.message || "Failed to generate data");
			setLoading(false);
			return;
		}

		const csvData1 = [];
		for (let d of resData) {
			const houseName = d.houseName;
			const houseId = d.houseId;
			for (let room of d.roomDetails) {
				let roomName = room.roomName;
				let roomId = room.roomId;
				csvData1.push({
					"House Name": houseName,
					HouseId: houseId,
					"Room Name": roomName,
					RoomId: roomId,
					LockId: room.ttLockDetails.lockId,
					"Lock Name": room.ttLockDetails.lockName,
					"Admin password": room.ttLockDetails.adminPassword,
				});
			}
		}

		setCsvData(csvData1);
		toast.success(response.message);
		setLoading(false);
  }

  const handleHouseRecord = async () => {
    if (selectedHouses.length === 0) {
			toast.error("Please select a house");
			return;
		}

		const payload = {
			houseIds: selectedHouses.map((h) => h.value),
		};

		setLoading(true);
    const response = await fetchHouseRecords(payload);
    const resData = response?.data;
    console.log(resData)
    if (!response || !resData) {
      toast.error(response?.message || "Failed to generate data");
      setLoading(false);
      return;
    }

    const csvData1 = [];
    for (let d of resData) {
      csvData1.push({
        "House Name": d.houseName,
        "HouseId": d.houseId,
        "Room Name": d.roomName,
        "RoomId": d.roomId,
      })
    }

		setCsvData(csvData1);
		toast.success(response.message);
		setLoading(false);
  }

  async function handleFetchData() {
    if (startDate === "" || endDate === "") {
      toast.error("Please provide the start and end Dates");
      return;
    }

    if (selectedHouses.length === 0) {
      toast.error("Please select a house");
      return;
    }

    const payload = {
      startDate,
      endDate,
      houseIds: selectedHouses.map((h) => h.value),
    };

    setLoading(true);

    let response = await fetchSyncAnalysisReport(payload);
    
    setLoading(false);
    if (!response.success) {
      toast.error(response.message || "Failed to generate data");
      return;
    }
    setCsvData(response.data);
    toast.success(response.message);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modelHeader}</DialogTitle>
          <DialogDescription>{modelDescription}</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Start Date
            </Label>
            <Input
              id="name"
              type="date"
              className="col-span-3"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              className="col-span-3"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div
            className="grid grid-cols-[20% auto] items-center gap-4"
            style={{ gridTemplateColumns: "20% auto" }}
          >
            <Label htmlFor="startDate" className="text-right">
              Select Houses
            </Label>
            <div className="w-max">
              <Select
                options={houses}
                value={selectedHouses}
                onChange={handleSelectHouse}
                className="mt-1"
                isMulti={true}
              />
            </div>
          </div>
        </div> */}
        <div className="py-4">
          {/* Start Date Section */}
          {isDateRequired !== "No" && isDateRequired !== "no" &&<div className="flex items-center gap-4 mb-4">
            <Label htmlFor="name" className="w-1/4 text-right">
              Start Date
            </Label>
            <Input
              id="name"
              type="date"
              className="flex-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toJSON().split("T")[0]}
            />
          </div>}

          {/* End Date Section */}
          {isDateRequired !== "No" && isDateRequired !=="no" && <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="endDate" className="w-1/4 text-right">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              className="flex-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate ? new Date(startDate).toJSON().split("T")[0] : ""}
              max={`${new Date().toJSON().split("T")[0]}`}
            />
          </div>}

          {/* Select Houses Section */}
          <div className="flex items-center gap-4">
            <Label htmlFor="selectHouses" className="w-1/4 text-right">
              Select Houses
            </Label>
            <div className="flex-1">
              <Select
                options={houses}
                value={selectedHouses}
                onChange={handleSelectHouse}
                className="mt-1"
                isMulti={true}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {csvData.length !== 0 && (
            <CSVLink
              filename={
                isDateRequired==="No"? "lock-record-details": modelHeader
                  ? `${modelHeader}-${moment(startDate).format(
                      "DD-MMM-YYYY"
                    )} - ${moment(endDate).format("DD-MMM-YYYY")}.csv`
                  : `${modelHeader}.csv`
              }
              data={csvData}
              disabled={loading}
            >
              <Button>Download CSV</Button>
            </CSVLink>
          )}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            className="min-w-[100px]"
            type="submit"
            onClick={() => {
              if (isDateRequired === "No") {
								handleLockRecordData();
								return;
							}
              if (isDateRequired === "no") {
								handleHouseRecord();
								return;
							}
              handleFetchData();
            }}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Generate Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
