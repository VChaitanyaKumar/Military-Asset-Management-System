import { useState, useEffect } from 'react'
import NetMovementModal from '../components/NetMovementModal'

function Dashboard({ user }) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    baseId: '',
    assetTypeId: ''
  })
  const [dashboardData, setDashboardData] = useState([])
  const [bases, setBases] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchDashboardData()
    fetchBases()
    fetchAssetTypes()
  }, [filters])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard?${new URLSearchParams(filters)}`)

      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      } else {
        console.error('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
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

  const handleNetMovementClick = (row) => {
    setSelectedMovement({
      baseName: row.baseName,
      assetType: row.assetType,
      purchases: row.purchases,
      transfersIn: row.transfersIn,
      transfersOut: row.transfersOut,
      netMovement: row.purchases + row.transfersIn - row.transfersOut
    })
    setShowModal(true)
  }

  const calculateNetMovement = (row) => {
    return row.purchases + row.transfersIn - row.transfersOut
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of asset movements and balances across all bases
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
              value={filters.baseId}
              onChange={(e) => setFilters({ ...filters, baseId: e.target.value })}
            >
              <option value="">All Bases</option>
              {bases.map(base => (
                <option key={base.id} value={base.id}>{base.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
              value={filters.assetTypeId}
              onChange={(e) => setFilters({ ...filters, assetTypeId: e.target.value })}
            >
              <option value="">All Types</option>
              {assetTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dashboard Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Base</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Asset Type</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Opening Balance</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Purchases</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Transfers In</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Transfers Out</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Net Movement</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Assigned</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Expended</th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dashboardData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{row.baseName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{row.assetType}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">{row.openingBalance}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">{row.purchases}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">{row.transfersIn}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-red-600">{row.transfersOut}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                        <button
                          onClick={() => handleNetMovementClick(row)}
                          className="text-blue-600 hover:text-blue-900 font-medium underline"
                        >
                          {calculateNetMovement(row)}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">{row.assigned}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-red-600">{row.expended}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-semibold text-gray-900">{row.closingBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <NetMovementModal
          data={selectedMovement}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
