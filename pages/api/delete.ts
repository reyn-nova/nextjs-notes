import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

type Data = {
  id: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;

  try {
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
