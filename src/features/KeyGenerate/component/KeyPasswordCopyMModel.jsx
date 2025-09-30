import { Copy, PencilSquare } from "react-bootstrap-icons";
import { Col, Form, Row, Table } from "react-bootstrap";
import { FaFileDownload } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { Alert } from "react-bootstrap";
import { Button } from "@/components/ui/button";

export const KeyPasswordCopyMModel = ({ data, onClose }) => {
  const downloadJSON = () => {
    const jsonData = new Blob([JSON.stringify(data)], { type: "application/json" });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `key.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div sx={{ width: "600px", p: 3, bgcolor: "white", borderRadius: 2, divShadow: 3 }}>
        <p variant="h5" fontWeight="bold" mb={2}>
          Key Details
        </p>

        <Alert severity="warning" sx={{ mb: 3 }}>
          These details are only shown once for security reasons. Save them securely to use the key.
        </Alert>

        <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mb: 2 }}>
          <p fontWeight="bold">Key ID</p>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <p sx={{ mr: 1 }}>{data.keyId}</p>
            <Button onClick={() => copyToClipboard(data.keyId, "Key ID Copied")}>
              <MdContentCopy fontSize="small" />
            </Button>
          </div>
        </Paper>

        <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <p fontWeight="bold">Key Password</p>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <p sx={{ mr: 1 }}>{data.keyPassword}</p>
            <Button onClick={() => copyToClipboard(data.keyPassword, "Key Password Copied")}>
              <MdContentCopy fontSize="small" />
            </Button>
          </div>
        </Paper>

        <div sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" startIcon={<FaFileDownload />} onClick={downloadJSON}>
            Download Key
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};