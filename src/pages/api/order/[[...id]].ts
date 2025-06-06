/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addData,
  retreiveDataByField,
  retrieveData,
  updateData,
} from "@/lib/firebase/service";
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
        if (decoded && decoded.role === "member") {
          const data: any = await retreiveDataByField(
            "orders",
            "userId",
            decoded.id
          );

          if (data) {
            res.status(200).json({ status: true, statusCode: 200, data: data });
          } else {
            res
              .status(404)
              .json({ status: false, statusCode: 404, message: "not found" });
          }
        } else if (decoded && decoded.role === "admin") {
          const data = await retrieveData("orders");
          if (data) {
            res.status(200).json({ status: true, statusCode: 200, data: data });
          } else {
            res
              .status(404)
              .json({ status: false, statusCode: 404, message: "not found" });
          }
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "unauthorized" });
        }
      }
    );
  } else if (req.method === "POST") {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          data.userId = decoded.id;
          await addData("orders", data, (status: boolean) => {
            if (status) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "unauthorized" });
        }
      }
    );
    res.status(200).json({ status: true, statusCode: 200, message: "success" });
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";

    if (id) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            await updateData("orders", id[0], data, (status: boolean) => {
              if (status) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "success",
                });
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "failed",
                });
              }
            });
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "unauthorized",
            });
          }
        }
      );
    } else {
      res
        .status(400)
        .json({ status: false, statusCode: 400, message: "failed" });
    }

    res.status(200).json({ status: true, statusCode: 200, message: "success" });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "method not allowed" });
  }
}
