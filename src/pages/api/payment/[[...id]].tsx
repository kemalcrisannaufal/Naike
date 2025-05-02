/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  addData,
  retreiveDataByField,
  retrieveData,
} from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";

    if (id) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const data = await retreiveDataByField(
              "payments",
              "orderId",
              id[0] as string
            );
            if (data) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: data,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Data not found",
              });
            }
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
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded && decoded.role === "admin") {
            const data = await retrieveData("payments");
            if (data) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: data,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Data not found",
              });
            }
          }
        }
      );
    }
  } else if (req.method === "POST") {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          data.userId = decoded.id;
          await addData("payments", data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res.status(500).json({
                status: false,
                statusCode: 500,
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
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
