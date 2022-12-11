export const isWalletAddressValid = (walletAddress: string) => {
  const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);

  return regex.test(walletAddress);
};

export const areWalletAddressesValid = (walletAddresses: string[]) =>
  !walletAddresses.find((walletAddress) => !isWalletAddressValid(walletAddress));