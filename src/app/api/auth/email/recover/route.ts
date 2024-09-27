import { NextResponse, NextRequest } from "next/server";
import {
  Context,
  OPTIONS,
  type Params,
} from "@/backend/shared/router/base.router";
import { controller } from "@/backend/auth/v1";

export const POST = async (request: NextRequest, params: Params) => {
   const data = await controller.sendVerificationRequest(
     await Context(request, params)
   );
   return NextResponse.json(data);
};

export { OPTIONS };
