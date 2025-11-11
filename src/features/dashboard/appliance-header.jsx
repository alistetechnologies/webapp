import { TableHead, TableRow } from "@/components/ui/table";
import { octiotFont } from "@/constants/config";
import { isOctiot } from "@/utils/browser";

export function ApplianceHeader() {
  return (
    <TableRow className="text-[0.85rem]">
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>S.NO</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Appliance Name</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Appliance On time</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Appliance Online time</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Total Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Smart Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Switch Commands</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>State</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Status</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Offline Since</TableHead>
      <TableHead className="text-black" style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize}:{})}}>Actions</TableHead>
    </TableRow>
  );
  return (
    <div className="grid grid-cols-12 border-b border-gray-600/20 rounded-lg">
      {/* Row 1 */}
      <div className="col-span-1 p-4 flex items-center justify-center">
        S.No
      </div>

      <div className="col-span-2 p-4 flex items-center justify-center">
        Appliance Name
      </div>

      <div className="col-span-2 p-4 flex items-center justify-center">
        Appliance On time
      </div>

      <div className="col-span-2 p-4 flex items-center justify-center">
        Appliance Online time
      </div>

      <div className="col-span-1 p-4 flex items-center justify-center">
        Total Command
      </div>

      <div className="col-span-1 p-4 flex items-center justify-center">
        Switch Command
      </div>

      <div className="col-span-1 p-4 flex items-center justify-center">
        Smart Command
      </div>

      <div className="col-span-1 p-4 flex items-center justify-center">
        State
      </div>

      <div className="col-span-1 p-4 flex items-center justify-center">
        Status
      </div>
      <div className="col-span-1 p-4 flex items-center justify-center">
        Actions
      </div>
    </div>
  );
}
