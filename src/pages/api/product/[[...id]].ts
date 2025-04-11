/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  retrieveDataByLimit,
  updateData,
} from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id, limit } = req.query;

    if (id) {
      const data = await retrieveDataById("products", id[0] as string);
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "success",
        data: data,
      });
    } else if (limit) {
      const data = await retrieveDataByLimit(
        "products",
        parseInt(limit as string)
      );

      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "success",
        data: data,
      });
    } else {
      const data = await retrieveData("products");
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "success",
        data: data,
      });
    }
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || " ",
        async (error: any, decoded: any) => {
          if (decoded && decoded.role === "admin") {
            const { data } = req.body;
            data.created_at = new Date();
            data.updated_at = new Date();
            data.price = parseInt(data.price);
            data.stock.filter((stock: any) => {
              stock.qty = parseInt(stock.qty);
            });

            await addData("products", data, (status: boolean, result: any) => {
              if (status) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "success",
                  data: { id: result.id },
                });
              } else {
                res.status(400).json({
                  status: true,
                  statusCode: 400,
                  message: "failed",
                });
              }
            });
          } else {
            res.status(403).json({
              status: true,
              statusCode: 403,
              message: "unauthorized",
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    if (id) {
      if (token) {
        jwt.verify(
          token,
          process.env.NEXTAUTH_SECRET || " ",
          async (error: any, decoded: any) => {
            if (decoded) {
              await updateData("products", id[0], data, (status: boolean) => {
                if (status) {
                  res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: "success",
                  });
                } else {
                  res.status(400).json({
                    status: true,
                    statusCode: 400,
                    message: "failed",
                  });
                }
              });
            } else {
              res.status(403).json({
                status: true,
                statusCode: 403,
                message: "unauthorized",
              });
            }
          }
        );
      }
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (id) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded && decoded.role === "admin") {
            await deleteData("products", id[0], async (status: boolean) => {
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
            res.status(401).json({
              status: false,
              statusCode: 401,
              message: "unauthorized",
            });
          }
        }
      );
    } else {
      res.status(400).json({
        status: false,
        statusCode: 400,
        message: "failed",
      });
    }
  } else {
    res
      .status(405)
      .json({ status: true, statusCode: 405, message: "method not allowed" });
  }
}
