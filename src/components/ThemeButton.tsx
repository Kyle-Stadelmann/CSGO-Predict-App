import { THEME_IMGS } from "../constant";

const ThemeButton = ({ bgImageIndex, setBgImageIndex }: ThemeBtnProps) => {
    function onThemeBtnClick() {
        const nextBgIndex = (bgImageIndex === THEME_IMGS.length - 1)
            ? 0
            : bgImageIndex + 1;
        setBgImageIndex(nextBgIndex);
    }

    return (
        <button onClick={onThemeBtnClick} className="theme-btn">
            Temas
        </button>
    );
}

type ThemeBtnProps = {
    bgImageIndex: number,
    setBgImageIndex: Function
}

export default ThemeButton;