import { Box, type Theme } from "@mui/material";

const BlobBackground = (): React.ReactNode => (
    <>
        <style>{`
            @keyframes blob1 {
                0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) translate(0, 0); }
                33%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.08) translate(2%, 3%); }
                66%       { border-radius: 50% 60% 40% 60% / 40% 50% 60% 50%; transform: scale(0.95) translate(-2%, 1%); }
            }
            @keyframes blob2 {
                0%, 100% { border-radius: 40% 60% 60% 40% / 40% 50% 60% 50%; transform: scale(1) translate(0, 0); }
                33%       { border-radius: 60% 40% 40% 60% / 60% 40% 50% 40%; transform: scale(1.05) translate(-3%, -2%); }
                66%       { border-radius: 50% 40% 60% 40% / 50% 60% 40% 60%; transform: scale(0.92) translate(1%, -3%); }
            }
            @keyframes blob3 {
                0%, 100% { border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%; transform: scale(1) translate(0, 0); }
                33%       { border-radius: 40% 60% 50% 50% / 60% 50% 40% 50%; transform: scale(1.1) translate(3%, -1%); }
                66%       { border-radius: 60% 40% 60% 40% / 40% 60% 50% 60%; transform: scale(0.97) translate(-1%, 2%); }
            }
        `}</style>

        {/* Blob 1 — abajo izquierda */}
        <Box
            sx={(t: Theme) => ({
                position: "absolute",
                bottom: "-15%",
                left: "5%",
                width: "40%",
                height: "55%",
                background: t.custom.backgroundWave1,
                opacity: 0.45,
                filter: "blur(40px)",
                zIndex: 0,
                pointerEvents: "none",
                animation: "blob1 10s ease-in-out infinite",
            })}
        />

        {/* Blob 2 — abajo derecha */}
        <Box
            sx={(t: Theme) => ({
                position: "absolute",
                bottom: "-20%",
                right: "-5%",
                width: "45%",
                height: "60%",
                background: t.custom.backgroundWave2,
                opacity: 0.35,
                filter: "blur(50px)",
                zIndex: 0,
                pointerEvents: "none",
                animation: "blob2 13s ease-in-out infinite",
            })}
        />

        {/* Blob 3 — centro inferior */}
        <Box
            sx={(t: Theme) => ({
                position: "absolute",
                bottom: "-25%",
                left: "30%",
                width: "35%",
                height: "50%",
                background: t.custom.backgroundWave1,
                opacity: 0.25,
                filter: "blur(60px)",
                zIndex: 0,
                pointerEvents: "none",
                animation: "blob3 16s ease-in-out infinite",
            })}
        />
    </>
);

export default BlobBackground;
