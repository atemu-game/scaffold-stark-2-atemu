/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */

const configExternalContracts = {
  sepolia: {
    RandomContract: {
      address:
        "0x02da9c98a2e5b60ea441c14371d062395cfb3864f1b6fead23ce8bc47b3d2ecd",
      classHash:
        "0x7ddaaa4b8dc38c67481ae52968381f17b895f685cd976e10ab22be1572f72dd",
      abi: [
        {
          interface_name: "random::interface::IRandom",
          name: "IRandomImpl",
          type: "impl",
        },
        {
          name: "core::bool",
          type: "enum",
          variants: [
            { name: "False", type: "()" },
            { name: "True", type: "()" },
          ],
        },
        {
          members: [
            { name: "low", type: "core::integer::u128" },
            { name: "high", type: "core::integer::u128" },
          ],
          name: "core::integer::u256",
          type: "struct",
        },
        {
          items: [
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "felt252",
              outputs: [{ type: "core::felt252" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "bool",
              outputs: [{ type: "core::bool" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u8",
              outputs: [{ type: "core::integer::u8" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u16",
              outputs: [{ type: "core::integer::u16" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u32",
              outputs: [{ type: "core::integer::u32" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u64",
              outputs: [{ type: "core::integer::u64" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u128",
              outputs: [{ type: "core::integer::u128" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "seed", type: "core::felt252" }],
              name: "u256",
              outputs: [{ type: "core::integer::u256" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u8" },
              ],
              name: "u8_capped",
              outputs: [{ type: "core::integer::u8" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u16" },
              ],
              name: "u16_capped",
              outputs: [{ type: "core::integer::u16" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u32" },
              ],
              name: "u32_capped",
              outputs: [{ type: "core::integer::u32" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u64" },
              ],
              name: "u64_capped",
              outputs: [{ type: "core::integer::u64" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u128" },
              ],
              name: "u128_capped",
              outputs: [{ type: "core::integer::u128" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [
                { name: "seed", type: "core::felt252" },
                { name: "cap", type: "core::integer::u256" },
              ],
              name: "u256_capped",
              outputs: [{ type: "core::integer::u256" }],
              state_mutability: "external",
              type: "function",
            },
            {
              inputs: [{ name: "salt", type: "core::felt252" }],
              name: "salt",
              outputs: [],
              state_mutability: "external",
              type: "function",
            },
          ],
          name: "random::interface::IRandom",
          type: "interface",
        },
        {
          kind: "enum",
          name: "random::contract::arcade_blobert_actions::Event",
          type: "event",
          variants: [],
        },
      ],
    },
  },
} as const;

export default configExternalContracts;
