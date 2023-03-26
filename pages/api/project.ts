import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { name } = req.body;

      await prisma.project.create({
        data: {
          name,
        },
      });
      res.status(200).json({ message: "New project created" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, name } = req.body;

      await prisma.project.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      res.status(200).json({ message: "Project updated" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      await prisma.project.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Project deleted" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }
}
