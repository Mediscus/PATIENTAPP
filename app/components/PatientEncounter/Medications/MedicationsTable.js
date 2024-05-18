import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { dataApi } from "dan-api/dummy/MedicationData";
import axios from "axios";

const MedicationsTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "350px", width: "100%" }), []);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "route",
      headerName: "Route",
      width: 200,
    },
    {
      field: "additionalInstruction",
      headerName: "Additional Instruction",
      width: 200,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 200,
    },
    {
      field: "period",
      headerName: "Period",
      width: 200,
    },
    {
      field: "periodUnit",
      headerName: "Period Unit",
      width: 200,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
      editable: true,
    };
  }, []);

  const fetchMedicationData = useCallback(() => {
    console.log("Fetching medication data...");
    fetch(
      "https://hapi.fhir.org/baseR4/MedicationRequest?_lastUpdated=gt2024-02-10"
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Raw Medication Data:", data);
        if (data.total === 0) {
          console.log("No medication data found.");
          setRowData([]);
        }

        const formattedMedicationData = data.entry
          ? data.entry.map((x) => {
              const medication = x.resource;
              const dosageInstruction = medication.dosageInstruction
                ? medication.dosageInstruction[0]
                : null;
              return {
                id: medication.id,
                status: "active",
                route:
                  dosageInstruction &&
                  dosageInstruction.route &&
                  dosageInstruction.route.coding
                    ? dosageInstruction.route.coding[0].display
                    : "",
                additionalInstruction:
                  dosageInstruction && dosageInstruction.additionalInstruction
                    ? dosageInstruction.additionalInstruction[0].coding[0]
                        .display
                    : "",
                frequency:
                  dosageInstruction &&
                  dosageInstruction.timing &&
                  dosageInstruction.timing.repeat
                    ? dosageInstruction.timing.repeat.frequency
                    : "",
                period:
                  dosageInstruction &&
                  dosageInstruction.timing &&
                  dosageInstruction.timing.repeat
                    ? dosageInstruction.timing.repeat.period
                    : "",
                periodUnit:
                  dosageInstruction &&
                  dosageInstruction.timing &&
                  dosageInstruction.timing.repeat
                    ? dosageInstruction.timing.repeat.periodUnit
                    : "",
              };
            })
          : [];

        console.log("Formatted Medication Data:", formattedMedicationData);
        setRowData(formattedMedicationData);
      })
      .catch((error) => {
        console.error("Error fetching medication data:", error);
      });
  }, []);

  useEffect(() => {
    fetchMedicationData();
  }, []);

  const onGridReady = useCallback(() => {
    fetchMedicationData();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default MedicationsTable;
