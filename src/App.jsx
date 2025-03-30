import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./solanawallet";
import { EthWallet } from "./ethereumwallet";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Mnemonic />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SolanaWallet />
          <EthWallet />
        </div>
      </div>
    </div>
  );
}

function Mnemonic() {
  const [mnemonic, setMnemonic] = useState("");

  function createMnemonic() {
    const mnemo = generateMnemonic();
    setMnemonic(mnemo);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Mnemonic Phrase Generator
        </h1>
        <button
          onClick={createMnemonic}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          Generate New Mnemonic
        </button>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Your Mnemonic:
          </label>
          <textarea
            value={mnemonic}
            readOnly
            placeholder="Your secure mnemonic will appear here"
            className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
