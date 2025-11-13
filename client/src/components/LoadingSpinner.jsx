<<<<<<< HEAD
function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-military-accent ${sizeClasses[size]}`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
=======
function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-military-accent ${sizeClasses[size]}`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
