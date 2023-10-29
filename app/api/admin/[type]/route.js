import { connectDB } from "@/config/database";
import ServerConfig from "@/models/serverConfig";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { type } }) => {
  try {
    await connectDB();

    const serverConfig = await ServerConfig.findOne({ type });
    if (!serverConfig)
      return NextResponse.json(
        { success: false, message: "Invalid Type" },
        { status: 404 }
      );
      
    return NextResponse.json(
      { success: true, message: "Server Config", data: serverConfig.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error"  },
      { status: 500 }
    );
  }
};
