import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function GridData ({ rows, columns, ...rest}) {
  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
      <DataGrid
        rowHeight={105}        
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}  
        {...rest}
      />
    </Box>
  );
};
