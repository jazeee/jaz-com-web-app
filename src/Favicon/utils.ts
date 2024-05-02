import montserratBoldFont from "./Montserrat-Bold.ttf";
import openSansCondensedBoldFont from "./OpenSans_Condensed-Bold.ttf";

const MONTSERRAT_FONT_NAME = "MontserratBold";
const montserratFont = new FontFace(
  MONTSERRAT_FONT_NAME,
  `url(${montserratBoldFont})`,
);
montserratFont.load().then(() => {
  document.fonts.add(montserratFont);
});
const OPEN_SANS_FONT_NAME = "OpenSansCondensedBold";
const openSansFont = new FontFace(
  OPEN_SANS_FONT_NAME,
  `url(${openSansCondensedBoldFont})`,
);
openSansFont.load().then(() => {
  document.fonts.add(openSansFont);
});

interface FaviconProps {
  text: string;
  textColor: string;
  backgroundColor: string;
}

let lastLink: HTMLLinkElement;
export function setFavicon(props: FaviconProps) {
  const { text, textColor, backgroundColor } = props;
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 16, 16);
    context.fillStyle = textColor;
    context.font = `10px Arial`;
    context.font = `10px ${MONTSERRAT_FONT_NAME}`;
    context.font = `11px ${OPEN_SANS_FONT_NAME}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.textRendering = "optimizeLegibility";
    context.fontKerning = "none";
    context.imageSmoothingQuality = "high";

    context.fillText(text, 8, 9);

    const link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName("head")[0].appendChild(link);
    if (lastLink) {
      document.getElementsByTagName("head")[0].removeChild(lastLink);
    }
    lastLink = link;
  }
}
