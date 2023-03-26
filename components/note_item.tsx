import IconButton from "./icon_button";

type NoteItemComponentType = {
  value?: string;
  onEdit?: () => void;
};

const NoteItem = ({ value, onEdit }: NoteItemComponentType) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 20,
        width: 320,
        justifyContent: "space-between",
      }}
    >
      <input
        disabled
        onChange={() => {}}
        style={{
          color: "black",
          padding: 10,
          width: 250,
          borderRadius: 5,
          backgroundColor: "gainsboro",
        }}
        value={value}
      />

      <IconButton variant="edit" onClick={onEdit} />
    </div>
  );
};

export default NoteItem;
