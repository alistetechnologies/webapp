export function MainHeader() {
  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-12 border-b border-gray-300 rounded-lg">
        {/* Row 1 */}
        <div className="col-span-1 p-4 flex items-center justify-center">
          S.No
        </div>

        <div className="col-span-2 p-4 flex items-center justify-center">
          Room Name
        </div>

        <div className="col-span-2 p-4 flex items-center justify-center">
          Connected Devices
        </div>

        <div className="col-span-2 p-4 flex items-center justify-center">
          Smart Commands
        </div>

        <div className="col-span-2 p-4 flex items-center justify-center">
          Switch Commands
        </div>

        <div className="col-span-1 p-4 flex items-center justify-center">
          Status
        </div>

        <div className="col-span-2 p-4 flex items-center justify-center">
          Action
        </div>
      </div>
    </div>
  );
}
