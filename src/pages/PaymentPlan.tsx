import React from 'react';
import { motion } from 'framer-motion';
import { useItineraryStore } from '../store/itineraryStore';

const PaymentPlan: React.FC = () => {
  const { 
    paymentPlan, 
    updatePaymentField,
    addInstallment,
    removeInstallment,
    updateInstallment,
    generateInstallments,
    addAdditionalFee,
    removeAdditionalFee,
    updateAdditionalFee
  } = useItineraryStore();

  const currencies = ['USD', 'EUR', 'GBP', 'SGD', 'INR', 'AUD', 'CAD', 'JPY'];
  const paymentMethods = ['Bank Transfer', 'Credit Card', 'PayPal', 'Cash', 'Check', 'Cryptocurrency'];

  const getTotalWithFees = () => {
    const feesTotal = paymentPlan.additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
    return paymentPlan.totalAmount + feesTotal;
  };

  const getInstallmentTotal = () => {
    return paymentPlan.installments.reduce((sum, installment) => sum + installment.amount, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl mb-4"
        >
          <span className="text-2xl">💳</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure flexible payment schedules and terms for your travel package
        </p>
      </div>

      {/* Package Pricing */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">💰</span>
          </span>
          Package Pricing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Package Amount *
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={paymentPlan.totalAmount}
                onChange={(e) => updatePaymentField('totalAmount', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              value={paymentPlan.currency}
              onChange={(e) => updatePaymentField('currency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Installments
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={paymentPlan.numberOfInstallments}
              onChange={(e) => updatePaymentField('numberOfInstallments', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateInstallments}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <span>✨</span>
          Generate Equal Installments
        </motion.button>
      </motion.div>

      {/* Additional Fees */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </span>
            Additional Fees
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addAdditionalFee}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-all flex items-center gap-2"
          >
            <span>+</span>
            Add Fee
          </motion.button>
        </div>

        {paymentPlan.additionalFees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💸</span>
            </div>
            <p className="italic">No additional fees added</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentPlan.additionalFees.map((fee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100"
              >
                <input
                  type="text"
                  value={fee.name}
                  onChange={(e) => updateAdditionalFee(index, 'name', e.target.value)}
                  placeholder="Fee name"
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={fee.amount}
                  onChange={(e) => updateAdditionalFee(index, 'amount', parseFloat(e.target.value) || 0)}
                  placeholder="Amount"
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={fee.description}
                  onChange={(e) => updateAdditionalFee(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeAdditionalFee(index)}
                  className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-all"
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {paymentPlan.additionalFees.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Package Amount:</span>
              <span className="font-medium">{paymentPlan.currency} {paymentPlan.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Additional Fees:</span>
              <span className="font-medium">{paymentPlan.currency} {paymentPlan.additionalFees.reduce((sum, fee) => sum + fee.amount, 0).toFixed(2)}</span>
            </div>
            <hr className="my-2 border-blue-200" />
            <div className="flex justify-between items-center font-semibold text-lg text-gray-900">
              <span>Total Amount:</span>
              <span className="text-blue-600">{paymentPlan.currency} {getTotalWithFees().toFixed(2)}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Payment Installments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📋</span>
            </span>
            Payment Installments
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addInstallment}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-all flex items-center gap-2"
          >
            <span>+</span>
            Add Installment
          </motion.button>
        </div>

        {paymentPlan.installments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-lg mb-2">No installments configured</p>
            <p className="text-sm">Use "Generate Equal Installments" or add manually</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paymentPlan.installments.map((installment, index) => (
              <motion.div
                key={installment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                      {installment.installmentNumber}
                    </span>
                    Installment {installment.installmentNumber}
                  </h4>
                  {paymentPlan.installments.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeInstallment(installment.id)}
                      className="px-3 py-1 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-all text-sm"
                    >
                      Remove
                    </motion.button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount ({paymentPlan.currency})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={installment.amount}
                      onChange={(e) => updateInstallment(installment.id, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={installment.dueDate}
                      onChange={(e) => updateInstallment(installment.id, 'dueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={installment.status}
                      onChange={(e) => updateInstallment(installment.id, 'status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      value={installment.paymentMethod}
                      onChange={(e) => updateInstallment(installment.id, 'paymentMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select method</option>
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={installment.description}
                      onChange={(e) => updateInstallment(installment.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Down Payment, Final Payment"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={installment.notes}
                      onChange={(e) => updateInstallment(installment.id, 'notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
            >
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span>
                Payment Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Installments:</span>
                    <span className="font-medium">{paymentPlan.currency} {getInstallmentTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package + Fees:</span>
                    <span className="font-medium">{paymentPlan.currency} {getTotalWithFees().toFixed(2)}</span>
                  </div>
                  <hr className="border-blue-200" />
                  <div className="flex justify-between font-semibold">
                    <span>Difference:</span>
                    <span className={getInstallmentTotal() === getTotalWithFees() ? 'text-green-600' : 'text-red-600'}>
                      {paymentPlan.currency} {(getInstallmentTotal() - getTotalWithFees()).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    getInstallmentTotal() === getTotalWithFees() 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <span>{getInstallmentTotal() === getTotalWithFees() ? '✅' : '⚠️'}</span>
                    {getInstallmentTotal() === getTotalWithFees() 
                      ? 'Installments match total amount' 
                      : 'Installments do not match total amount'
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Payment Terms & Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">📜</span>
          </span>
          Terms & Policies
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payment Terms & Conditions
            </label>
            <textarea
              value={paymentPlan.paymentTerms}
              onChange={(e) => updatePaymentField('paymentTerms', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter payment terms, conditions, and important information..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cancellation & Refund Policy
            </label>
            <textarea
              value={paymentPlan.refundPolicy}
              onChange={(e) => updatePaymentField('refundPolicy', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter cancellation and refund policy details..."
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentPlan;
