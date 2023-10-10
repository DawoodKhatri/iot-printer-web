import AWSIoTData from "aws-iot-device-sdk";
import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const client = AWSIoTData.device({
      keyPath: "./keys/private.key",
      caPath: "./keys/rootCa.pem",
      certPath: "./keys/certificate.crt",
      clientId: "test_client_1",
      host: "a2uaokcdvkjoer-ats.iot.us-east-1.amazonaws.com",
    });

    const AWSCredentials = {
      accessKeyId: "ASIAULIGBHUUVYGLYQHY",
      secretAccessKey: "E0Ev6IYeg0edSFy31haJ61jmejq5XDUSmADtl8Lu",
      sessionToken:
        "FwoGZXIvYXdzEOL//////////wEaDLkfhuRu3k5aHVUOoSK3AYWLvXQ3xct24KzjNVeoVR3/Noyp1aFEA6nMtCQDRuGZvnbBIQEKW6UnxHNN3Nmg426SGLxcPIDCUjqOWB91/8Z8onhYeyat6t87keTqKzInUHrob3Kl0x6DZ6Y4mWB33KYxxuCyvqwYv0Rhjic7cEzQvv2c3yur9OIR3AxwYzPsLWu71NXwIAtiq4xBbEpynHzt1uSLhWAF04I3W1labw3pLmlS1chmdtks7o4fw8/RwkytOrZSGSjbhJapBjItiVmK3Zvu7TrZAEEaaTurOV7iBy/C9RJYLhvE6aTbsi1b/kBQRMUgdUq7VaTZ",
    };

    const s3 = new S3({ credentials: AWSCredentials, region: "us-east-1" });

    const form = await req.formData();
    const file = form.get("file");
    const fileExtension = file.name.split(".")[file.name.split(".").length - 1];
    console.log(file.name, file.size, file.type);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    console.log(fileBuffer);

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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
