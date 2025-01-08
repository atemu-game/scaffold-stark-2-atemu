/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */

const deployedContracts = {
  sepolia: {
    PackAtemu: {
      address:
        "0x70c26d3c0e10a6e6a4b9fb3a240ddb855a360577d490d2cb558562c1c373720",
      abi: [
        {
          type: "struct",
          name: "core::integer::u256",
          members: [
            {
              name: "low",
              type: "core::integer::u128",
            },
            {
              name: "high",
              type: "core::integer::u128",
            },
          ],
        },
        {
          type: "function",
          name: "burn",
          inputs: [
            {
              name: "token_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "safe_mint",
          inputs: [
            {
              name: "recipient",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "token_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "safeMint",
          inputs: [
            {
              name: "recipient",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "tokenId",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "impl",
          name: "ERC721MixinImpl",
          interface_name: "openzeppelin_token::erc721::interface::ERC721ABI",
        },
        {
          type: "struct",
          name: "core::array::Span::<core::felt252>",
          members: [
            {
              name: "snapshot",
              type: "@core::array::Array::<core::felt252>",
            },
          ],
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            {
              name: "False",
              type: "()",
            },
            {
              name: "True",
              type: "()",
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
            {
              name: "pending_word",
              type: "core::felt252",
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32",
            },
          ],
        },
        {
          type: "interface",
          name: "openzeppelin_token::erc721::interface::ERC721ABI",
          items: [
            {
              type: "function",
              name: "balance_of",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "owner_of",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
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
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
                {
                  name: "data",
                  type: "core::array::Span::<core::felt252>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "transfer_from",
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
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "approve",
              inputs: [
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "set_approval_for_all",
              inputs: [
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "approved",
                  type: "core::bool",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "get_approved",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              state_mutability: "view",
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
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "supports_interface",
              inputs: [
                {
                  name: "interface_id",
                  type: "core::felt252",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "symbol",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "token_uri",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
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
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "ownerOf",
              inputs: [
                {
                  name: "tokenId",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
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
                {
                  name: "tokenId",
                  type: "core::integer::u256",
                },
                {
                  name: "data",
                  type: "core::array::Span::<core::felt252>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "transferFrom",
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
                  name: "tokenId",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "setApprovalForAll",
              inputs: [
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "approved",
                  type: "core::bool",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "getApproved",
              inputs: [
                {
                  name: "tokenId",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              state_mutability: "view",
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
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "tokenURI",
              inputs: [
                {
                  name: "tokenId",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "OwnableMixinImpl",
          interface_name: "openzeppelin_access::ownable::interface::OwnableABI",
        },
        {
          type: "interface",
          name: "openzeppelin_access::ownable::interface::OwnableABI",
          items: [
            {
              type: "function",
              name: "owner",
              inputs: [],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
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
            {
              type: "function",
              name: "transferOwnership",
              inputs: [
                {
                  name: "newOwner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "renounceOwnership",
              inputs: [],
              outputs: [],
              state_mutability: "external",
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
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
          kind: "struct",
          members: [
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
              name: "token_id",
              type: "core::integer::u256",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "approved",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "token_id",
              type: "core::integer::u256",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
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
            {
              name: "approved",
              type: "core::bool",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_token::erc721::erc721::ERC721Component::Event",
          kind: "enum",
          variants: [
            {
              name: "Transfer",
              type: "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
              kind: "nested",
            },
            {
              name: "Approval",
              type: "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
              kind: "nested",
            },
            {
              name: "ApprovalForAll",
              type: "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
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
          name: "contracts::PackAtemu::PackAtemu::Event",
          kind: "enum",
          variants: [
            {
              name: "ERC721Event",
              type: "openzeppelin_token::erc721::erc721::ERC721Component::Event",
              kind: "flat",
            },
            {
              name: "SRC5Event",
              type: "openzeppelin_introspection::src5::SRC5Component::Event",
              kind: "flat",
            },
            {
              name: "OwnableEvent",
              type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
              kind: "flat",
            },
          ],
        },
      ],
      classHash:
        "0x1259013d6655f787d5e4d2cef5bdaeb71b2581767ab014744dbe6e0bcc76d13",
    },
    CardCollectionFactory: {
      address:
        "0x1feb9d472dae3ea0611a9880c128351542a44039ff7bc0542490be26702f791",
      abi: [
        {
          type: "impl",
          name: "CardCollectionFactoryImpl",
          interface_name:
            "contracts::CardCollectionFactory::ICardCollectionFactory",
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>",
            },
            {
              name: "pending_word",
              type: "core::felt252",
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32",
            },
          ],
        },
        {
          type: "struct",
          name: "core::integer::u256",
          members: [
            {
              name: "low",
              type: "core::integer::u128",
            },
            {
              name: "high",
              type: "core::integer::u128",
            },
          ],
        },
        {
          type: "struct",
          name: "contracts::CardCollectionFactory::CardsDistribution",
          members: [
            {
              name: "token_id",
              type: "core::integer::u256",
            },
            {
              name: "rarityRate",
              type: "core::integer::u256",
            },
          ],
        },
        {
          type: "struct",
          name: "contracts::CardCollectionFactory::CollectionPackInfo",
          members: [
            {
              name: "collection_address",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "pack_address",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              name: "amount_cards_in_pack",
              type: "core::integer::u32",
            },
          ],
        },
        {
          type: "interface",
          name: "contracts::CardCollectionFactory::ICardCollectionFactory",
          items: [
            {
              type: "function",
              name: "create_collection",
              inputs: [
                {
                  name: "base_uri",
                  type: "core::byte_array::ByteArray",
                },
                {
                  name: "pack_address",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount_cards_in_pack",
                  type: "core::integer::u32",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "update_collection",
              inputs: [
                {
                  name: "collection",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "pack_address",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount_cards_in_pack",
                  type: "core::integer::u32",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "set_collection_class_hash",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "add_cards_distribution",
              inputs: [
                {
                  name: "collection",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "cards",
                  type: "core::array::Array::<contracts::CardCollectionFactory::CardsDistribution>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "update_cards_distribution",
              inputs: [
                {
                  name: "collection",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "cards",
                  type: "core::array::Array::<contracts::CardCollectionFactory::CardsDistribution>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "open_pack",
              inputs: [
                {
                  name: "pack_address",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "get_collection",
              inputs: [
                {
                  name: "collection",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "contracts::CardCollectionFactory::CollectionPackInfo",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "get_pack",
              inputs: [
                {
                  name: "pack",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "contracts::CardCollectionFactory::CollectionPackInfo",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "get_collection_class_hash",
              inputs: [],
              outputs: [
                {
                  type: "core::starknet::class_hash::ClassHash",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "get_all_collection_addresses",
              inputs: [],
              outputs: [
                {
                  type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "get_all_pack_addresses",
              inputs: [],
              outputs: [
                {
                  type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "get_cards_distribution",
              inputs: [
                {
                  name: "collection",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::array::Array::<contracts::CardCollectionFactory::CardsDistribution>",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "openzeppelin_upgrades::interface::IUpgradeable",
        },
        {
          type: "interface",
          name: "openzeppelin_upgrades::interface::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
          ],
        },
        {
          type: "impl",
          name: "OwnableMixinImpl",
          interface_name: "openzeppelin_access::ownable::interface::OwnableABI",
        },
        {
          type: "interface",
          name: "openzeppelin_access::ownable::interface::OwnableABI",
          items: [
            {
              type: "function",
              name: "owner",
              inputs: [],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
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
            {
              type: "function",
              name: "transferOwnership",
              inputs: [
                {
                  name: "newOwner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "renounceOwnership",
              inputs: [],
              outputs: [],
              state_mutability: "external",
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
              name: "collection_class_hash",
              type: "core::starknet::class_hash::ClassHash",
            },
            {
              name: "random_oracleless_address",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollectionFactory::CardCollectionFactory::CollectionCreated",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "collection_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "pack_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "amount_cards_in_pack",
              type: "core::integer::u32",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollectionFactory::CardCollectionFactory::CollectionUpdated",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "collection_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "pack_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "amount_cards_in_pack",
              type: "core::integer::u32",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollectionFactory::CardCollectionFactory::PackOpened",
          kind: "struct",
          members: [
            {
              name: "caller",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "collection_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "pack_address",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "token_id",
              type: "core::integer::u256",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollectionFactory::CardCollectionFactory::CardsDistributionSet",
          kind: "struct",
          members: [
            {
              name: "collection",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "data",
            },
            {
              name: "total_cards",
              type: "core::integer::u32",
              kind: "data",
            },
          ],
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
          name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::CardCollectionFactory::CardCollectionFactory::Event",
          kind: "enum",
          variants: [
            {
              name: "CollectionCreated",
              type: "contracts::CardCollectionFactory::CardCollectionFactory::CollectionCreated",
              kind: "nested",
            },
            {
              name: "CollectionUpdated",
              type: "contracts::CardCollectionFactory::CardCollectionFactory::CollectionUpdated",
              kind: "nested",
            },
            {
              name: "PackOpened",
              type: "contracts::CardCollectionFactory::CardCollectionFactory::PackOpened",
              kind: "nested",
            },
            {
              name: "CardsDistributionSet",
              type: "contracts::CardCollectionFactory::CardCollectionFactory::CardsDistributionSet",
              kind: "nested",
            },
            {
              name: "OwnableEvent",
              type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
              kind: "flat",
            },
            {
              name: "ReentrancyGuardEvent",
              type: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
              kind: "flat",
            },
            {
              name: "UpgradeableEvent",
              type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
              kind: "flat",
            },
          ],
        },
      ],
      classHash:
        "0x1b2979235f7223268a96841bd83e6fbc9401941fbdc06d42c8e0a437c5bb2d7",
    },
  },
} as const;

export default deployedContracts;
