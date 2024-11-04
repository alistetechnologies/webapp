export function ApplianceHeader() {
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
    </div>
  );
}
