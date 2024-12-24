import React from 'react';
import Image from 'next/image';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  transactionId?: string;
}

export default function ImageModal({ imageUrl, isOpen, onClose, transactionId }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-[calc(100vh-4rem)] max-w-5xl flex flex-col">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
        >
          Close
        </button>
        <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden flex">
          <div className="flex-1 relative">
            <Image 
              src={imageUrl} 
              alt="Payment Screenshot" 
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="w-72 p-6 border-l border-gray-700 bg-gray-800/90 backdrop-blur-sm flex flex-col">
            <h3 className="text-white text-xl font-semibold mb-4">Transaction Details</h3>
            {transactionId ? (
              <div className="space-y-4">
                <div className="bg-gray-900/80 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Transaction ID</p>
                  <p className="text-white break-all font-mono">{transactionId}</p>
                </div>
                <div className="bg-gray-900/80 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-green-400">Verified</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/80 rounded-lg p-4">
                <p className="text-yellow-400">No transaction ID provided</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}