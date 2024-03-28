import React, { useState, useRef } from "react";
import jsQR from "jsqr";

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef();
  const fileInputRef = useRef();

  const startScan = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setScanning(true);
        setScannedData(null); // Reset scanned data when starting new scan
      })
      .catch((error) => console.error("Error accessing camera:", error));
  };

  const stopScan = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = new Image();
        imageData.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          ctx.drawImage(imageData, 0, 0, canvas.width, canvas.height);
          const imageDataFromCanvas = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(
            imageDataFromCanvas.data,
            imageDataFromCanvas.width,
            imageDataFromCanvas.height
          );
          if (code) {
            setScannedData(code.data);
          } else {
            setScannedData("No QR code found.");
          }
        };
        imageData.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {!scanning ? (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <button onClick={() => fileInputRef.current.click()}>
            Scan Image
          </button>
          <button onClick={startScan}>Start Scanning</button>
        </>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay={true}
            playsInline
            style={{ width: "100%" }}
          />
          <button onClick={stopScan}>Stop Scanning</button>
        </div>
      )}
      {scannedData && <p>Scanned QR Code: {scannedData}</p>}
    </div>
  );
};

export default QRScanner;
