export interface TypedRequestBody<ReqBody> extends Express.Request {
  body: ReqBody;
}

export interface TypedRequestParams<Params> extends Express.Request {
  query: Params;
}

export interface TokenData {
  id: string;
  name: string;
  email: string;
}
