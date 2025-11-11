import { TableRow, TableHead } from "@/components/ui/table";
import { octiotFont } from "@/constants/config";
import { isOctiot } from "@/utils/browser";

const HousesHeader = () => {
  return (
    <TableRow className="text-black">
      <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.NO</TableHead>
      <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>House Name</TableHead>
      <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Actions</TableHead>
    </TableRow>
  );
};

export default HousesHeader;
