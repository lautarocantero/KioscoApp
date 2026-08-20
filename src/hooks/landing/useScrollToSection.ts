export const useScrollToSection = () => {
  const scrollToSection = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { scrollToSection };
};
