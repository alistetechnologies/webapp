import { ApplianceDetails } from './appliance-details';
import { ApplianceHeader } from './appliance-header';

export function Appliances({ appliances, analysisData, connectedDevices }) {
  return (
    <div className="bg-[#e6e4ee] rounded-lg">
      <ApplianceHeader />

      {analysisData &&
        analysisData
          ?.flat()
          ?.map((device, sno) => (
            <ApplianceDetails
              appliances={appliances}
              analysisData={device}
              sno={sno + 1}
              connectedDevices={connectedDevices}
            />
          ))}
    </div>
  );
}
