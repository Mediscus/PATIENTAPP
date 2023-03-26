import React, { useCallback, useMemo, useRef, useState } from "react";
import { dataApi } from "dan-api/dummy/LabPrescriptionData";
import { DataGrid } from "@mui/x-data-grid";

const LabPrescriptionTable = () => {
  const gridStyle = useMemo(() => ({ height: "318px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);

  const [column, setColumn] = useState([
    { field: "id", headerName: 'ID', width: 170 },
    { field: "investigation", headerName: 'Investigation', width: 170 },
    { field: "investigation_type", headerName: 'Type', width: 170 },
    { field: "details", headerName: 'Details', width: 170 },
    { field: "date", headerName: 'Date', width: 170 },
    { field: "specialInstruction", headerName: 'Instruction', width: 170 },
  ]);

  return (
    <div style={gridStyle}>
      <DataGrid
        rows={rowData}
        columns={column}
        pageSize={5}
        showCellRightBorder={true}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default LabPrescriptionTable;
