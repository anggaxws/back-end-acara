import swaggerAutogen from "swagger-autogen";

const doc = {
   info: {
      version: "v0.0.1",
      title: "Dokumentasi API ACARA",
      description: "Dokumentasi API ACARA",
   },

   servers: [
      {
         url: "http://localhost:3000/api",
         description: "Local Server",
      },

      {
         url: "https://back-end-acara-nine-murex.vercel.app/api",
         description: "Deploy Server",
      },
   ],

   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
         },
      },

      schemas: {
         LoginRequest: {
            identifier: "anggaxws",
            password: "1234",
         },
      },
   },
};

const OutputFile = "./swagger_output.json";

const endpointsFiles = ["../routes/api.ts", "../controllers/auth.controller.ts"];

swaggerAutogen({ openapi: "3.0.0" })(OutputFile, endpointsFiles, doc);
