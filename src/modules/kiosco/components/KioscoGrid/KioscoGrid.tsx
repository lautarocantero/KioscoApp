import { Box } from "@mui/material";
import type { KioscoGridProps } from "@typings/kiosco/kioscoComponentTypes";
import { KIOSCO_GRID_GAP } from "../../../../config/constants";
import AddKioscoCard from "../AddKioscoCard/AddKioscoCard";
import KioscoCard from "../KioscoCard/KioscoCard";
import KioscoCardSkeleton from "../KioscoCard/KioscoCardSkeleton";
import KioscoNoResults from "../KioscoNoResults/KioscoNoResults";

// Reemplaza el CardCarousel horizontal: grilla responsive (1 col mobile, 2
// tablet, 3 desktop+), scroll vertical. AddKioscoCard siempre primera
// (mockup "2a": "la tarjeta de Sumar un kiosco siempre primera").
const KioscoGrid = ({ kioscos, loading, noResults, entering, onEnter, onCreate, onJoin }: KioscoGridProps): React.ReactNode => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: `${KIOSCO_GRID_GAP}px`,
            alignItems: "stretch",
        }}
    >
        <AddKioscoCard onCreate={onCreate} onJoin={onJoin} />

        {loading
            ? [0, 1, 2].map((index) => <KioscoCardSkeleton key={`skeleton-${index}`} />)
            : kioscos.map((kiosco, index) => (
                  <KioscoCard
                      key={kiosco._id}
                      kiosco={kiosco}
                      colorIndex={index}
                      entering={entering === kiosco._id}
                      onEnter={() => onEnter(kiosco)}
                  />
              ))}

        {!loading && noResults && <KioscoNoResults />}
    </Box>
);

export default KioscoGrid;
