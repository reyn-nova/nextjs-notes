import { useState } from "react";

import IconButton from "@/components/icon_button";
import NoteItem from "@/components/note_item";

type NoteItemType = {
  id: number;
  value: string;
};

const Home = () => {
  const [modalState, setModalState] = useState("");
  const [noteItems, setNoteItems] = useState<NoteItemType[]>([]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "black",
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1534193708707-6be94c4f67d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        )`,
        backgroundSize: "cover",
      }}
    >
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 320,
          }}
        >
          <h1>Note</h1>

          <IconButton
            variant="add"
            backgroundColor="green"
            onClick={() => setModalState("Add")}
          />
        </div>

        {noteItems.map(({ id, value }) => {
          <NoteItem
            key={id}
            onEdit={() => setModalState("Edit")}
            value={value}
          ></NoteItem>;
        })}

        {modalState !== "" ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 320,
                backgroundColor: "white",
                borderRadius: 5,
                color: "black",
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h1>{modalState} Note</h1>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {modalState === "Edit" ? (
                    <IconButton
                      variant="delete"
                      backgroundColor="red"
                      margin="0px 10px 0px 0px"
                    />
                  ) : null}

                  <IconButton
                    variant="close"
                    onClick={() => setModalState("")}
                  />
                </div>
              </div>

              <input
                placeholder="Type your note..."
                style={{
                  color: "black",
                  padding: 10,
                  width: "100%",
                  backgroundColor: "gainsboro",
                  borderRadius: 5,
                  marginTop: 20,
                }}
              />

              <IconButton
                variant="done"
                backgroundColor="green"
                onClick={() => setModalState("")}
                width="100%"
                margin="20px 0px 0px 0px"
              />
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
};

export default Home;
