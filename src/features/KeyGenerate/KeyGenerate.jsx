import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
// import { TableHeader } from "@/features/KeyGenerate/component/TableHeader";
// import {TableRow} from "@/features/KeyGenerate/component/TableRow";
import { apiKeyFetch } from "@/features/KeyGenerate/component/api";
import {messages} from "@/features/KeyGenerate/component/notification"
import Filter from "../dashboard/filter";

export function GenerateKey() {
  const [keys, setKeys] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchKeys = async () => {
      setLoading(true);
      const keyData = await apiKeyFetch(setLoading);
      if (keyData.length === 0) {
        messages.error("No API keys found.");
      }
      setKeys(keyData);
      setLoading(false);
    };
    fetchKeys();
  }, []);

//   return (
// //    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
// //       <div className="w-full bg-white p-4 mb-6 rounded-md">
// //         <div className="space-y-4 flex gap-4 items-center">
// //           <div className="flex gap-4 items-center flex-1">
// //             {/* <h2 className="text-2xl hover:underline">Search Key:</h2> */}
// //             <input
// //               type="text"
// //               className="border p-2 rounded-lg"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //              />
// //           </div>
// //         </div>
// //       </div>

// //       {loading && (
// //         <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
// //           <Spinner size="lg" />
// //         </div>
// //       )}
// //       {!loading && (
// //         <Table className="w-full bg-white">
// //           <TableHeader>
// //             {/* <MainHeader /> */}
// //           </TableHeader>
// //           <TableBody>
// //             {keys?.length > 0 &&
// //               keys
// //                 ?.Filter((key) =>
// //                   key.label.toLowerCase().includes(search.toLowerCase())
// //                 )
// //                 .map((key, index) => {
// //                   return <TableRow keyData={key} index={index} />;
// //                 })}
// //           </TableBody>
// //         </Table>
// //       )}
// //     </div>
//   );
}
