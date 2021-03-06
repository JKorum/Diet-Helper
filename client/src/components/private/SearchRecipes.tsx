import React, {
  Fragment,
  useState,
  useEffect,
  SyntheticEvent,
  FunctionComponent,
  FormEvent,
  useRef
} from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { fetchRecipes } from '../../store/actions'
import Navigation from '../helpers/Navigation'
import UnregisterModal from '../modals/UnregisterModal'
import { buildRecipesQuery } from '../../utils/buildRecipesQuery'
import { StoreState, Error, Recipe, ActionsTypes } from '../../store/reducers'
import Alert from '../helpers/Alert'
import { RecipesList } from './RecipesList'
import { Spinner } from '../helpers/Spinner'
import { generateRandomSearch } from '../../utils/generateRandomSearch'

export type Search = string

export type Diet = string

export interface Calories {
  from: string
  to: string
}

export interface HealthBoxes {
  'alcohol-free': boolean
  'sugar-conscious': boolean
  vegan: boolean
  vegetarian: boolean
  'tree-nut-free': boolean
  'peanut-free': boolean
}

interface SearchRecipesOwnProps {}
interface SearchRecipesConnectedProps {
  recipesIds: string[] | null
  userActed: boolean
  loading: boolean
  more: boolean | undefined
  error: Error | null
  dispatch?: Function
  infinite: boolean
}

