interface ApiResponse<T> {
  rep_code: RepCode;
  result: T;
  server_message: string;
  status: number;
}

interface RepCode {
  code: number;
  message: string;
}
