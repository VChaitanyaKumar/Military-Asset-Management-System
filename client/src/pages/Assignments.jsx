<<<<<<< HEAD
import { useState, useEffect } from 'react'

function Assignments({ user }) {
  const [showForm, setShowForm] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [formData, setFormData] = useState({
    baseId: user?.baseId || 1,
    assetTypeId: '',
    personnelName: '',
    personnelRank: '',
    personnelId: '',
    quantity: '',
    assignmentDate: new Date().toISOString().split('T')[0],
    purpose: '',
    status: 'assigned'
  })

  useEffect(() => {
    fetchAssignments()
    fetchAssetTypes()
  }, [])

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assignments')
      if (response.ok) {
        const data = await response.json()
        setAssignments(data)
      }
    } catch (error) {
      console.error('Error fetching assignments:', error)
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
    try {
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Assignment created successfully!')
        setShowForm(false)
        fetchAssignments()
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      alert('Failed to create assignment')
    }
  }

  const handleMarkExpended = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}/expend`, {
        method: 'PATCH'
      })

      if (response.ok) {
        alert('Assignment marked as expended!')
        fetchAssignments()
      } else {
        alert('Failed to mark as expended')
      }
    } catch (error) {
      console.error('Error marking expended:', error)
      alert('Failed to mark as expended')
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Assignments & Expenditure</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track asset assignments to personnel and expenditure
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-military-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-military-light focus:outline-none"
          >
            {showForm ? 'Cancel' : 'New Assignment'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Assignment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <label className="block text-sm font-medium text-gray-700">Personnel Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelName}
                  onChange={(e) => setFormData({ ...formData, personnelName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rank</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelRank}
                  onChange={(e) => setFormData({ ...formData, personnelRank: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Personnel ID</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelId}
                  onChange={(e) => setFormData({ ...formData, personnelId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignment Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.assignmentDate}
                  onChange={(e) => setFormData({ ...formData, assignmentDate: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Purpose</label>
                <textarea
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-military-accent text-white px-4 py-2 rounded-md hover:bg-military-light focus:outline-none"
              >
                Create Assignment
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.assignment_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.asset_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_rank}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{assignment.purpose}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status === 'assigned' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {assignment.status === 'assigned' && (
                    <button
                      onClick={() => handleMarkExpended(assignment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Mark Expended
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Assignments
=======
import { useState, useEffect } from 'react'

function Assignments({ user }) {
  const [showForm, setShowForm] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [formData, setFormData] = useState({
    baseId: user?.baseId || 1,
    assetTypeId: '',
    personnelName: '',
    personnelRank: '',
    personnelId: '',
    quantity: '',
    assignmentDate: new Date().toISOString().split('T')[0],
    purpose: '',
    status: 'assigned'
  })

  useEffect(() => {
    fetchAssignments()
    fetchAssetTypes()
  }, [])

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assignments')
      if (response.ok) {
        const data = await response.json()
        setAssignments(data)
      }
    } catch (error) {
      console.error('Error fetching assignments:', error)
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
    try {
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Assignment created successfully!')
        setShowForm(false)
        fetchAssignments()
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      alert('Failed to create assignment')
    }
  }

  const handleMarkExpended = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}/expend`, {
        method: 'PATCH'
      })

      if (response.ok) {
        alert('Assignment marked as expended!')
        fetchAssignments()
      } else {
        alert('Failed to mark as expended')
      }
    } catch (error) {
      console.error('Error marking expended:', error)
      alert('Failed to mark as expended')
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Assignments & Expenditure</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track asset assignments to personnel and expenditure
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-military-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-military-light focus:outline-none"
          >
            {showForm ? 'Cancel' : 'New Assignment'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Assignment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <label className="block text-sm font-medium text-gray-700">Personnel Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelName}
                  onChange={(e) => setFormData({ ...formData, personnelName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rank</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelRank}
                  onChange={(e) => setFormData({ ...formData, personnelRank: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Personnel ID</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.personnelId}
                  onChange={(e) => setFormData({ ...formData, personnelId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignment Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.assignmentDate}
                  onChange={(e) => setFormData({ ...formData, assignmentDate: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Purpose</label>
                <textarea
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent sm:text-sm"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-military-accent text-white px-4 py-2 rounded-md hover:bg-military-light focus:outline-none"
              >
                Create Assignment
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.assignment_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.asset_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_rank}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.personnel_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{assignment.purpose}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status === 'assigned' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {assignment.status === 'assigned' && (
                    <button
                      onClick={() => handleMarkExpended(assignment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Mark Expended
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Assignments
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
