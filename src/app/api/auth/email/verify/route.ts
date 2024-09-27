import { NextResponse, NextRequest } from "next/server";
import {
  Context,
  OPTIONS,
  type Params,
} from "@/backend/shared/router/base.router";
import { controller } from "@/backend/auth/v1";

// Via Dialog
export const POST = async (request: NextRequest, params: Params) => {
  params.params = { ...params.params, source: "resend" };

  const data = await controller.sendVerificationRequest(
    await Context(request, params),
  );

  return NextResponse.json(data);
};

// Via URL
export const GET = async (request: NextRequest, params: Params) => {
  const data = await controller.validateUrlToken(
    await Context(request, params),
  );

  return data?.data && !data?.error
    ? NextResponse.redirect(data?.data)
    : NextResponse.json(data);
};

export { OPTIONS };
