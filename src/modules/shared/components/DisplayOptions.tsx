import { Grid } from "@mui/material";
import AppLayout from "../layout/AppLayout";
import OptionsList from "./OptionsList";
import type { DisplayOptionsInterface } from "../../../typings/ui/uiModules";


const DisplayOptions = ({title, icon,links, disconnect} : DisplayOptionsInterface): React.ReactNode => {

    return (
        <AppLayout isOptions title={title} icon={ icon ?? null}>
          <Grid
            container 
            display={'flex'} 
            flexDirection={'column'} 
            spacing={'1em'}
            sx={{ 
              width: '70%',
              mb: '1em',
              flexWrap: 'wrap',
            }}>
            <OptionsList links={links} disconnect={disconnect ?? undefined}/>
          </Grid>
        </AppLayout>
    )
}

export default DisplayOptions;