import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  function generate() {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const { key } = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(
        nacl.sign.keyPair.fromSeed(key).publicKey
      );

      setCurrentIndex((prev) => prev + 1);
      setPublicKeys((prev) => [...prev, keypair.publicKey]);
    } catch (error) {
      console.error("Key generation failed:", error);
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Solana Wallets
            </h1>
            <button
              onClick={generate}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Add Wallet
            </button>
          </div>

          <div className="space-y-3">
            {publicKeys.map((pubKey, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 break-words font-mono text-sm text-gray-700"
              >
                SOL: {pubKey.toBase58()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
