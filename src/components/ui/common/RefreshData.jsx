import { useState } from "react";

import { IoIosRefresh } from "react-icons/io";
import { HiInformationCircle } from "react-icons/hi";

import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const RefreshDataButton = ({ onClick, text }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={onClick}
            className="px-4 text-white rounded-lg flex items-center py-0"
          >
            <IoIosRefresh /> Refresh
            {/* <HiInformationCircle className={`ml-2 transition-opacity `} /> */}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RefreshDataButton;
