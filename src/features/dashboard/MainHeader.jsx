import { TableHead, TableRow } from "@/components/ui/table";
import { octiotFont } from "@/constants/config";
import { isOctiot } from "@/utils/browser";

export function MainHeader() {
  return (
    <TableRow className="text-black">
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize,padding:'25px'} : {})}}>S.No</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Room Name</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Occupied</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Total Devices</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>On Devices</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Connectivity Status</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Total Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Smart Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Switch Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Actions</TableHead>
    </TableRow>
  );
}
