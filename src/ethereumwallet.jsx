import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";

export function EthWallet({ emonicmn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  function Generate() {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const HDNode = HDNodeWallet.fromSeed(seed);
      const path = `m/44'/60'/${currentIndex}'/0/0`;
      const child = HDNode.derivePath(path);

      setCurrentIndex((prev) => prev + 1);
      setAddresses((prev) => [...prev, child.address]);
    } catch (error) {
      console.error("Generation failed:", error);
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Ethereum Wallets
            </h1>
            <button
              onClick={Generate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Add Wallet
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 break-words font-mono text-sm text-gray-700"
              >
                ETH: {address}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
