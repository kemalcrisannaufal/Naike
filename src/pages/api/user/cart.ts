/* eslint-disable @typescript-eslint/no-explicit-any */
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          const user = await retrieveDataById("users", decoded.id);
          if (user) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: "success",
              data: user.cart,
            });
          } else {
            res
              .status(404)
              .json({ status: false, statusCode: 404, message: "not found" });
          }
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "forbidden" });
        }
      }
    );
  } else if (req.method === "PUT") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { data } = req.body;
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("users", decoded.id, data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "forbidden" });
        }
      }
    );
  } else if (req.method === "PATCH") {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("users", decoded.id, data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "forbidden" });
        }
      }
    );
  } else {
    res
      .status(405)
      .json({ status: true, statusCode: 405, message: "method not allowed" });
  }
}
