import React, { useCallback, useMemo, useRef, useState } from "react";
import { dataApi } from "dan-api/dummy/LabPrescriptionData";
import { DataGrid } from "@mui/x-data-grid";

const LabPrescriptionTable = () => {
  const gridStyle = useMemo(() => ({ height: "318px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);

  const [column, setColumn] = useState([
    { field: "id" },
    { field: "status" },
    { field: "intent" },
    { field: "investigation" },
    { field: "priority" },
    { field: "details" },
    { field: "date" },
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
