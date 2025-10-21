import { Box, Typography } from "@mui/material"
import { Grid } from "@mui/system";
import type { PropsWithChildren } from "react"
import React from "react";

const AuthLayout = ({children}: PropsWithChildren) => {
    const backgroundUrl = 'url(/images/backgroundImages/blackBackgroundImage.jpg)';
    
    if (!children || React.Children.count(children) === 0)
        return <Typography>No children Loaded...</Typography>
    
    return (
        <Box  
            component={'div'}
            sx={{ 
                height: '100vh',
                width: '100vw',
                backgroundImage: backgroundUrl,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Grid 
                container 
                display={'flex'} 
                flexDirection={'row'} 
                justifyContent={'space-between'}
                sx={{ height: '100vh', width: '100vw'}}
                spacing={0}
            >
                <Grid 
                    component={'div'} 
                    spacing={{ xs: 12, sm: 6}} 
                    sx={{
                        display: {xs: 'none', md: 'block'},
                        minWidth: {md: '50%'},
                    }}
                    >
                </Grid>
                <Grid 
                    component={'div'} 
                    spacing={{ xs: 12, sm: 6}}
                    display={'flex'}
                    alignItems={'center'}
                    sx={{
                        backgroundColor: {md: '#333333'},
                        minWidth: {xs: '100%', md: '50%'}
                    }}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}

export default AuthLayout
