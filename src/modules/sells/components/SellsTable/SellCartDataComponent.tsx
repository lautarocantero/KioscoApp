import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import type { SellCartDataProps } from "@typings/sells/SellComponentTypes";
import SellCartProductsComponent from "./SellCartProductsComponent";

const SellCartDataComponent = ({currentSell}: SellCartDataProps ): React.ReactNode => {

  if(!currentSell) {
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
            <SellCartProductsComponent currentSell={currentSell} />
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}

export default SellCartDataComponent;