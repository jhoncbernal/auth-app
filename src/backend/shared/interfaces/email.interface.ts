export interface IEmail {
  sendEmail(params: IEmailParams): Promise<void>;
}

export interface IEmailParams {
  template: {
    name: string;
    version: string;
  };
  destination: string;
  title: string;
  source: string;
  data: {
    [key: string]: string;
  };
}
