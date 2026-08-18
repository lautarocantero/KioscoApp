import { Box, Skeleton, Stack, type Theme } from "@mui/material";

const KioscoCardSkeleton = (): React.ReactNode => (
    <Box
        component="article"
        sx={(theme: Theme) => ({
            border: "0.5px solid",
            borderColor: theme.custom.darkGray,
            borderRadius: "16px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: theme.custom.lightBackground,
            height: "100%",
        })}
    >
        <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: "12px" }} />
        <Skeleton variant="text" width="70%" height={32} />
        <Skeleton variant="text" width="50%" />
        <Stack direction="row" spacing={3}>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
        </Stack>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rounded" height={40} sx={{ mt: "auto" }} />
    </Box>
);

export default KioscoCardSkeleton;
