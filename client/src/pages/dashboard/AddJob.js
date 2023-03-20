import React, { useContext } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { AppContext } from '../../context/AppContext'
import {Alert, FormRow, FormRowSelect} from '../../components'


const AddJob = () => {
  const {showAlert, position, isEditing, displayAlert, company, jobLocation, jobType, isLoading, jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob, editJob} = useContext(AppContext)

  const handleJobInput  = (e) =>{
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  } 
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job' }</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          {/* position */}
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput}/>
          {/* company */}
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput}/>
          {/* jobLocation */}
          <FormRow type='text' name='jobLocation' labelText='Job Location' value={jobLocation} handleChange={handleJobInput}/>
          {/* job status */}
          <FormRowSelect
          name='status'
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
          name='jobType'
          labelText='Job Type'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
          />
          {/* btn-container */}
          <div className="btn-container">
            <button type='submit' onClick={handleSubmit} disabled={isLoading} className="btn btn-block submit-btn">submit</button>
            <button type='submit' onClick={(e)=>{e.preventDefault();clearValues()}} className="btn btn-block clear-btn">clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
