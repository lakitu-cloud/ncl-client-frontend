// src/pages/IntegrationsPage.tsx
import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Header from '../../layout/navbar/Header';

type Integration = {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  alt: string;
  status: 'connected' | 'not-connected';
  connectedAt?: string;
  docsUrl?: string;
};

const integrations: Integration[] = [
  {
    id: 'gepg',
    title: 'GePG',
    description: 'Integrate with Government Electronic Payment Gateway for bill payments and reconciliation.',
    logoUrl: require('../../assets/images/logo/3.png'),
    alt: 'GePG Official Logo',
    status: 'not-connected',
    docsUrl: 'https://www.gepg.go.tz',
  },
  {
    id: 'selcom',
    title: 'Selcom',
    description: 'Accept payments via mobile money, cards, and bank transfers through Selcom gateway.',
    logoUrl: 'https://images.squarespace-cdn.com/content/v1/528206a7e4b0f4289e544eda/fca25423-05b4-494d-8ce9-673f902848e4/selcom.png',
    alt: 'Selcom Official Logo',
    status: 'not-connected',
    docsUrl: 'https://www.selcom.net',
  },
  {
    id: 'africastalking',
    title: "Africa's Talking",
    description: 'Send SMS notifications, USSD menus, and airtime top-ups to customers instantly.',
    logoUrl: require('../../assets/images/logo/at.png'), // Official logo fallback (common path)
    alt: "Africa's Talking Logo",
    status: 'not-connected',
    // connectedAt: '2025-11-15',
    docsUrl: 'https://africastalking.com',
  },
  // {
  //   id: 'halopesa',
  //   title: 'HaloPesa',
  //   description: 'Enable direct payments from HaloPesa wallets for seamless customer transactions.',
  //   logoUrl: 'https://clickpesa.com/wp-content/uploads/2024/08/halopesa-logo.png',
  //   alt: 'HaloPesa Official Logo',
  //   status: 'not-connected',
  //   docsUrl: 'https://halotel.co.tz/halopesa',
  // },
  // {
  //   id: 'mpesa',
  //   title: 'M-Pesa (Vodacom)',
  //   description: 'Connect to Vodacom M-Pesa API for mobile money collections and disbursements.',
  //   logoUrl: 'https://vodacom.co.tz/uploads/Digital_Payments_304_175_Mpesa_2615a771fa.jpg',
  //   alt: 'M-Pesa Vodacom Tanzania Logo',
  //   status: 'not-connected',
  //   docsUrl: 'https://developer.vodacom.co.tz',
  // },
  // {
  //   id: 'tigopesa',
  //   title: 'Tigo Pesa',
  //   description: 'Integrate Tigo Pesa for instant mobile money payments and customer notifications.',
  //   logoUrl: 'https://cdn.prod.website-files.com/64199d190fc7afa82666d89c/6491beebed5bfcd9b9608baf_tigo_pesa.webp',
  //   alt: 'Tigo Pesa Official Logo',
  //   status: 'not-connected',
  //   docsUrl: 'https://www.tigo.co.tz',
  // },
];

const IntegrationsPage: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${selectedIntegration?.title} integration initiated! Check your email for setup instructions.`);
    setSelectedIntegration(null);
    // Future: Call your Bun API + Prisma to save credentials/status
  };

  return (
    <>
      <Header title="Integrations" />

      <div className="py-8 max-w-screen-xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-oswald uppercase text-gray-900 dark:text-white">
            Payment & Service Integrations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 font-poppins max-w-3xl">
            Connect your prepaid meter system to leading payment gateways, mobile money providers, and communication services to automate collections, notifications, and reconciliation.
          </p>
        </div>

        {/* Grid of Integrations */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white dark:bg-blackText border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={integration.logoUrl}
                      alt={integration.alt}
                      className="w-20 h-20 object-contain"
                      loading="lazy" // Performance boost
                    />
                    <div>
                      <h3 className="text-xl font-semibold font-oswald text-gray-900 dark:text-white">
                        {integration.title}
                      </h3>
                      {integration.status === 'connected' && integration.connectedAt && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-poppins">
                          Connected on {new Date(integration.connectedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {integration.status === 'connected' ? (
                      <FaCheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <FaExclamationCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm font-poppins leading-relaxed mb-6">
                  {integration.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleConnect(integration)}
                    disabled={integration.status === 'connected'}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      integration.status === 'connected'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 cursor-not-allowed'
                        : 'bg-blue-600 text-white dark:text-black hover:bg-blue-700 dark:bg-white dark:hover:bg-whiteText'
                    }`}
                  >
                    {integration.status === 'connected' ? 'Connected' : 'Connect Now'}
                  </button>

                  {integration.docsUrl && (
                    <a
                      href={integration.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                    >
                      Docs
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Modal – unchanged (ready for real API keys) */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 overflow-y-auto max-h-screen">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedIntegration.logoUrl}
                alt={selectedIntegration.alt}
                className="w-16 h-16 object-contain"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white">
                Connect {selectedIntegration.title}
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 font-poppins">
              Provide your credentials to enable automated payments and notifications through {selectedIntegration.title}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key / Client ID
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800"
                  placeholder="Enter your API key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secret Key / Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800"
                  placeholder="Enter your secret"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Callback URL (Optional)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800"
                  placeholder="https://yourdomain.com/api/webhook"
                  defaultValue={`${window.location.origin}/api/webhook/${selectedIntegration.id}`}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-2">We'll send payment notifications here</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Connect Integration
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIntegration(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IntegrationsPage;