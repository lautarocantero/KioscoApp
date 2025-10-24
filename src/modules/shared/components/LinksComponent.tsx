import { Link } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";

interface LinksComponentProps {
  linksToShow: {
    label: string;
    to: string;
    underline: "underline" | "none" | string;
  }[];
}

const LinksComponent = ({ linksToShow }: LinksComponentProps) => {
  return (
    <>
      {linksToShow.map((link) => (
        <Link
          key={link.to}
          aria-label={link.label}
          component={LinkReactRouter}
          to={link.to}
          sx={{
            fontSize: (theme) => theme?.typography?.caption?.fontSize,
            textDecoration: link.underline,
            color: (theme) => theme?.custom?.fontColor,
          }}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default LinksComponent;
