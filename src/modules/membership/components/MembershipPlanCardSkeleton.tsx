import { Box, Skeleton, Stack, type Theme } from "@mui/material";

const MembershipPlanCardSkeleton = (): React.ReactNode => (
    <Box
        sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            flex: 1,
            minWidth: 220,
            border: "1px solid",
            borderColor: theme.custom.darkGray,
            borderRadius: "12px",
            padding: 2.5,
            backgroundColor: theme.custom.lightBackground,
        })}
    >
        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: "8px" }} />
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={40} />
        <Stack spacing={0.75} sx={{ flex: 1, my: 1 }}>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="85%" />
        </Stack>
        <Skeleton variant="rounded" height={40} />
    </Box>
);

export default MembershipPlanCardSkeleton;
