import {
  Search,
  Diet,
  Calories,
  HealthBoxes
} from '../components/SearchRecipes'

interface Fragments {
  dietFragment: string | undefined
  caloriesFragment: string | undefined
  healthFragment: string | undefined
}

export const buildRecipesQuery = (
  search: Search,
  diet: Diet,
  calories: Calories,
  health: HealthBoxes
): string | null => {
  if (search.length > 0) {
    let searhFragment = `q=${encodeURIComponent(search.toLowerCase())}`

    let dietFragment: string | undefined
    if (diet.length > 0) {
      dietFragment = `&diet=${diet}`
    }

    let caloriesFragment: string | undefined
    if (calories.from.length > 0 && calories.to.length > 0) {
      let from: string | number = calories.from
      let to: string | number = calories.to
      if (from[0] === '-') {
        from = from.slice(1)
      }
      if (to[0] === '-') {
        to = to.slice(1)
      }
      from = Math.round(+from)
      to = Math.round(+to)
      caloriesFragment = `&calories=${from}-${to}`
    } else if (calories.from.length > 0) {
      let from: string | number = calories.from
      if (from[0] === '-') {
        from = from.slice(1)
      }
      from = Math.round(+from)
      caloriesFragment = `&calories=${from}${encodeURIComponent('+')}`
    } else if (calories.to.length > 0) {
      let to: string | number = calories.to
      if (to[0] === '-') {
        to = to.slice(1)
      }
      to = Math.round(+to)
      caloriesFragment = `&calories=${to}`
    }

    let healthFragment: string | undefined
    for (let key in health) {
      if (health[key as keyof HealthBoxes]) {
        if (typeof healthFragment === 'undefined') {
          healthFragment = `&health=${key}`
        } else {
          healthFragment = healthFragment + `&health=${key}`
        }
      }
    }

    /* building final query */
    const fragments: Fragments = {
      dietFragment,
      caloriesFragment,
      healthFragment
    }
    for (let fragment in fragments) {
      if (fragments[fragment as keyof Fragments]) {
        searhFragment = searhFragment + fragments[fragment as keyof Fragments]
      }
    }

    return searhFragment
  } else {
    return null
  }
}
