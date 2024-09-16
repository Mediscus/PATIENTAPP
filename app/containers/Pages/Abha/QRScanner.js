import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef();
  const fileInputRef = useRef();
  const canvasRef = useRef();

  // const startScan = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: { facingMode: 'environment' } })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       setScanning(true);
  //       setScannedData(null); // Reset scanned data when starting a new scan
  //     })
  //     .catch((error) => console.error('Error accessing camera:', error));
  // };

  const stopScan = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
  };

  useEffect(() => {
    if (scanning) {
      const scanQRCode = () => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setScannedData(code.data);
            stopScan();
          }
        }
        if (scanning) {
          requestAnimationFrame(scanQRCode);
        }
      };
      scanQRCode();
    }
  }, [scanning]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = new Image();
        imageData.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          ctx.drawImage(imageData, 0, 0, canvas.width, canvas.height);
          const imageDataFromCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageDataFromCanvas.data, imageDataFromCanvas.width, imageDataFromCanvas.height);
          if (code) {
            setScannedData(code.data);
          } else {
            setScannedData('No QR code found.');
          }
        };
        imageData.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    // Logic to share the scanned data with HIP and get confirmation
    alert(`Shared your details with HIP: ${scannedData}`);
  };

  const handleCancel = () => {
    setScannedData(null);
  };

  return (
    <Box sx={{display : 'flex' , justifyContent:'start' , gap: '10px' }}>
      {!scanning ? (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
          <Button variant="contained" onClick={() => fileInputRef.current.click()}>Scan QRCode</Button>
          {/* <Button variant="contained" color="primary" onClick={startScan}>Start Scanning</Button> */}
        </>
      ) : (
        <Box>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <Button variant="contained" color="secondary" onClick={stopScan}>Stop Scanning</Button>
        </Box>
      )}
      {scannedData && (
        <Dialog
          open={Boolean(scannedData)}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Scanned QR Code</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Scanned QR Code: {scannedData}
              <br />
              You consent to the above information to be shared with HIP. They can use this information for your registration and linking your health records.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">Cancel</Button>
            <Button onClick={handleShare} color="primary" autoFocus>Share</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default QRScanner;
