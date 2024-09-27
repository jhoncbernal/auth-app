import { NextResponse, NextRequest } from "next/server";
import { Context, type Params } from "@/backend/shared/router/base.router";
import { controller } from "@/backend/auth/v1";

export const POST = async (request: NextRequest, params: Params) => {
  const data = await controller.generateToken(await Context(request, params));
  return NextResponse.json(data);
};
