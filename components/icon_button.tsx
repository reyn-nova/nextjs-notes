type IconButtonComponentType = {
  variant: string;
  onClick?: () => void;
  backgroundColor?: string;
  width?: string | number;
  margin?: string | number;
};

const IconButton = ({
  variant,
  onClick,
  backgroundColor = "gray",
  width = 40,
  margin,
}: IconButtonComponentType) => {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor,
        borderRadius: 5,
        height: 40,
        width,
        margin,
      }}
    >
      <i className="material-icons">{variant}</i>
    </button>
  );
};

export default IconButton;
