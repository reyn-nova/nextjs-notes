import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

type Data = {
  projectId: number;
  value: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { projectId, value } = req.body;

      await prisma.note.create({
        data: {
          value,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
      res.status(200).json({ message: "New note created" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, value } = req.body;

      await prisma.note.update({
        where: {
          id,
        },
        data: {
          value,
        },
      });

      res.status(200).json({ message: "Note updated" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      await prisma.note.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Note deleted" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }
}
