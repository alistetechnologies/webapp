import { TableCell, TableRow } from '@/components/ui/table';
import moment from 'moment';
import React from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function Row({ data }) {
    const handleCopy = () => {
        if (data?.keyData) {
            navigator.clipboard.writeText(data.keyData).catch((err) => {
                console.error('Failed to copy to clipboard:', err);
                toast.error("Failed to copy lock data to clipboard!");
            });
            toast.success("Lock data copied to clipboard!");
        } else {
            toast.error("No lock data found!");
        }
    };

    return (
        <TableRow>
            <TableCell>{data?._id}</TableCell>
            <TableCell>{`${data?.userId?.first_name || ""} ${data?.userId?.last_name || ""}`.trim()}</TableCell>
            <TableCell>{data?.type}</TableCell>
            <TableCell>{moment(data?.startTime).format('LT')}</TableCell>
            <TableCell>{moment(data?.endTime).format('LT')}</TableCell>
            <TableCell>{data?.active ? "True" : "False"}</TableCell>
            <TableCell>{moment(data?.startTime).format('DD MMM YYYY')}</TableCell>
            <TableCell>
                <Button variant="default" size="sm" onClick={handleCopy}>
                    Copy Lock Data
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default Row;
