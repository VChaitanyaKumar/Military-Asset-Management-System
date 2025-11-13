import { useState, useEffect } from 'react'

function Transfers({ user }) {
  const [showForm, setShowForm] = useState(false)
  const [transfers, setTransfers] = useState([])
  const [bases, setBases] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [formData, setFormData] = useState({
    fromBaseId: user?.role === 'commander' ? user?.baseId : 1,
    toBaseId: '',
    assetTypeId: '',
    quantity: '',
    authorizedOfficer: user?.name || 'Admin User',
    transferDate: new Date().toISOString().split('T')[0],
    remarks: ''
  })

  useEffect(() => {
    fetchTransfers()
    fetchBases()
    fetchAssetTypes()
  }, [])

  const fetchTransfers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transfers')
      if (response.ok) {
        const data = await response.json()
        setTransfers(data)
      }
    } catch (error) {
      console.error('Error fetching transfers:', error)
    }
  }

  const fetchBases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bases')
      if (response.ok) {
        const data = await response.json()
        setBases(data)
      }
    } catch (error) {
      console.error('Error fetching bases:', error)
    }
  }

  const fetchAssetTypes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/asset-types')
      if (response.ok) {
        const data = await response.json()
        setAssetTypes(data)
      }
    } catch (error) {
      console.error('Error fetching asset types:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.fromBaseId === formData.toBaseId) {
      alert('Source and destination bases cannot be the same')
      return
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Transfer created successfully!')
        setShowForm(false)
        fetchTransfers()
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating transfer:', error)
      alert('Failed to create transfer')
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Transfers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage asset transfers between bases
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-military-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-military-light focus:outline-none"
          >
            {showForm ? 'Cancel' : 'New Transfer'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Transfer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">From Base</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.fromBaseId}
                  onChange={(e) => setFormData({ ...formData, fromBaseId: e.target.value })}
                  disabled={user?.role === 'commander'}
                >
                  <option value="">Select Base</option>
                  {bases.map(base => (
                    <option key={base.id} value={base.id}>{base.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To Base</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.toBaseId}
                  onChange={(e) => setFormData({ ...formData, toBaseId: e.target.value })}
                >
                  <option value="">Select Base</option>
                  {bases.map(base => (
                    <option key={base.id} value={base.id}>{base.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.assetTypeId}
                  onChange={(e) => setFormData({ ...formData, assetTypeId: e.target.value })}
                >
                  <option value="">Select Type</option>
                  {assetTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Authorized Officer</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.authorizedOfficer}
                  onChange={(e) => setFormData({ ...formData, authorizedOfficer: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Transfer Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.transferDate}
                  onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-military-accent text-white px-4 py-2 rounded-md hover:bg-military-light focus:outline-none"
              >
                Create Transfer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.transfer_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.from_base_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.to_base_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.asset_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.authorized_officer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transfer.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transfers
