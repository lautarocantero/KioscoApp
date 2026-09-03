import { Box, Skeleton, Stack, type Theme } from "@mui/material";

const MembershipPlanCardSkeleton = (): React.ReactNode => (
    <Box
        sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 260,
            border: "1px solid",
            borderColor: theme.custom.darkGray,
            borderRadius: "16px",
            backgroundColor: theme.custom.background,
            overflow: "hidden",
        })}
    >
        <Box sx={(theme: Theme) => ({ display: "flex", flexDirection: "column", gap: 1.75, padding: "22px 24px", backgroundColor: theme.custom.lightBackground })}>
            <Stack direction="row" spacing={1.5} alignItems="center">
                <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: "12px" }} />
                <Skeleton variant="text" width="60%" height={28} />
            </Stack>
            <Skeleton variant="text" width="40%" height={40} />
        </Box>
        <Stack spacing={0.75} sx={{ flex: 1, padding: "20px 24px 24px" }}>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />
        </Stack>
    </Box>
);

export default MembershipPlanCardSkeleton;
