import { TableRow, TableHead } from "@/components/ui/table";

const HousesHeader = () => {
  return (
    <TableRow className="text-black">
      <TableHead>S.NO</TableHead>
      <TableHead>House Name</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  );
};

export default HousesHeader;
