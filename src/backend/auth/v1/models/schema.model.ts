import { z } from "zod";

// getUserByCredentials
export const Credential = z
  .object({
    email: z.string().transform((val) => val.toLocaleLowerCase().trim()),
    password: z.string(),
  })
  .strict();

export type ICredential = z.infer<typeof Credential>;

// sendVerificationRequest
export const Verification = z
  .object({
    email: z.string().transform((val) => val.toLocaleLowerCase().trim()),
    url: z.string().min(1).optional().default("/dashboard"),
    type: z.enum(["verifyEmail", "recoverPassword"]).default("verifyEmail"),
    source: z.enum(["register", "resend"]),
  })
  .strict();

export type IVerification = z.infer<typeof Verification>;

// validateUrlToken
export const ValidateToken = z.object({
  token: z.string().min(1),
  redirect: z.string().optional(),
});

export type IValidateToken = z.infer<typeof ValidateToken>;

// createUserByForm
export const UserForm = z
  .object({
    email: z.string().transform((val) => val.toLocaleLowerCase().trim()),
    name: z.string().min(2),
    phone: z.string().min(1),
    password: z.string().min(1),
    image: z.string().min(1).optional(),
    type: z.enum(["form", "social"]),
  })
  .strict();

export type IUserForm = z.infer<typeof UserForm>;

// generateToken
export const GenerateToken = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

export type IGenerateToken = z.infer<typeof GenerateToken>;

// updateUserData
export const UpdateUserData = z.object({
  userId: z.string().min(1),
  email: z
    .string()
    .transform((val) => val.toLocaleLowerCase().trim())
    .optional(),
  name: z.string().min(2).optional(),
  phone: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
});

export type IUpdateUserData = z.infer<typeof UpdateUserData>;
