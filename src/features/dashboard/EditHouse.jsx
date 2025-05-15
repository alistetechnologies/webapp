import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPropertyForm from "./EditHouseForm";
import { useEffect, useState } from "react";
import { fetchHouseWithoutStateUpdate } from "./api/house";

const EditProperty = ({ refreshUserHouses, house }) => {
  const [houseData, setHouseData] = useState({});
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const getData = async () => {
      const response = await fetchHouseWithoutStateUpdate(house.value);

      if (response.success) {
        setHouseData(response.data);
      }
    };
    getData();
  }, [house, open]);

  // if (!open) return;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Property Details</DialogTitle>
        </DialogHeader>
        <EditPropertyForm
          house={houseData}
          refreshUserHouses={refreshUserHouses}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProperty;
