export type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
  phone: string;
  role: string;
  permissions: string[];
  emailVerified: Date | null;
  createdAt: Date;
};
