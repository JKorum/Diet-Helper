interface Data {
  garnishes: string[]
  mains: string[]
  sides: string[]
}

export const generateRandomSearch = () => {
  const data: Data = {
    garnishes: [
      'rice',
      'potato',
      'beans',
      'asparagus',
      'quinoa',
      'yam',
      'pasta',
      'buckwheat',
      'couscous',
      'lentil'
    ],
    mains: [
      'chicken',
      'beef',
      'pork',
      'fish',
      'turkey',
      'shrimps',
      'squid',
      'crab',
      'mussel',
      'duck'
    ],
    sides: [
      'cucumber',
      'tomato',
      'brussels sprouts',
      'zucchini',
      'eggplant',
      'bell pepper',
      'pumpkin',
      'broccoli',
      'carrot',
      'beet'
    ]
  }

  const possibleNumbers = [1, 2, 3]
  const index = Math.floor(Math.random() * 3)
  const numOfElements = possibleNumbers[index]

  const fields = ['garnishes', 'mains', 'sides']
  const memory: ['garnishes'?, 'mains'?, 'sides'?] = []

  while (memory.length !== numOfElements) {
    const index = Math.floor(Math.random() * 3)
    const field = fields[index] as keyof Data
    if (!memory.includes(field)) {
      memory.push(field)
    }
  }

  let search = ''
  memory.forEach(field => {
    const set = data[field as keyof Data]
    const index = Math.floor(Math.random() * 10)
    if (!search) {
      search = set[index]
    } else {
      search = search + ` ${set[index]}`
    }
  })

  return search
}
