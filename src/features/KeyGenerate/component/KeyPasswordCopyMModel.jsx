import { Alert, Paper, Button, Box, Typography, IconButton } from "@mui/material";
import { Copy, PencilSquare } from "react-bootstrap-icons";
import { Col, Form, Row, Table } from "react-bootstrap";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
        <Box sx={{ width: "600px", p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Key Details
          </Typography>
  
          {/* Alert Message */}
          <Alert severity="warning" sx={{ mb: 3 }}>
            These details are only shown once for security reasons. Save them securely to use the key.
          </Alert>
  
          {/* Key ID Section */}
          <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mb: 2 }}>
            <Typography fontWeight="bold">Key ID</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>{data.keyId}</Typography>
              <IconButton onClick={() => copyToClipboard(data.keyId, "Key ID Copied")}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
  
          {/* Key Password Section */}
          <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
            <Typography fontWeight="bold">Key Password</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>{data.keyPassword}</Typography>
              <IconButton onClick={() => copyToClipboard(data.keyPassword, "Key Password Copied")}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
  
          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />} onClick={downloadJSON}>
              Download Key
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </div>
    );
  };