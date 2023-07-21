// initial state values for react UI components
// these values cannot be synced until the audio graph is mounted after a user action

export const filterRanges = {
  rumble: {
    lowpass: {
      min: 1,
      max: 70
    },
    highpass: {
      min: 1,
      max: 70
    }
  },
  low: {
    lowpass: {
      min: 1,
      max: 70
    },
    highpass: {
      min: 1,
      max: 70
    }
  },
  midLow: {
    lowpass: {
      min: 80,
      max: 5000
    },
    highpass: {
      min: 80,
      max: 5000
    }
  },
  midHigh: {
    lowpass: {
      min: 80,
      max: 5000
    },
    highpass: {
      min: 80,
      max: 5000
    }
  },
  high: {
    lowpass: {
      min: 8000,
      max: 14000
    },
    highpass: {
      min: 8000,
      max: 14000
    }
  }
}

export const defaultParams = [
  {
    id: 'rumble',
    name: 'rumble',
    gain: 0.6,
    highpassFreq: 30,
    lowpassFreq: 60
  },
  {
    id: 'low',
    name: 'low',
    gain: 0.6,
    highpassFreq: 60,
    lowpassFreq: 200
  },
  {
    id: 'midLow',
    name: 'wind',
    gain: 0.1,
    highpassFreq: 200,
    lowpassFreq: 500
  },
  {
    id: 'midHigh',
    name: 'rain',
    gain: 0.1,
    highpassFreq: 500,
    lowpassFreq: 3000
  },
  {
    id: 'high',
    name: 'hiss',
    gain: 0.4,
    highpassFreq: 10000,
    lowpassFreq: 12000
  }
]
