import { Box, Collapse } from "@mui/material";
import SidebarSubGroup from "./SidebarSubGroup";
import type { SidebarCollapseProps, SubGroup } from "@typings/ui/sidebar.types";


const SidebarExpandedList = ({
    hasSubGroups,
    isOpen,
    isHovered, 
    subGroups,
    isSubLinkActive,
    onNavigate,
}: SidebarCollapseProps) => {

  return (
    <>
        {hasSubGroups && (
            <Collapse in={isOpen && isHovered} timeout={220}>
                <Box sx={(theme) => ({ backgroundColor: theme.palette.primary.dark, borderRadius: "0 0 8px 8px", pb: "6px" })}>
                    {subGroups.map((group: SubGroup) => (
                        <SidebarSubGroup
                            key={group.groupLabel}
                            group={group}
                            isHovered={isHovered}
                            isSubLinkActive={isSubLinkActive}
                            onNavigate={onNavigate}
                        />
                    ))}
                </Box>
            </Collapse>
        )}
  </>
)};

export default SidebarExpandedList;