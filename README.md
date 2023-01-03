# 🚀 When Lambo SDK

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/piotrsitarz/when-lambo/release.yml?branch=main)](https://github.com/piotrsitarz/when-lambo)
[![npm monthly downloads](https://img.shields.io/npm/dm/when-lambo.svg)](https://www.npmjs.com/package/when-lambo)
[![NPM](https://img.shields.io/npm/l/when-lambo)](https://www.npmjs.com/package/when-lambo)
[![current version](https://img.shields.io/npm/v/when-lambo.svg)](https://www.npmjs.com/package/when-lambo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Welcome to the When Lambo SDK! This TypeScript SDK provides a simple interface for interacting with the Segment Analysis API. It allows you to easily check if a given wallet address matches a given segment, or to filter a list of wallet addresses based on which addresses match a given segment.

## 📑 Table of Contents

1. [Installation](#-installation)
2. [Authorization](#-authorization)
3. [SDK Methods](#-sdk-methods)
4. [Examples of Usage](#-examples-of-usage)
5. [Common Errors](#-common-errors)
6. [Helper Utils](#-helper-utils)

## 💾 Installation

To install the When Lambo SDK, you can use npm:

```
npm i when-lambo
```

or yarn:

```
yarn add when-lambo
```

## 🔑 Authorization

Before you can use the When Lambo SDK, you must obtain an API key from the **link to key generation**. This key should be passed to the SegmentAnalysis class when you create a new instance of the SDK:

```
import { SegmentAnalysis } from 'when-lambo';

const segmentAnalysis = new SegmentAnalysis({
 apiKey: 'your-api-key-here',
});
```

## 📊 SDK Methods

Here are the methods available in the When Lambo SDK:
| Method | Arguments | Response | Description |
| ------------- |:-------------:| ------| ----- |
| **isSegmentMatched** | `walletAddress: string`, `segmentId: string` | `SegmentAnalysisStatus` or `ResponseError` | Returns a value indicating if the provided wallet address matches the rules for the given segment. In case of an error, a `ResponseError` object is returned instead. |
| **filterMatchedSegments** | `walletAddresses: string[]` | `WalletsForSegment` or `ResponseError` | Returns an object containing the wallets that match the rules in all segments attached to the account. In case of an error, a `ResponseError` object is returned instead. |

Where `SegmentAnalysisStatus` is represented by string from the **value** column:
| Value | Code | Description |
| ------------- |------| ----- |
| `IsMatch` | 1 | wallet matches segment criteria |
| `IsNotMatch` | 2 | wallet does not match segment criteria |
| `InProcessing` | 3 | analysis is under processing |
| `ProcessingFailed` | 4 | there is a problem that should be solved by the developer, [please contact with us](https://www.youtube.com/watch?v=oavMtUWDBTM&t=25s) |
| `Unavailable` | 5 | wallet address provided does not exist or is too large to process |

and `WalletsForSegment` is represented by:

```
interface WalletsForSegment {
  userId: string;
  walletsForSegment: SegmentWallet[];
}

interface SegmentWallet {
  segmentId: string;
  walletsMatchingSegment: Wallet[];
  walletsNotMatchingSegment: Wallet[];
  walletsInProcessing: Wallet[];
}

interface Wallet {
  walletAddress: string;
  status: WalletStatus;
}

type WalletStatus = 1 | 2 | 3 | 4 | 5; // consistent with the table above
```

## 💻 Examples of Usage

Here is an example of how these methods can be used:

**init**

```
import { SegmentAnalysis, isResponseError } from 'when-lambo';

  const segmentAnalysis = new SegmentAnalysis({
    apiKey: "your-api-key-here",
  });
```

**isSegmentMatched** - check if a wallet address meets the rules for a given segment

```
const walletAddress = '0x1234567890abcdef';
const segmentId = 'my-segment-id';

  segmentAnalysis.isSegmentMatched(walletAddress, segmentId).then((result) => {
    if (isResponseError(result)) {
      // handle error
      console.error(`Error: ${result.title} (${result.status})`);
    } else {
      // handle result
    }
  });
```

**filterMatchedSegments** - filter wallets that match the rules in all segments attached to an account

```
const walletAddresses = ['0xabcdef1234567890', '0xfedcba0987654321'];

  segmentAnalysis.filterMatchedSegments(walletAddresses).then((result) => {
    if (isResponseError(result)) {
      // handle error
      console.error(`Error: ${result.title} (${result.status})`);
    } else {
      // handle result
    }
  });
```

## ❌ Common Errors

Here are some common errors that you might encounter when using this SDK and how to resolve them:

### Unauthorized 🚫

This error occurs when the provided API key is not valid or has expired. To resolve this error, make sure that you are using a valid API key with the correct permissions. If you are sure that the API key is correct, contact the WHEN LAMBO team to verify that your API key is still valid.

### Too Many Requests ⚠️

This error occurs when you have exceeded the rate limit for the API. To resolve this error, try reducing the frequency of your requests or contact the WHEN LAMBO team to request a higher rate limit.

### Incorrect Wallet Address 💰

This error occurs when you provide an invalid wallet address. To resolve this error, make sure that any wallet address you provide is a valid Ethereum address that starts with 0x and is followed by 40 hexadecimal characters. You can use the isWalletAddressValid helper function to verify that a wallet address is valid. If you are sure that the wallet address is correct, contact the WHEN LAMBO team for assistance.

Errors that appear are of the type:

```
interface ResponseError {
  type: string;
  title: ResponseErrorTitle;
  status: ResponseErrorStatus;
  description?: string;
}
```

represented by values:
| Type | Title | Status | Description |
| ------------- |------| ----- | ----- |
| https://httpstatuses.com/401 | Unauthorized | 401 | API key is not valid or has expired |
| https://httpstatuses.com/422 | Unprocessable Entity | 422 | incorrect walletAddress/segmentId, please ensure that any walletAddress/segmentId you provide is correct |
| https://httpstatuses.com/429 | Too Many Requests | 429 | API calls quota exceeded |
| https://httpstatuses.com/500 | Internal Server Error | 500 | an internal server error occurred |

## 🧰 Helper Utils

List of helper functions that can be useful when using SDK and are available for importing:

| Method                      | Arguments                                                                         | Return value | Description                                                    |
| --------------------------- | --------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------- |
| **isResponseError**         | `response`: `ResponseErrorType` \| `SegmentAnalysisStatus` \| `WalletsForSegment` | `boolean`    | This function checks if the response type is an error.         |
| **isWalletAddressValid**    | `walletAddress`: `string`                                                         | `boolean`    | This function checks if the wallet address is valid.           |
| **areWalletAddressesValid** | `walletAddress`: `string[]`                                                       | `boolean`    | This function checks if there is any wallet that is not valid. |
