import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import {FormRow, FormRowSelect} from '.'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  
  const {isLoading, search, searchStatus, searchType, sort, sortOptions, statusOptions, handleChange, clearFilters, jobTypeOptions } = useContext(AppContext)

  const handleSearch = (e) => {
    handleChange({name: e.target.name, value: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }

  // debounce function is for the search bar. so that the app loads its data one minute after the last keystroke of the search bar. you can always alter the time. debounce sets and clears te first timeout at the first render with the help of useMemo. and then sets a new timeout.

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
        handleChange({name: e.target.name, value: e.target.value})
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(()=>debounce(), [])

  return ( 
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">

          {/* search position */}
          <FormRow type='text' name='search' handleChange={optimizedDebounce} value={localSearch}/>

          {/* search by status */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />

          {/* search by jobType */}
          <FormRowSelect labelText='Type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />

          {/* search by sort */}
          <FormRowSelect labelText='sort' name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />

          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
