export const useScrollToSection = () => {
  const scrollToSection = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { scrollToSection, scrollToTop };
};
