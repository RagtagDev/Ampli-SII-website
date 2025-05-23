export const hubExecutorAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_ampli",
        type: "address",
        internalType: "contract IAmpli",
      },
      {
        name: "_v4RouterHelper",
        type: "address",
        internalType: "contract V4RouterHelper",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ampli",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAmpli",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeActions",
    inputs: [
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "v4RouterHelper",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract V4RouterHelper",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "DeltaNotNegative",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "Currency",
      },
    ],
  },
] as const;
