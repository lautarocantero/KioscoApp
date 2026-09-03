import { describe, it, expect } from "vitest";
import { getTutorialDockLayout } from "../../helpers/getTutorialDockLayout";

describe("getTutorialDockLayout", () => {
    it("usa el layout compacto en viewports bajos (<460px)", () => {
        expect(getTutorialDockLayout(400)).toEqual({ bubbleWidth: 300, mascotSize: 110 });
    });

    it("usa el layout completo en viewports normales", () => {
        expect(getTutorialDockLayout(900)).toEqual({ bubbleWidth: 390, mascotSize: 210 });
    });

    it("el límite (460px) ya usa el layout completo", () => {
        expect(getTutorialDockLayout(460)).toEqual({ bubbleWidth: 390, mascotSize: 210 });
    });
});
