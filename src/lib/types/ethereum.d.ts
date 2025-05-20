interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (param: any) => void) => void;
    removeListener: (event: string, callback: (param: any) => void) => void;
  };
} 