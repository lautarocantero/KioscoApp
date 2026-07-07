
import { Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import { Breakpoint } from "../../../../typings/ui/ui";
import type { LinkInterface, LinksComponentInterface } from "@typings/ui/appbar.types";

const LinksComponent = ({ linksToShow }: LinksComponentInterface): React.ReactNode => {
  return (
    <>
      {linksToShow.map((link: LinkInterface) => {
        const {label, to, underline} = link;
        (
          <Link
            key={to}
            aria-label={label}
            component={LinkReactRouter}
            to={to}
            sx={{
              fontSize: (theme: Theme) => theme?.typography?.caption?.fontSize,
              textDecoration: { [Breakpoint.Xs]: underline.xs, [Breakpoint.Md]: underline.md },
              color: (theme: Theme) => theme?.custom?.white,
            }}
          >
            {label}
          </Link>
      )})}
    </>
  );
};

export default LinksComponent;
