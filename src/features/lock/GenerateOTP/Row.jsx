import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function Row({ data }) {
    const handleCopy = () => {
        if (data?.keyboardPwd) {
            navigator.clipboard.writeText(data.keyboardPwd).then(() => {
                toast.success("Lock data copied to clipboard!");
            }).catch((err) => {
                toast.error("Failed to copy lock data to clipboard!");
            });
        } else {
            toast.error("No lock data found!");
        }
    };

    return (
        <TableRow>
            <TableCell>{data?.keyboardPwd}</TableCell>
            <TableCell>
                <Button variant="default" size="sm" onClick={handleCopy}>
                    Copy OTP
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default Row;
