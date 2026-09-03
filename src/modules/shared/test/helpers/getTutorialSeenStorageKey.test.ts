import { describe, it, expect } from "vitest";
import { getTutorialSeenStorageKey } from "../../helpers/getTutorialSeenStorageKey";
import { TutorialIdEnum } from "@typings/tutorial/enums";

describe("getTutorialSeenStorageKey", () => {
    it("arma la key de localStorage con el prefijo compartido", () => {
        expect(getTutorialSeenStorageKey(TutorialIdEnum.Shop)).toBe("tutorialSeen:shop");
        expect(getTutorialSeenStorageKey(TutorialIdEnum.SelectKiosco)).toBe("tutorialSeen:selectKiosco");
    });
});
