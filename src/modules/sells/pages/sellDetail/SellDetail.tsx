import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState as SellStateInterface } from '../../../../store/sell/sellSlice';
import { getSellByIdThunk } from "../../../../store/sell/sellsThunks";
import AppLayout from "../../../shared/layout/AppLayout";
import SellDataComponent from "../../components/SellsTable/SellDataComponent";
import SellCartDataComponent from "../../components/SellsTable/SellCartDataComponent";

const SellDetailPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();

    const { _id } = useParams<{ _id: string }>();
    const { sell } = useSelector((state: SellStateInterface) => state);
    const { sellSelected } = sell;
    

    useEffect(() => {
        if(!_id) return;

        const getSellByIdFunction = async () => {
            await dispatch(getSellByIdThunk({_id}));
        };
        getSellByIdFunction();
    }, [_id])

    if(!sellSelected) {
        return <CircularProgress />
    }

    return (
        <AppLayout isOptions title={`Detalle de la venta`}>
            <Grid 
                container 
                display="flex" 
                flexDirection="column" 
                gap={2}
                sx={{
                    marginTop: { xs: '-2em'}
                }}
            >
                <SellDataComponent sellSelected={sellSelected} />
                <SellCartDataComponent sellSelected={sellSelected} />
            </Grid>
        </AppLayout>
    )
}

export default SellDetailPage;