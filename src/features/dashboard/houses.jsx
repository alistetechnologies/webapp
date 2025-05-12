import { Table, TableHeader, TableBody } from "@/components/ui/table";
import HousesHeader from "./houses-header";
import House from "./house-row";

const Houses = ({ houses }) => {
  return (
    <div>
      {houses?.length ? (
        <Table className="w-full bg-white">
          <TableHeader>
            <HousesHeader />
          </TableHeader>
          <TableBody>
            {houses?.map((house, index) => {
              return <House house={house} index={index} />;
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-black text-xl">
          No House to show :/
        </div>
      )}
    </div>
  );
};

export default Houses;
