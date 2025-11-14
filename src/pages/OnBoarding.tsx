import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks'
import type { ClassType } from '../types/user'

const classes: { value: ClassType; label: string; description: string }[] = [
  {
    value: 'FRONTEND',
    label: 'Frontend Developer',
    description: 'Master of UI/UX and client-side magic',
  },
  {
    value: 'BACKEND',
    label: 'Backend Developer',
    description: 'Server-side wizard and API architect',
  },
  {
    value: 'FULLSTACK',
    label: 'Fullstack Developer',
    description: 'Jack of all trades, master of many',
  },
  {
    value: 'MOBILE',
    label: 'Mobile Developer',
    description: 'Native and cross-platform expert',
  },
  {
    value: 'DEVOPS',
    label: 'DevOps Engineer',
    description: 'Infrastructure and deployment master',
  },
  {
    value: 'DATA_ENGINEER',
    label: 'Data Engineer',
    description: 'Pipeline builder and data wrangler',
  },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnBoardingAsync, isCompletingOnBoarding } = useUser()
  
  const [name, setName] = useState('')
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!selectedClass) {
      setError('Please select a class')
      return
    }

    try {
      await completeOnBoardingAsync({
        name: name.trim(),
        classType: selectedClass,
      })
      
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Onboarding error:', err)
      setError('Failed to complete onboarding. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to CoderPG! 🎮</h1>
          <p className="text-gray-300">Let's set up your developer profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <label className="block text-white font-medium mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isCompletingOnBoarding}
            />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <label className="block text-white font-medium mb-4">
              Choose your class
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classes.map((classOption) => (
                <button
                  key={classOption.value}
                  type="button"
                  onClick={() => setSelectedClass(classOption.value)}
                  disabled={isCompletingOnBoarding}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedClass === classOption.value
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/20 bg-white/5 hover:border-purple-400'
                  } disabled:opacity-50`}
                >
                  <p className="text-white font-semibold">{classOption.label}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {classOption.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isCompletingOnBoarding}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isCompletingOnBoarding ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Setting up...
              </>
            ) : (
              'Start Your Journey'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}