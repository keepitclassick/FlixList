const ThemeButton = (props) => {
  return (
    <button onClick={props.switchTheme}>
      Switch to {props.theme === "dark" ? "😍Gary😍 Mode" : "😇Kayla😇 Mode"}
    </button>
  );
};

export default ThemeButton;
