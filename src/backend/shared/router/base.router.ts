import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import type { IRequest } from "@/backend/shared/models/context.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/config";
import { ISession } from "@/backend/shared/models/auth.model";

export interface Params {
  params: {
    [key: string]: any;
  };
}

export const Context = async (
  request: NextRequest,
  { params }: Params
): Promise<IRequest> => {
  const ctx = {
    body: await getBody(request),
    params: params || [],
    query: Object.fromEntries(request.nextUrl.searchParams.entries()),
    headers: request.headers,
    cookies: request.cookies,
    path: request.url as string,
    session: (await getServerSession(authOptions)) as ISession,
  };

  return ctx;
};

/**
 * Get body from request
 * @param request
 * @returns {Promise<object>}
 */
const getBody = async (request: NextRequest) => {
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      return await request.formData();
    } else {
      return await request.json();
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const OPTIONS = async () => {
  return new NextResponse("", {
    status: 200,
  });
};
