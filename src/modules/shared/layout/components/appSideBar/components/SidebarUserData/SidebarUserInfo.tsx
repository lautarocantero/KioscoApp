import { memo } from "react";
import { Box, Typography, type Theme } from "@mui/material";
import type { SidebarUserInfoProps } from "@typings/account/accountComponentTypes";
import { AuthRoleEnum } from "../../../../../../../typings/auth/enums";

const SidebarUserInfo = ({ name, role, isExpanded }: SidebarUserInfoProps): React.ReactNode => {
  if (!isExpanded) return null;

  const isAdmin = role === AuthRoleEnum.Administrador;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1, overflow: "hidden", gap: 0.5 }}>
      <Typography variant="body2" noWrap sx={(theme: Theme) => ({ color: theme.custom.white, fontWeight: 600, lineHeight: 1.2 })}>
        {name}
      </Typography>

      {role && (
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            alignSelf: "flex-start",
            maxWidth: "100%",
            px: 0.9,
            py: 0.25,
            borderRadius: "999px",
            fontSize: "0.45rem",
            fontWeight: 70,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            ...(isAdmin
              ? {
                  color: "#3A2205",
                  background: "linear-gradient(135deg, #FFD874 0%, #F5A623 55%, #E8890C 100%)",
                  boxShadow: "0 0 0 1px rgba(255, 216, 116, 0.35), 0 2px 6px rgba(232, 137, 12, 0.45)",
                }
              : (theme: Theme) => ({
                  color: theme.custom.translucidWhite,
                  background: "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.12) inset",
                })),
          }}
        >
          {isAdmin && (
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 10, height: 10, flexShrink: 0, fill: "#3A2205" }}
            >
              <path d="M5 19h14v2H5v-2Zm0-2 1.6-9.6L10 12l2-6 2 6 3.4-4.6L19 17H5Z" />
            </Box>
          )}
          <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {role}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SidebarUserInfo);
