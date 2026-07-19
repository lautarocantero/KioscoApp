import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import type { SellCartDataProps } from "@typings/sells/SellComponentTypes";
import SellCartProductsComponent from "./SellCartProductsComponent";

const SellCartDataComponent = ({sellSelected}: SellCartDataProps ): React.ReactNode => {

  if(!sellSelected) {
    return <CircularProgress />
  }

  return (
    <>
      <Typography
          component={'h2'}
          sx={(theme: Theme) => ({
              color: theme?.custom?.fontColor,
              m: 'auto'
          })}
      >
          Productos vendidos
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio unitario</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SellCartProductsComponent sellSelected={sellSelected} />
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}

export default SellCartDataComponent;