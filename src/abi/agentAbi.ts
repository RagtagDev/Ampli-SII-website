export const agentAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_hubChainId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_broker",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "conclude",
    inputs: [
      {
        name: "messageNonce",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initiate",
    inputs: [
      {
        name: "executor",
        type: "address",
        internalType: "address",
      },
      {
        name: "executionData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "debitBundle",
        type: "tuple[]",
        internalType: "struct CurrencyData[]",
        components: [
          {
            name: "currency",
            type: "address",
            internalType: "Currency",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "cacheNonce",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "nonce",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rollback",
    inputs: [
      {
        name: "messageNonce",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ETHTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "NotBroker",
    inputs: [],
  },
  {
    type: "error",
    name: "NotHubChain",
    inputs: [],
  },
  {
    type: "error",
    name: "NotMessenger",
    inputs: [],
  },
] as const;
