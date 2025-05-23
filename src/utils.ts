import {
  encodeAbiParameters,
  encodeFunctionData,
  type Hex,
  type Address,
  type AbiParameter,
  type AbiItem,
} from "viem";
import { hubExecutorAbi } from "./abi/hubExecutorAbi";

enum SolidityActions {
  SUPPLY_FUNGIBLE_COLLATERAL = 0,
}

export interface PoolKey {
  currency0: Address;
  currency1: Address;
  fee: number; // uint24
  tickSpacing: number; // int24
  hooks: Address;
}

export interface CurrencyData {
  currency: Address;
  amount: bigint;
}

const poolKeyAbiType: AbiParameter = {
  type: "tuple",
  name: "poolKey",
  components: [
    { name: "currency0", type: "address" },
    { name: "currency1", type: "address" },
    { name: "fee", type: "uint24" },
    { name: "tickSpacing", type: "int24" },
    { name: "hooks", type: "address" },
  ],
};

/**
 * Generates the calldata for supplying collateral.
 * Mimics the Solidity internal function _supplyCollateralCalldata.
 *
 * @param poolKey - The PoolKey struct identifying the pool.
 * @param positionId - The ID of the position.
 * @param amount - The amount of collateral to supply.
 * @returns The encoded calldata as a hex string.
 */
export function supplyCollateralCalldata(
  poolKey: PoolKey,
  positionId: bigint,
  amount: bigint,
): Hex {
  const actions: SolidityActions[] = [
    SolidityActions.SUPPLY_FUNGIBLE_COLLATERAL,
  ];
  const params: Hex[] = [];

  // Encode the parameters for SUPPLY_FUNGIBLE_COLLATERAL action
  // Solidity: abi.encode(poolKey, positionId, 0, amount)
  // The `0` is likely a placeholder for an auxiliary data field (e.g. `auxData` or `data`)
  // specific to the action, often a uint for simple actions or bytes for complex ones.
  // Here, it's encoded as a uint256.
  const innerParamsData = encodeAbiParameters(
    [
      poolKeyAbiType, // The PoolKey struct
      { type: "uint256" }, // positionId
      { type: "uint256" }, // The literal `0` from the Solidity code
      { type: "uint256" }, // amount
    ],
    [
      poolKey, // The PoolKey object
      positionId,
      0n, // Represent uint256 0 as bigint
      amount,
    ],
  );
  params[0] = innerParamsData;

  const executionData = encodeAbiParameters(
    [
      { name: "actions", type: "uint8[]" }, // Assuming Actions enum translates to uint8
      { name: "params", type: "bytes[]" },
    ],
    [actions, params],
  );
  // Encode the call to HubExecutor.executeActions
  // Solidity: abi.encodeCall(HubExecutor.executeActions, abi.encode(actions, params))
  // Viem's encodeFunctionData takes args directly, no need for a nested abi.encode
  const calldata = encodeFunctionData({
    abi: hubExecutorAbi,
    functionName: "executeActions",
    args: [executionData], // actions will be an array of numbers, params an array of hex strings
  });

  return calldata;
}
