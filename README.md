# 🚀 When Lambo SDK

Welcome to the When Lambo SDK! This SDK provides a simple interface for interacting with the Persona Analysis API. It allows you to easily check if a given wallet address matches a given persona, or to filter a list of wallet addresses based on which addresses match a given persona.

## 📑 Table of Contents

1. [Installation](#installation)
2. [Authorization](#authorization)
3. [SDK Methods](#sdk-methods)
4. [Examples of Usage](#examples-of-usage)
5. [Common Errors](#common-errors)

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

Before you can use the When Lambo SDK, you must obtain an API key from the **link to key generation**. This key should be passed to the PersonaAnalysis class when you create a new instance of the SDK:

```
import PersonaAnalysis from 'when-lambo';

const personaAnalysis = new PersonaAnalysis({
 apiKey: 'your-api-key-here',
});
```

## 📊 SDK Methods

Here are the methods available in the When Lambo SDK:
| Method | Arguments | Response | Description |
| ------------- |:-------------:| ------| ----- |
| `isPersonaMatched` | `walletAddress: string`, `personaId: string` | `PersonaAnalysisStatus` or `ResponseError` | Returns a value indicating if the provided wallet address matches the rules for the given persona. In case of an error, a `ResponseError` object is returned instead. |
| `filterMatchedPersonas` | `walletAddresses: string[]` | `WalletsForPersona` or `ResponseError` | Returns an object containing the wallets that match the rules in all personas attached to the account. In case of an error, a `ResponseError` object is returned instead. |

## 💻 Examples of Usage

Here is an example of how these methods can be used:

```
const walletAddress = '0x1234567890abcdef';
const personaId = 'my-persona-id';

// Check if a wallet address meets the rules for a given persona
personaAnalysis.isPersonaMatched(walletAddress, personaId)
  .then((status) => {
    console.log('Persona analysis status:', status);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });

const walletAddresses = ['0xabcdef1234567890', '0xfedcba0987654321'];

// Filter wallets that match the rules in all personas attached to an account
personaAnalysis.filterMatchedPersonas(walletAddresses)
  .then((wallets) => {
    console.log('Wallets matching personas:', wallets);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
```

## ❌ Common Errors

Here are some common errors that you might encounter when using this SDK and how to resolve them:

### Unauthorized

This error occurs when the provided API key is not valid or has expired. To resolve this error, make sure that you are using a valid API key with the correct permissions. If you are sure that the API key is correct, contact the WHEN LAMBO team to verify that your API key is still valid.

### Too Many Requests

This error occurs when you have exceeded the rate limit for the API. To resolve this error, try reducing the frequency of your requests or contact the WHEN LAMBO team to request a higher rate limit.

### Incorrect Wallet Address

This error occurs when you provide an invalid wallet address. To resolve this error, make sure that any wallet address you provide is a valid Ethereum address that starts with 0x and is followed by 40 hexadecimal characters. You can use the isWalletAddressValid helper function to verify that a wallet address is valid. If you are sure that the wallet address is correct, contact the WHEN LAMBO team for assistance.
