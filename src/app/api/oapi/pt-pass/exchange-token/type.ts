export interface ExchangeTokenRequest {
  code: string;
}

export interface ExchangeTokenResponse {
  accessToken: string;
  refreshToken: string;
}
