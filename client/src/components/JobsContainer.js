import React , { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from '../components/Job'
import Alert from '../components/Alert'
import PageButtonContainer from './PageButtonContainer'

const JobsContainer = () => {
    const {getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages, showAlert}= useContext(AppContext)

    useEffect(()=>{
        getJobs()
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort])
    if (isLoading){
       return <Loading center/>
    }  

    if(jobs.length === 0){
        return <Wrapper>
                    <h2>No Jobs to display...</h2>
                </Wrapper>
    }
  return (
    <Wrapper>
        {showAlert && <Alert/>}
        <h5> {totalJobs} job{jobs.length > 1 && 's'} found</h5>
        <div className="jobs">
            {jobs.map((job, id)=>{
                return (
                    <Job
                    key={id}
                    {...job}
                    />
                )
            })}
        </div>
        {/* Pagination buttons  */}
        {numOfPages > 1 && <PageButtonContainer/> }
    </Wrapper>
  )
}

export default JobsContainer
