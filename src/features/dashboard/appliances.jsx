import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplianceDetails } from "./appliance-details";
import { ApplianceHeader } from "./appliance-header";

export function Appliances({ appliances, analysisData, connectedDevices }) {
  return (
    <TableRow className=" w-full p-0">
      <TableCell colspan="8" className="p-0">
        <Table className="bg-slate-100/50 rounded w-full">
          <TableHeader>
            <ApplianceHeader />
          </TableHeader>
          <TableBody>
            {analysisData &&
              analysisData
                ?.filter((device) => {
                  const appliance = appliances[device?.deviceId]?.find(
                    (appliance) =>
                      String(appliance.switchId) === String(device?.switchId)
                  );

                  if (appliance?.deviceType === 7 || !appliance) return false;

                  return true;
                })
                .map((device, sno, data) => {
                  return (
                    <ApplianceDetails
                      appliances={appliances}
                      analysisData={device}
                      sno={sno + 1}
                      connectedDevices={connectedDevices}
                    />
                  );
                })}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
}
