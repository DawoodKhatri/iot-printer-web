import { connectDB } from "@/config/database";
import ServerConfig from "@/models/serverConfig";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const {
      type,
      accessKeyId,
      secretAccessKey,
      sessionToken,
      privateKey,
      caCert,
      clientCert,
      host,
      password,
    } = await req.json();

    if (!type || !password)
      return NextResponse.json(
        { success: false, message: "Please fill all the fields" },
        { status: 400 }
      );

    if (
      type === "aws-credentials" &&
      (!accessKeyId || !secretAccessKey || !sessionToken)
    )
      return NextResponse.json(
        { success: false, message: "Please fill all the fields" },
        { status: 400 }
      );
    if (type === "aws-iot" && (!privateKey || !caCert || !clientCert || !host))
      return NextResponse.json(
        { success: false, message: "Please fill all the fields" },
        { status: 400 }
      );

    if (password != process.env.ADMIN_PASSWORD)
      return NextResponse.json(
        { success: false, message: "Incorrect Password" },
        { status: 403 }
      );

    let data;

    if (type === "aws-credentials")
      data = { accessKeyId, secretAccessKey, sessionToken };

    if (type === "aws-iot")
      data = {
        privateKey: Buffer.from(privateKey).toString("base64"),
        caCert: Buffer.from(caCert).toString("base64"),
        clientCert: Buffer.from(clientCert).toString("base64"),
        host,
      };

    await connectDB();

    let serverConfig = await ServerConfig.findOne({ type });
    if (!serverConfig)
      await ServerConfig.create({
        type: type,
        data,
      });
    else await ServerConfig.updateOne({ type: type }, { $set: { data } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
