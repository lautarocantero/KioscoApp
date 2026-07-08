import { Box } from "@mui/material";
import SidebarNavItem from "./SidebarNavItem";
import type { SidebarLinksListProps } from "@typings/ui/sidebar.types";


const SidebarLinksList = ({
        isExpanded,
        navLinks,
        handleNavClick,
        getLinkMeta,
        isSubLinkActive,
        navigate,
    }: SidebarLinksListProps ) => {

  return (
    <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: "2px", px: "8px", pl: isExpanded ? "8px" : "18px" }}>
        {navLinks.map((link) => {
            const { subGroups, hasSubGroups, isActive, isOpen } = getLinkMeta(link);
            return (
                <SidebarNavItem
                    key={link.url}
                    link={link}
                    isHovered={isExpanded}
                    isActive={isActive}
                    isOpen={isOpen}
                    hasSubGroups={hasSubGroups}
                    subGroups={subGroups}
                    onRowClick={handleNavClick}
                    isSubLinkActive={isSubLinkActive}
                    onNavigate={navigate}
                />
            );
            })}
    </Box>
  );
};

export default SidebarLinksList;