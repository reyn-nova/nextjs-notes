import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, value } = req.body;

  try {
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
}
