function NetMovementModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Net Movement Details
          </h3>
          <div className="mt-2 space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Base:</span>
              <span>{data.baseName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Asset Type:</span>
              <span>{data.assetType}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-green-600">Purchases:</span>
              <span className="text-green-600">+{data.purchases}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-green-600">Transfers In:</span>
              <span className="text-green-600">+{data.transfersIn}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-red-600">Transfers Out:</span>
              <span className="text-red-600">-{data.transfersOut}</span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-gray-300">
              <span className="font-bold">Net Movement:</span>
              <span className={`font-bold ${data.netMovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.netMovement >= 0 ? '+' : ''}{data.netMovement}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-military-accent text-white text-base font-medium rounded-md shadow-sm hover:bg-military-light focus:outline-none focus:ring-2 focus:ring-military-accent"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetMovementModal
