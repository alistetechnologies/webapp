import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACRemoteButtons,
  tempButton,
  RemoteButtons,
  controlRemoteCommand,
} from "@/constants/Remote";
import { useState } from "react";
import "./AcRemote.css";

export function Remote({ remoteData, deviceId }) {
  const [currentIndex, setCurrentIndeex] = useState(0);
  let remote = remoteData;
  let [powerStage, setPowerStage] = useState(remote.power_state);
  const temKeys = Object.keys(tempButton);
  let n = temKeys.map((e) => {
    return tempButton[e].label;
  });
  let data = [
    ACRemoteButtons["Power Off"].label,
    ACRemoteButtons["Power On"].label,
    ...n,
  ];

  const [payload, setPayload] = useState({
    deviceId,
    command_id: 0,
    command: {},
    transmit_repeats: 1,
    powerCommand: false,
    powerState: undefined,
    remoteId: remoteData,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMinusClick = () => {
    if (currentIndex !== 0) {
      let b = remote.buttons.find(
        (r) => r.name === tempButton[temKeys[currentIndex - 1]].label
      );
      setCurrentIndeex(currentIndex - 1);
      if (b !== undefined) {
        handleButtonClick(b);
      }
    }
  };
  const handlePlusClick = () => {
    if (temKeys.length - 1 !== currentIndex) {
      let b = remote.buttons.find(
        (r) => r.name === tempButton[temKeys[currentIndex + 1]].label
      );
      setCurrentIndeex(currentIndex + 1);
      if (b !== undefined) {
        handleButtonClick(b);
      }
    }
  };
  const handlePowerButton = () => {
    let dataPowerOn = remote.buttons.find(
      (r) => ACRemoteButtons["Power On"].label === r.name
    );
    let dataPowerOff = remote.buttons.find(
      (r) => ACRemoteButtons["Power Off"].label === r.name
    );

    let command = payload;
    if (powerStage === 1) {
      setPowerStage(0);
      command = {
        ...command,
        command: dataPowerOff.code,
        powerCommand: true,
        powerState: 1,
      };
    } else {
      setPowerStage(1);
      command = {
        ...command,
        command: dataPowerOn.code,
        powerCommand: true,
        powerState: 0,
      };
    }
    controlRemoteCommand(command);
  };

  const handleButtonClick = (b) => {
    let command = payload;
    command = {
      ...command,
      command: b.code,
    };
    controlRemoteCommand(command);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Remote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remote</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="power-temp-container">
          <div
            style={{
              height: "45px",
              borderRadius: "50%",
              backgroundColor: powerStage === 1 ? "#0505ffbf" : "grey",
              width: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              handlePowerButton();
            }}
          >
            <img
              src={ACRemoteButtons["Power Off"].image}
              style={{
                height: "35px",
                width: "auto",
              }}
            />
          </div>

          <div className="temp_container">
            <div className="flex mt-3 p-0 counter">
              <div className="plus_minus_btn" onClick={handleMinusClick}>
                <img
                  src={RemoteButtons.minus.image}
                  style={{
                    width: "45px",
                  }}
                />
              </div>
              <div>
                <img
                  src={tempButton[temKeys[currentIndex]].image}
                  style={{
                    width: "45px",
                  }}
                />
              </div>
              <div className="plus_minus_btn" onClick={handlePlusClick}>
                <img
                  src={RemoteButtons.plus.image}
                  style={{
                    width: "45px",
                  }}
                />
              </div>
            </div>
            <div className="temp-text">Temp</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-between">
          {remote.buttons.length !== 0 &&
            remote.buttons.map((b) => {
              if (!data.includes(b.name)) {
                let name = b.name.split(" ");
                return (
                  <div className="btn-text-container">
                    <div
                      className="btn-continer"
                      onClick={() => handleButtonClick(b)}
                    >
                      {name[0][0].toUpperCase()}
                      {name.length >= 2 ? name[1][0].toUpperCase() : ""}
                    </div>
                    <div>{b.name}</div>
                  </div>
                );
              }
            })}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            {/* <Button type="button" variant="secondary">
              Close
            </Button> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