const SearchRecipes: FunctionComponent<SearchRecipesConnectedProps> = ({
  recipesIds,
  userActed,
  loading,
  more,
  dispatch,
  infinite
}) => {
  /* state for collapsing elements */
  const [btnOptState, toggleBtnOptState] = useState(false)
  const [dietFilState, toggleDietFilState] = useState(false)
  const [calFilState, toggleCalFilState] = useState(false)
  const [healthFilState, toggleHealthFilState] = useState(false)

  /* state for input */
  const [search, setSearch] = useState<Search>('')
  const [diet, setDiet] = useState<Diet>('')
  const [calories, setCalories] = useState<Calories>({
    from: '',
    to: ''
  })

  const [health, toggleHealth] = useState<HealthBoxes>({
    'alcohol-free': false,
    'sugar-conscious': false,
    vegan: false,
    vegetarian: false,
    'tree-nut-free': false,
    'peanut-free': false
  })

  /* persistent state for pagination */
  const queryString = useRef('')
  const from = useRef(0)
  const randomQueryString = useRef(
    buildRecipesQuery(generateRandomSearch(), diet, calories, health)
  )

  /* state for req submit button */
  const [disabled, setDisabled] = useState(true)

  /* effects */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: ActionsTypes.USER_ACTED_FALSE
      })

      return () => {
        dispatch({
          type: ActionsTypes.RECIPES_CLEANUP
        })
      }
    }
  }, [])

  useEffect(() => {
    if (search) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [search])

  /* fire a random request */
  useEffect(() => {
    if (!userActed) {
      if (typeof randomQueryString.current === 'string' && dispatch) {
        dispatch(fetchRecipes(randomQueryString.current, false, from.current))
      }
    }
  }, [userActed])

  /* fire infinite requests */
  useEffect(() => {
    const handler = (e: Event) => {
      /* user scrolled to bottom? */
      if (
        Math.ceil(window.pageYOffset) + window.innerHeight >=
        document.body.scrollHeight
      ) {
        /* there are recipes in store & infinite req is allowed? */
        if (
          Array.isArray(recipesIds) &&
          recipesIds.length > 0 &&
          infinite &&
          dispatch
        ) {
          /* there are more recipes available on API? */
          if (more) {
            if (queryString.current) {
              /* user already made req -> use their input */
              from.current = from.current + 10
              dispatch(fetchRecipes(queryString.current, true, from.current))
            } else {
              /* user didn't make req -> use generated input */
              if (typeof randomQueryString.current === 'string') {
                from.current = from.current + 10
                dispatch(
                  fetchRecipes(randomQueryString.current, true, from.current)
                )
              }
            }
          } else {
            /* there are no recipes */
            dispatch({
              type: ActionsTypes.SET_ALERT,
              payload: {
                text: 'There are no more recipes matching the request.',
                color: 'light'
              }
            })
          }
        }
      }
    }
    window.addEventListener('scroll', handler)

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [recipesIds, infinite])

  /* local state handlers */
  const handleBtnOptClick = (e: SyntheticEvent) => {
    toggleBtnOptState(!btnOptState)
  }

  const handleDietClick = (e: SyntheticEvent) => {
    toggleDietFilState(!dietFilState)
  }

  const handleCalClick = (e: SyntheticEvent) => {
    toggleCalFilState(!calFilState)
  }

  const handleHealthClick = (e: SyntheticEvent) => {
    toggleHealthFilState(!healthFilState)
  }

  /* form submit handler */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!userActed) {
      /* first user req -> set ref to query && initialize from to default */
      const query = buildRecipesQuery(search, diet, calories, health)
      if (typeof query === 'string' && dispatch) {
        queryString.current = query
        from.current = 0
        dispatch(fetchRecipes(query, false, from.current))
      }
    } else {
      /* subsequent user req */
      const query = buildRecipesQuery(search, diet, calories, health)
      if (typeof query === 'string' && dispatch) {
        if (queryString.current === query) {
          /* user sent the same req */
          if (more) {
            /* there are more recipes available on API */
            from.current = from.current + 10
            dispatch(fetchRecipes(query, true, from.current))
          } else {
            /* there are no recipes */
            dispatch({
              type: ActionsTypes.SET_ALERT,
              payload: {
                text: 'There are no more recipes matching the request.',
                color: 'light'
              }
            })
          }
        } else {
          /* user sent different req */
          from.current = 0
          queryString.current = query
          dispatch(fetchRecipes(query, false, from.current))
        }
      }
    }
  }

  /* input handlers */
  const handleSearchChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setSearch(target.value)
  }

  const handleDietChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLSelectElement
    setDiet(target.value)
  }

  const handleCalRangeChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setCalories({
      ...calories,
      [target.name]: target.value
    })
  }

  const handleHealthInputClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const stateValue = health[target.name as keyof HealthBoxes]
    toggleHealth({
      ...health,
      [target.name]: !stateValue
    })
  }

  return (
    <Fragment>
      <UnregisterModal />
      <Navigation />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h1 className='display-3 mt-5'>Browse recipes</h1>
            <hr className='my-3' />
            <form onSubmit={handleSubmit}>
              <div className='input-group input-group-lg'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by ingredients'
                  aria-label='Recipes search bar'
                  onChange={handleSearchChange}
                  value={search}
                />
                <div className='input-group-append'>
                  <button
                    className='btn btn-cool'
                    type='submit'
                    disabled={disabled}
                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                  >
                    <p>
                      <i className='fas fa-search'></i>
                    </p>
                  </button>
                </div>
              </div>
              <small className='form-text text-muted mb-2'>
                Please, separate the ingredients with spaces.
              </small>
              <button
                className='btn btn-outline-success btn-sm'
                type='button'
                data-toggle='collapse'
                data-target='#search-filters'
                aria-expanded='false'
                aria-controls='search-filters'
                onClick={handleBtnOptClick}
              >
                {btnOptState ? 'Hide' : 'Show'} options
              </button>
              <div
                id='search-filters'
                className='bg-light p-2 mt-2 rounded collapse'
              >
                <div className='form-row'>
                  <div className='col-12'>
                    <a
                      href='#diet-filter'
                      data-target='#diet-filter'
                      data-toggle='collapse'
                      aria-expanded='false'
                      aria-controls='diet-filter'
                      role='button'
                      className='text-decoration-none text-reset'
                      onClick={handleDietClick}
                    >
                      <p className='lead mb-1'>
                        Diet{' '}
                        {dietFilState ? (
                          <i className='fas fa-angle-down'></i>
                        ) : (
                          <i className='fas fa-angle-left'></i>
                        )}
                      </p>
                    </a>

                    <div id='diet-filter' className='input-group mb-2 collapse'>
                      <select
                        className='custom-select'
                        onChange={handleDietChange}
                        value={diet}
                      >
                        <option value='' defaultValue=''>
                          Select a diet
                        </option>
                        <option value='balanced'>Balanced</option>
                        <option value='high-protein'>High-protein</option>
                        <option value='low-fat'>Low-fat</option>
                        <option value='low-carb'>Low-carb</option>
                      </select>
                    </div>

                    <a
                      href='#cal-filter'
                      data-target='#cal-filter'
                      data-toggle='collapse'
                      aria-expanded='false'
                      aria-controls='cal-filter'
                      role='button'
                      className='text-decoration-none text-reset'
                      onClick={handleCalClick}
                    >
                      <p className='lead mb-1'>
                        Calories{' '}
                        {calFilState ? (
                          <i className='fas fa-angle-down'></i>
                        ) : (
                          <i className='fas fa-angle-left'></i>
                        )}
                      </p>
                    </a>
                    <div id='cal-filter' className='collapse'>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>From</span>
                        </div>
                        <input
                          name='from'
                          type='number'
                          aria-label='Calories range from'
                          className='form-control'
                          onChange={handleCalRangeChange}
                          value={calories.from}
                          step={1}
                        />
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>To</span>
                        </div>
                        <input
                          name='to'
                          type='number'
                          aria-label='Calories range to'
                          className='form-control'
                          onChange={handleCalRangeChange}
                          value={calories.to}
                          step={1}
                        />
                      </div>
                      <small className='form-text text-muted mb-2'>
                        You can set a calorie range per serving. Please note,
                        it's also possible to specify either min or max value by
                        setting 'From' or 'To,' respectively.
                      </small>
                    </div>
                  </div>

                  <div className='col-12'>
                    <a
                      href='#health-filter'
                      data-target='#health-filter'
                      data-toggle='collapse'
                      aria-expanded='false'
                      aria-controls='health-filter'
                      role='button'
                      className='text-decoration-none text-reset'
                      onClick={handleHealthClick}
                    >
                      <p className='lead mb-1'>
                        Health labels{' '}
                        {healthFilState ? (
                          <i className='fas fa-angle-down'></i>
                        ) : (
                          <i className='fas fa-angle-left'></i>
                        )}
                      </p>
                    </a>
                    <div
                      id='health-filter'
                      className='form-group collapse mb-0'
                    >
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='alcohol-free'
                          name='alcohol-free'
                          value={health['alcohol-free'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='alcohol-free'
                        >
                          Alcohol-free
                        </label>
                      </div>

                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='sugar-conscious'
                          name='sugar-conscious'
                          value={health['sugar-conscious'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='sugar-conscious'
                        >
                          Sugar-conscious
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='vegan'
                          name='vegan'
                          value={health['vegan'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label className='custom-control-label' htmlFor='vegan'>
                          Vegan
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='vegetarian'
                          name='vegetarian'
                          value={health['vegetarian'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='vegetarian'
                        >
                          Vegetarian
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='tree-nut-free'
                          name='tree-nut-free'
                          value={health['tree-nut-free'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='tree-nut-free'
                        >
                          Tree-nut-free
                        </label>
                      </div>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='peanut-free'
                          name='peanut-free'
                          value={health['peanut-free'].toString()}
                          onClick={handleHealthInputClick}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='peanut-free'
                        >
                          Peanut-free
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <RecipesList ids={recipesIds} />
      {loading ? <Spinner /> : null}
      <Alert />
    </Fragment>
  )
}

function makeListOfRecipesId(data: Recipe[] | null): string[] | null {
  if (Array.isArray(data)) {
    let listOfIds: string[] = []
    if (data.length > 0) {
      for (let rec of data) {
        if (rec.clientSideId) {
          listOfIds.push(rec.clientSideId)
        }
      }
    }
    return listOfIds
  } else {
    return null
  }
}

const mapStateToProps: MapStateToProps<
  SearchRecipesConnectedProps,
  SearchRecipesOwnProps,
  StoreState
> = ({ recipes: { fetched, more, loading, error, infinite }, userActed }) => ({
  recipesIds: makeListOfRecipesId(fetched),
  userActed,
  more,
  loading,
  error,
  infinite
})

export default connect(mapStateToProps)(SearchRecipes)
