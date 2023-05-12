import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import changeNetvork from '/public/changeNetvork.svg';
import undrawWallet from '/public/undrawWallet.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';

function NetworkChangeModal({ isOpen, setIsModalOpen }) {
  const context = useContext(ZoinksContext);

  async function addNetwork(id) {
    if (window.ethereum) {
      let networkData;
      switch (id) {
        //bsc
        case '56':
          networkData = [
            {
              chainId: '0x38',
              chainName:
                'BNB Smart Chain (previously Binance Smart Chain Mainnet)',
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              nativeCurrency: {
                name: 'BINANCE COIN',
                symbol: 'BNB',
                decimals: 18,
              },
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ];
          break;
        default:
          break;
      }
      // agregar red o cambiar red
      setIsModalOpen(false);
      return window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: networkData,
      });
    } else {
      return null;
    }
  }

  function connectWallet() {
    context.profile
      .connect()
      .then(() => {
        context.dataDomains.connectivity.update();
      })
      .catch((err) => {
        console.error('Error at wallet connect', { err });
      });
  }

  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-whiteInherit bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-y-[120px] sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 -translate-y-[120px] sm:translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 -translate-y-[20px] sm:translate-y-0 sm:scale-100"
                leaveTo="opacity-0 -translate-y-[20px] sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-dark relative px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-white opacity-70 hover:opacity-100 "
                        onClick={() => setIsModalOpen((prev) => !prev)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-zoinksTextViolet"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg flex justify-center font-medium leading-6 text-gray-900"
                        >
                          <div className="mx-auto flex font-play text-zoinksTextViolet -mt-1.5 flex-shrink-0 items-center justify-center rounded-full">
                            {!window.ethereum
                              ? 'Metamask is not installed'
                              : 'You are in wrong network'}
                          </div>
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="flex justify-center items-center font-play text-zoinksTextViolet pc444:flex-row flex-col">
                            {!window.ethereum ? (
                              <p>
                                Start by connecting with Metamask below. Be sure
                                to store your private keys or seed phrase
                                securely.
                                <br />
                                Never share them with anyone.
                              </p>
                            ) : (
                              <p>
                                Greetings! Our project runs the Binance Smart
                                Chain to complete all operations with our smart
                                contracts. Please switch your current network to
                                BSC as to be able to work with the project.
                              </p>
                            )}
                            <Image
                              className="h-40 w-40"
                              src={
                                !window.ethereum ? undrawWallet : changeNetvork
                              }
                              alt="changeNetwork"
                            />
                          </div>
                          <div className="flex justify-end w-full opacity-70 hover:opacity-100">
                            <button
                              onClick={() => {
                                addNetwork('56').then(() => {
                                  if (
                                    window.ethereum?.networkVersion === '56' ||
                                    window.ethereum?.networkVersion === '31337'
                                  ) {
                                    connectWallet();
                                  }
                                });
                              }}
                              className="font-play hover:bg-whiteInherit w-full mt-2 p-2 text-zoinksTextViolet border border-zoinksTextViolet shadow-lg rounded"
                            >
                              {!window.ethereum ? (
                                <Link
                                  href="https://metamask.io/download/"
                                  target="_blank"
                                >
                                  Install Metamask
                                </Link>
                              ) : (
                                'Switch your network'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
export default NetworkChangeModal;
