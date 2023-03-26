import { useState } from "react";

import { useRouter } from "next/router";

import IconButton from "@/components/icon_button";
import ListItem from "@/components/list_item";
import { prisma } from "@/lib/prisma";

export const getServerSideProps = async (context: any) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(context.params.project_id),
    },
    include: {
      notes: true,
    },
  });

  return {
    props: { notes: project?.notes },
  };
};

type NotesPageType = {
  notes: {
    id: number;
    value: string;
  }[];
};

const NotesPage = ({ notes }: NotesPageType) => {
  const [modalInput, setModalInput] = useState("");

  // null for not showing modal
  // -1 for showing add new note modal
  // other number for showing edit note modal
  const [openedModalId, setOpenedModalId] = useState<number | null>(null);

  const router = useRouter();

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
            onClick={() => {
              setModalInput("");
              setOpenedModalId(-1);
            }}
          />
        </div>

        {notes
          .sort((a, b) => a.id - b.id)
          .map(({ id, value }) => {
            return (
              <ListItem
                key={id}
                onEdit={() => {
                  setModalInput(value);
                  setOpenedModalId(id);
                }}
                value={value}
              ></ListItem>
            );
          })}

        {openedModalId !== null ? (
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
                <h1>{openedModalId === -1 ? "Add" : "Edit"} Note</h1>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {openedModalId !== -1 ? (
                    <IconButton
                      variant="delete"
                      backgroundColor="red"
                      margin="0px 10px 0px 0px"
                      onClick={async () => {
                        await fetch("../api/note", {
                          body: JSON.stringify({
                            id: openedModalId,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                          method: "DELETE",
                        }).then(() => {
                          router.replace(router.asPath);
                        });

                        setOpenedModalId(null);
                      }}
                    />
                  ) : null}

                  <IconButton
                    variant="close"
                    onClick={() => setOpenedModalId(null)}
                  />
                </div>
              </div>

              <input
                value={modalInput}
                placeholder="Type your note..."
                onChange={(event) => setModalInput(event.target.value)}
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
                onClick={async () => {
                  if (openedModalId === -1) {
                    await fetch("../api/note", {
                      body: JSON.stringify({
                        projectId: Number(router.query.project_id),
                        value: modalInput,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                    })
                      .then(() => {
                        router.replace(router.asPath);
                      })
                      .then((err) => console.log(err));
                  } else {
                    await fetch("../api/note", {
                      body: JSON.stringify({
                        id: openedModalId,
                        value: modalInput,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "PUT",
                    }).then(() => {
                      router.replace(router.asPath);
                    });
                  }

                  setOpenedModalId(null);
                }}
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

export default NotesPage;
