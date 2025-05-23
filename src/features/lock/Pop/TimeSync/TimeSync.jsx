import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { serverUrl, token } from "@/constants/config";
import toast from "react-hot-toast";
import Row from "./Row";
import moment from "moment";

function TimeSync({ lock, open, setOpen }) {
    let [record,setRecord] = useState([])
 

  const getUnblokingRecord = async(date)=>{
    const toastId = toast.loading('Waiting...');

    await axios.post(`${serverUrl.lockservice}/lockUpdateLogs`,{
        "lockId":lock.lockId,
        "startDate":date,
        "endDate":date
    },{
        headers:{
            Authorization:token
        }
    }).then((res=>{
        if(res.data.success && res?.data?.data?.logs?.length>0){
          setRecord(res.data.data.logs || [])
        }else{
            toast.error("Data Not Found")
            setRecord([])
        }
    })).catch(err=>{
      if(err?.response?.data?.success===false && err?.response?.data?.data?.logs?.length===0){
        toast.error("Data Not Found")
      }else{
        toast.error("Something went wrong")
      }
      setRecord([])
    }).finally(()=>{
      toast.dismiss(toastId)
    })
  }
  useEffect(()=>{
    if(open){
      getUnblokingRecord(moment(new Date()).format('YYYY-MM-DD'))
    }
  },[open])
  return (
    <Dialog
      open={open}  
    >
      <DialogContent
      
        style={{
            zIndex: "1234532",
            position: "fixed",
            maxHeight: "80vh",
            width: "80vw",
            overflow: "scroll",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding:"2%",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        className=" bg-white"
      >
        <DialogHeader>
          <DialogTitle className=" flex justify-between"><div>Time Sync History</div><div className="shadow-2xs justify-center items-start flex cursor-pointer border-2 leading-none rounded-[50%] w-6 h-6" onClick={()=>{
            setRecord([])
             setOpen(false)
          }}>x</div></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div
          className='flex gap-4 items-center  mt-3 flex-1'
        //   style={{ marginTop: 0 }}
        >
          <h2 className=' text-2xl'>Date:</h2>
          <input
            type='date'
            defaultValue={moment(new Date()).format('YYYY-MM-DD')}
            className='border p-2 rounded-md border-[rgb(204,204,204)] hover:border-slate-600 w-52 mt-0'
            max={moment(new Date()).format('YYYY-MM-DD')}
            onChange={(e) => getUnblokingRecord(e.target.value)}
          />
        </div>
        <Table className="w-full bg-white mt-3">
          <TableHeader>
            <Header />
          </TableHeader>
          <TableBody>
            {
              record.sort((a,b)=>new Date(a.timestamp).getTime()-new Date(b.timestamp).getTime()).map((rec,index)=>{
                return (
                    <Row
                     data={rec}
                     index={index}
                    />
                )
              })
            }
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default TimeSync;
