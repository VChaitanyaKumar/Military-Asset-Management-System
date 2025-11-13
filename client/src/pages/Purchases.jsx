<<<<<<< HEAD
import { useState, useEffect } from 'react'

function Purchases({ user }) {
  const [showForm, setShowForm] = useState(false)
  const [purchases, setPurchases] = useState([])
  const [bases, setBases] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [formData, setFormData] = useState({
    baseId: user?.baseId || 1,
    assetTypeId: '',
    vendor: '',
    quantity: '',
    unitCost: '',
    totalCost: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchPurchases()
    fetchBases()
    fetchAssetTypes()
  }, [])

  const fetchPurchases = async () => {
    try {
      console.log('Fetching purchases from:', 'http://localhost:5000/api/purchases')
      const response = await fetch('http://localhost:5000/api/purchases')
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Purchases data:', data)
        setPurchases(data)
      } else {
        console.error('Failed to fetch purchases:', response.status)
      }
    } catch (error) {
      console.error('Error fetching purchases:', error)
    }
  }

  const fetchBases = async () => {
    try {
      console.log('Fetching bases...')
      const response = await fetch('http://localhost:5000/api/bases')
      console.log('Bases response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Bases data:', data)
        setBases(data)
      }
    } catch (error) {
      console.error('Error fetching bases:', error)
    }
  }

  const fetchAssetTypes = async () => {
    try {
      console.log('Fetching asset types...')
      const response = await fetch('http://localhost:5000/api/asset-types')
      console.log('Asset types response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Asset types data:', data)
        setAssetTypes(data)
      }
    } catch (error) {
      console.error('Error fetching asset types:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Purchase created successfully!')
        setShowForm(false)
        fetchPurchases()
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating purchase:', error)
      alert('Failed to create purchase')
    }
  }

  const handleQuantityChange = (quantity) => {
    const unitCost = parseFloat(formData.unitCost) || 0
    const total = quantity * unitCost
    setFormData({ ...formData, quantity, totalCost: total.toFixed(2) })
  }

  const handleUnitCostChange = (unitCost) => {
    const quantity = parseFloat(formData.quantity) || 0
    const total = quantity * unitCost
    setFormData({ ...formData, unitCost, totalCost: total.toFixed(2) })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Purchases</h1>
          <p className="mt-2 text-sm text-gray-700">
            Record and track asset purchases for bases
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-military-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-military-light focus:outline-none"
          >
            {showForm ? 'Cancel' : 'New Purchase'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Record New Purchase</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Base</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.baseId}
                  onChange={(e) => setFormData({ ...formData, baseId: e.target.value })}
                  disabled={user?.role === 'commander'}
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
                <label className="block text-sm font-medium text-gray-700">Vendor</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Cost</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.unitCost}
                  onChange={(e) => handleUnitCostChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Cost</label>
                <input
                  type="number"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                  value={formData.totalCost}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-military-accent text-white px-4 py-2 rounded-md hover:bg-military-light focus:outline-none"
              >
                Record Purchase
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.purchase_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.base_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.asset_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(purchase.unit_cost).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(purchase.total_cost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Purchases
=======
import { useState, useEffect } from 'react'

function Purchases({ user }) {
  const [showForm, setShowForm] = useState(false)
  const [purchases, setPurchases] = useState([])
  const [bases, setBases] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [formData, setFormData] = useState({
    baseId: user?.baseId || 1,
    assetTypeId: '',
    vendor: '',
    quantity: '',
    unitCost: '',
    totalCost: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchPurchases()
    fetchBases()
    fetchAssetTypes()
  }, [])

  const fetchPurchases = async () => {
    try {
      console.log('Fetching purchases from:', 'http://localhost:5000/api/purchases')
      const response = await fetch('http://localhost:5000/api/purchases')
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Purchases data:', data)
        setPurchases(data)
      } else {
        console.error('Failed to fetch purchases:', response.status)
      }
    } catch (error) {
      console.error('Error fetching purchases:', error)
    }
  }

  const fetchBases = async () => {
    try {
      console.log('Fetching bases...')
      const response = await fetch('http://localhost:5000/api/bases')
      console.log('Bases response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Bases data:', data)
        setBases(data)
      }
    } catch (error) {
      console.error('Error fetching bases:', error)
    }
  }

  const fetchAssetTypes = async () => {
    try {
      console.log('Fetching asset types...')
      const response = await fetch('http://localhost:5000/api/asset-types')
      console.log('Asset types response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Asset types data:', data)
        setAssetTypes(data)
      }
    } catch (error) {
      console.error('Error fetching asset types:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Purchase created successfully!')
        setShowForm(false)
        fetchPurchases()
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating purchase:', error)
      alert('Failed to create purchase')
    }
  }

  const handleQuantityChange = (quantity) => {
    const unitCost = parseFloat(formData.unitCost) || 0
    const total = quantity * unitCost
    setFormData({ ...formData, quantity, totalCost: total.toFixed(2) })
  }

  const handleUnitCostChange = (unitCost) => {
    const quantity = parseFloat(formData.quantity) || 0
    const total = quantity * unitCost
    setFormData({ ...formData, unitCost, totalCost: total.toFixed(2) })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Purchases</h1>
          <p className="mt-2 text-sm text-gray-700">
            Record and track asset purchases for bases
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-military-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-military-light focus:outline-none"
          >
            {showForm ? 'Cancel' : 'New Purchase'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Record New Purchase</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Base</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.baseId}
                  onChange={(e) => setFormData({ ...formData, baseId: e.target.value })}
                  disabled={user?.role === 'commander'}
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
                <label className="block text-sm font-medium text-gray-700">Vendor</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Cost</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.unitCost}
                  onChange={(e) => handleUnitCostChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Cost</label>
                <input
                  type="number"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                  value={formData.totalCost}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-military-accent text-white px-4 py-2 rounded-md hover:bg-military-light focus:outline-none"
              >
                Record Purchase
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.purchase_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.base_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.asset_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(purchase.unit_cost).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(purchase.total_cost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Purchases
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
