import "./companies-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { ICompany } from "../../types/global.typing";


const column: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "name", headerName: "Name", width: 200 },
   { field: "size", headerName: "Size", width: 150 },
   {
      field: "createdAt",
      headerName: "Creation Time",
      width: 200,
      renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
   },
];

interface ICompaniesGridProps {
   data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
   return (
      <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
   );
};

export default CompaniesGrid;
