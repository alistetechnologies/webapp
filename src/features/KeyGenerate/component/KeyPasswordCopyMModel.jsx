import { MdContentCopy } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";

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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Key Details</h2>

        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            These details are only shown once for security reasons. Save them securely to use the key.
          </AlertDescription>
        </Alert>

        <div className="border rounded p-4 mb-3 flex justify-between items-center">
          <p className="font-semibold">Key ID</p>
          <div className="flex items-center gap-2">
            <p>{data.keyId}</p>
            <Button size="sm" onClick={() => copyToClipboard(data.keyId, "Key ID Copied")}>
              <MdContentCopy className="text-lg" />
            </Button>
          </div>
        </div>

        <div className="border rounded p-4 mb-3 flex justify-between items-center">
          <p className="font-semibold">Key Password</p>
          <div className="flex items-center gap-2">
            <p>{data.keyPassword}</p>
            <Button size="sm" onClick={() => copyToClipboard(data.keyPassword, "Key Password Copied")}>
              <MdContentCopy className="text-lg" />
            </Button>
          </div>
        </div>

        <div className="flex justify-start gap-3 mt-4">
          <Button variant="default" className="flex items-center gap-2" onClick={downloadJSON}>
            <FaFileDownload className="text-base" />
            Download Key
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
