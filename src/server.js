import express from "express";
import pino from "pino-http";
import cors from "cors";
import { getEnvVar } from "./utils/getEnvVar.js";
import * as contactServices from "./services/contacts.js";

const PORT = Number(getEnvVar("PORT", 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/contacts", async (req, res) => {
    const data = await contactServices.getContacts();
    res.json({ status: 200, message: "Successfully found contacts!", data });
  });

  app.get("/contacts/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);
    if (!data) {
      res.status(404).json({
        status: 404,
        message: "Contact not found",
      });
      return;
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
