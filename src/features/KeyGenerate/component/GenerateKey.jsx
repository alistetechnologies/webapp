import React, { useState } from "react";

function GenerateKey({ reload, setReload }) {
  const [keyName, setKeyName] = useState("");

  const handleGenerate = async () => {
    
    await fetch("/api/apiKeyFetch", {
      method: "POST",
      body: JSON.stringify({ name: keyName }),
      headers: { "Content-Type": "application/json" },
    });
    setReload(!reload);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Key Name"
        value={keyName}
        onChange={(e) => setKeyName(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default GenerateKey;
