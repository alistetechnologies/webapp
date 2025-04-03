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
import { fetchSyncAnalysisReport } from "@/features/reports/api/reports";
import moment from "moment";
import { Spinner } from "../spinner";
// import moment from "moment";

export default function ReportsModel({
  modelHeader = "Generate Report",
  modelDescription = "Fill the details to generate the report",
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

    const response = await fetchSyncAnalysisReport(payload);
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
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="name" className="w-1/4 text-right">
              Start Date
            </Label>
            <Input
              id="name"
              type="date"
              className="flex-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date Section */}
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="endDate" className="w-1/4 text-right">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              className="flex-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

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
                modelHeader
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
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Generate Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
