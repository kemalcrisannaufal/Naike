import { retreiveDataByField } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  if (req.method === "GET") {
    const products = await retreiveDataByField(
      "products",
      "category",
      category as string
    );
    if (products) {
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "success",
        data: products,
      });
    }
  } else {
    res
      .status(405)
      .json({ status: true, statusCode: 405, message: "method not allowed" });
  }
}
