import { ApiClient } from "@/lib/apiClient";

export interface PosConfig {
  id: string;
  gateway: Gateway;
  merchantId: string;
  privateKey: string;
  createdAt: string;
  teamId: string;
  terminalConfigs: TerminalConfig[];
}

enum Gateway {
  opay = "opay",
  moniepoint = "moniepoint",
  paystack = "paystack",
}

export interface TerminalConfig {
  id: string;
  name: string;
  serialNumber: string;
  createdAt: string;
  posconfigId: string;
}

export const posConfigService = new ApiClient<PosConfig>("/api/pos-configs");
