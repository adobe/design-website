import { $element } from "./helpers.js";
const RE_RGB = /rgb\((\s?[0-9]{1,3},?){3}\)/i;
const RE_HEX = /#[0-9a-f]{6}/i;

const TRANS_TIME = 500;

export const Background = {
    topColor: "red",
    $container: null,
    $fade: null,
    transitionTimeout: null,
    generateTransparentColor( baseColor, format ) {
        switch (format) {
            case "hex":
                return `${baseColor}00`;
            case "rgb":
                return baseColor.replace(")", ", 0)");
            default:
                throw new Error(`Unrecognized format: ${foramt}`);
        }
    },
    generateGradientFade( baseColor, format ) {
        const startColor = baseColor;
        const endColor = Background.generateTransparentColor(baseColor, format);
        return `linear-gradient(180deg, ${startColor} 0%, ${startColor} 50%, ${endColor} 100%)`;
    },
    setGradientColors( color ) {
        if (RE_RGB.test(color)) {
            Background.$fade.style.background = Background.generateGradientFade(color, "rgb");
        } else if (RE_HEX.test(color)) {
            Background.$fade.style.background = Background.generateGradientFade(color, "hex");
        } else {
            console.warn(`Background.setColor must be provided a CSS rgb() value or a 6 digit hex value #123456. Received: ${color}`);
        }
    },
    setColor( color ) {
        this.topColor = color;
        Background.transitionColor( color );
    },
    transitionColor( color ) {
        Background.$fade.style.opacity = 0;
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
            this.transitionTimeout = null;
        }
        this.transitionTimeout = setTimeout(() => {
            this.setGradientColors(color);
            Background.$fade.style.opacity = 1;
        }, TRANS_TIME);
    },
};

export function decorateBackground() {
    if ( !Background.$container ) {
        Background.$fade = $element(".background-fade");

        Background.$container = $element("#global-background", [
            Background.$fade,
        ]);
  
        document.body.prepend( Background.$container );
    }
}
