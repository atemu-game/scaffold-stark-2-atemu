/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */

const configExternalContracts = {
  sepolia: {
    CardCollection: {
      address:
        "0x05D2C06054e12b227068189b8c59fCa05664b906B20f5Af9877f6E8b4bB30323",
      classHash:
        "0x68f26bed9f5fe2eebc28ce574660695781f623632ac426032d1806f0919e355",
      abi: [
        {
          type: "impl",
          name: "CardsImpl",
          interface_name: "contracts::CardCollection::ICardCollection",
        },
        {
          type: "struct",
          name: "core::integer::u256",
          members: [
            { name: "low", type: "core::integer::u128" },
            { name: "high", type: "core::integer::u128" },
          ],
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            { name: "False", type: "()" },
            { name: "True", type: "()" },
          ],
        },
        {
          type: "struct",
          name: "core::array::Span::<core::integer::u256>",
          members: [
            {
              name: "snapshot",
              type: "@core::array::Array::<core::integer::u256>",
            },
          ],
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>",
            },
            { name: "pending_word", type: "core::felt252" },
            { name: "pending_word_len", type: "core::integer::u32" },
          ],
        },
        {
          type: "interface",
          name: "contracts::CardCollection::ICardCollection",
          items: [
            {
              type: "function",
              name: "claim_single_card",
              inputs: [
                {
                  name: "minter",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "tokenId", type: "core::integer::u256" },
                { name: "amount", type: "core::integer::u256" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "set_allowed_caller",
              inputs: [
                {
                  name: "contract",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "allowed", type: "core::bool" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "claim_batch_cards",
              inputs: [
                {
                  name: "minter",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_ids",
                  type: "core::array::Span::<core::integer::u256>",
                },
                {
                  name: "amounts",
                  type: "core::array::Span::<core::integer::u256>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "set_base_uri",
              inputs: [
                { name: "base_uri", type: "core::byte_array::ByteArray" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "token_uri",
              inputs: [{ name: "token_id", type: "core::integer::u256" }],
              outputs: [{ type: "core::byte_array::ByteArray" }],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "ERC1155Impl",
          interface_name: "openzeppelin_token::erc1155::interface::ERC1155ABI",
        },
        {
          type: "struct",
          name: "core::array::Span::<core::starknet::contract_address::ContractAddress>",
          members: [
            {
              name: "snapshot",
              type: "@core::array::Array::<core::starknet::contract_address::ContractAddress>",
            },
          ],
        },
        {
          type: "struct",
          name: "core::array::Span::<core::felt252>",
          members: [
            { name: "snapshot", type: "@core::array::Array::<core::felt252>" },
          ],
        },
        {
          type: "interface",
          name: "openzeppelin_token::erc1155::interface::ERC1155ABI",
          items: [
            {
              type: "function",
              name: "balance_of",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "token_id", type: "core::integer::u256" },
              ],
              outputs: [{ type: "core::integer::u256" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "balance_of_batch",
              inputs: [
                {
                  name: "accounts",
                  type: "core::array::Span::<core::starknet::contract_address::ContractAddress>",
                },
                {
                  name: "token_ids",
                  type: "core::array::Span::<core::integer::u256>",
                },
              ],
              outputs: [{ type: "core::array::Span::<core::integer::u256>" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "safe_transfer_from",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "token_id", type: "core::integer::u256" },
                { name: "value", type: "core::integer::u256" },
                { name: "data", type: "core::array::Span::<core::felt252>" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "safe_batch_transfer_from",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_ids",
                  type: "core::array::Span::<core::integer::u256>",
                },
                {
                  name: "values",
                  type: "core::array::Span::<core::integer::u256>",
                },
                { name: "data", type: "core::array::Span::<core::felt252>" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "is_approved_for_all",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [{ type: "core::bool" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "set_approval_for_all",
              inputs: [
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "approved", type: "core::bool" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "supports_interface",
              inputs: [{ name: "interface_id", type: "core::felt252" }],
              outputs: [{ type: "core::bool" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "uri",
              inputs: [{ name: "token_id", type: "core::integer::u256" }],
              outputs: [{ type: "core::byte_array::ByteArray" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "tokenId", type: "core::integer::u256" },
              ],
              outputs: [{ type: "core::integer::u256" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "balanceOfBatch",
              inputs: [
                {
                  name: "accounts",
                  type: "core::array::Span::<core::starknet::contract_address::ContractAddress>",
                },
                {
                  name: "tokenIds",
                  type: "core::array::Span::<core::integer::u256>",
                },
              ],
              outputs: [{ type: "core::array::Span::<core::integer::u256>" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "safeTransferFrom",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "tokenId", type: "core::integer::u256" },
                { name: "value", type: "core::integer::u256" },
                { name: "data", type: "core::array::Span::<core::felt252>" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "safeBatchTransferFrom",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "tokenIds",
                  type: "core::array::Span::<core::integer::u256>",
                },
                {
                  name: "values",
                  type: "core::array::Span::<core::integer::u256>",
                },
                { name: "data", type: "core::array::Span::<core::felt252>" },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "isApprovedForAll",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [{ type: "core::bool" }],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "setApprovalForAll",
              inputs: [
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                { name: "approved", type: "core::bool" },
              ],
              outputs: [],
              state_mutability: "external",
            },
          ],
        },
        {
          type: "impl",
          name: "OwnableImpl",
          interface_name: "openzeppelin_access::ownable::interface::IOwnable",
        },
        {
          type: "interface",
          name: "openzeppelin_access::ownable::interface::IOwnable",
          items: [
            {
              type: "function",
              name: "owner",
              inputs: [],
              outputs: [
                { type: "core::starknet::contract_address::ContractAddress" },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "transfer_ownership",
              inputs: [
                {
                  name: "new_owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "renounce_ownership",
              inputs: [],
              outputs: [],
              state_mutability: "external",
            },
          ],
        },
        {
          type: "impl",
          name: "PausableImpl",
          interface_name: "openzeppelin_security::interface::IPausable",
        },
        {
          type: "interface",
          name: "openzeppelin_security::interface::IPausable",
          items: [
            {
              type: "function",
              name: "is_paused",
              inputs: [],
              outputs: [{ type: "core::bool" }],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "card_factory",
              type: "core::starknet::contract_address::ContractAddress",
            },
            { name: "base_uri", type: "core::byte_array::ByteArray" },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle",
          kind: "struct",
          members: [
            {
              name: "operator",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            { name: "id", type: "core::integer::u256", kind: "data" },
            { name: "value", type: "core::integer::u256", kind: "data" },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch",
          kind: "struct",
          members: [
            {
              name: "operator",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "ids",
              type: "core::array::Span::<core::integer::u256>",
              kind: "data",
            },
            {
              name: "values",
              type: "core::array::Span::<core::integer::u256>",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "operator",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            { name: "approved", type: "core::bool", kind: "data" },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc1155::erc1155::ERC1155Component::URI",
          kind: "struct",
          members: [
            {
              name: "value",
              type: "core::byte_array::ByteArray",
              kind: "data",
            },
            { name: "id", type: "core::integer::u256", kind: "key" },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc1155::erc1155::ERC1155Component::Event",
          kind: "enum",
          variants: [
            {
              name: "TransferSingle",
              type: "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle",
              kind: "nested",
            },
            {
              name: "TransferBatch",
              type: "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch",
              kind: "nested",
            },
            {
              name: "ApprovalForAll",
              type: "openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll",
              kind: "nested",
            },
            {
              name: "URI",
              type: "openzeppelin_token::erc1155::erc1155::ERC1155Component::URI",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_introspection::src5::SRC5Component::Event",
          kind: "enum",
          variants: [],
        },
        {
          type: "event",
          name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          kind: "struct",
          members: [
            {
              name: "previous_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          kind: "struct",
          members: [
            {
              name: "previous_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          kind: "enum",
          variants: [
            {
              name: "OwnershipTransferred",
              type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
              kind: "nested",
            },
            {
              name: "OwnershipTransferStarted",
              type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
          kind: "enum",
          variants: [],
        },
        {
          type: "event",
          name: "openzeppelin_security::pausable::PausableComponent::Paused",
          kind: "struct",
          members: [
            {
              name: "account",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
          kind: "struct",
          members: [
            {
              name: "account",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_security::pausable::PausableComponent::Event",
          kind: "enum",
          variants: [
            {
              name: "Paused",
              type: "openzeppelin_security::pausable::PausableComponent::Paused",
              kind: "nested",
            },
            {
              name: "Unpaused",
              type: "openzeppelin_security::pausable::PausableComponent::Unpaused",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollection::CardCollection::Event",
          kind: "enum",
          variants: [
            {
              name: "erc1155Event",
              type: "openzeppelin_token::erc1155::erc1155::ERC1155Component::Event",
              kind: "flat",
            },
            {
              name: "SRC5Event",
              type: "openzeppelin_introspection::src5::SRC5Component::Event",
              kind: "flat",
            },
            {
              name: "ownableEvent",
              type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
              kind: "flat",
            },
            {
              name: "reentrancyEvent",
              type: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
              kind: "flat",
            },
            {
              name: "pausableEvent",
              type: "openzeppelin_security::pausable::PausableComponent::Event",
              kind: "flat",
            },
          ],
        },
      ],
    },
  },
} as const;

export default configExternalContracts;
