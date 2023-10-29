import { AWSCredentials, AWSIoTClient } from "@/config/aws";
import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const client = await AWSIoTClient("test_client_1");

    const s3 = new S3({ credentials: await AWSCredentials(), region: "us-east-1" });

    const form = await req.formData();
    const file = form.get("file");
    const fileExtension = file.name.split(".")[file.name.split(".").length - 1];
    console.log(file.name, file.size, file.type);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadParams = {
      Bucket: "iot-printer-files",
      Key: `file-${Date.now()}.${fileExtension}`,
      Body: fileBuffer,
    };

    const data = await s3.upload(uploadParams).promise();

    const payload = {
      action: "print",
      fileKey: data.Key,
    };

    client.publish("print", JSON.stringify(payload));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
