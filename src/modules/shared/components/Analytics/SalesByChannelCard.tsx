// import { Box, Typography } from "@mui/material";
// import type { SalesChannelSlice } from "@typings/ui/uiModules";
// import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
// import NoisyCard from "../Cards/NoisyCard";

// interface SalesByChannelCardProps {
//     channels: SalesChannelSlice[];
//     centerLabel: string;
// }

// const SalesByChannelCard = ({ channels, centerLabel }: SalesByChannelCardProps): React.ReactNode => {
//     const [totalValue, totalUnitLabel] = centerLabel.split("\n");

//     return (
//         <NoisyCard sx={{ p: 2.5 }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
//                 Ventas por canal
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Box sx={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
//                     <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                             <Pie
//                                 data={channels}
//                                 dataKey="value"
//                                 nameKey="label"
//                                 innerRadius={42}
//                                 outerRadius={65}
//                                 paddingAngle={2}
//                                 stroke="none"
//                             >
//                                 {channels.map((c) => (
//                                     <Cell key={c.label} fill={c.color} />
//                                 ))}
//                             </Pie>
//                         </PieChart>
//                     </ResponsiveContainer>
//                     <Box
//                         sx={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                             textAlign: "center",
//                         }}
//                     >
//                         <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
//                             {totalValue}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "text.secondary" }}>
//                             {totalUnitLabel}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
//                     {channels.map((c) => (
//                         <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c.color, flexShrink: 0 }} />
//                             <Typography variant="caption" sx={{ flex: 1, color: "text.secondary" }}>
//                                 {c.label}
//                             </Typography>
//                             <Typography variant="caption" sx={{ fontWeight: 600, flexShrink: 0 }}>
//                                 {c.pct}% ({c.value})
//                             </Typography>
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//         </NoisyCard>
//     );
// };

// export default SalesByChannelCard;