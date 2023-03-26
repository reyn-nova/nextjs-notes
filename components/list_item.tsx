import IconButton from "./icon_button";

type ListItemComponentType = {
  value?: string;
  onEdit?: () => void;
  onClick?: () => void;
};

const ListItem = ({ value, onEdit, onClick }: ListItemComponentType) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 20,
        width: 320,
        justifyContent: "space-between",
      }}
    >
      <div onClick={onClick}>
        <input
          disabled
          style={{
            color: "black",
            padding: 10,
            width: 250,
            borderRadius: 5,
            backgroundColor: "gainsboro",
          }}
          value={value}
        />
      </div>

      <IconButton variant="edit" onClick={onEdit} />
    </div>
  );
};

export default ListItem;
