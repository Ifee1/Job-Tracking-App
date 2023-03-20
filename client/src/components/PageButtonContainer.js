import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { AppContext } from '../context/AppContext'
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'

const PageButtonContainer = () => {
    const {numOfPages, page, changePage} = useContext(AppContext)

    const pages = Array.from({length: numOfPages}, (_, index)=>{
        return index + 1
    })

    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1){
            newPage = numOfPages
            // alternative (newPage = 1)
        }
        changePage(newPage)
    }
// Here, numOfPages is the lastPage
    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages){
            newPage = 1
        }
         // alternative (newPage = numOfPages)
        changePage(newPage)
    } 

    return (
   <Wrapper>
    <button className="prev-btn" onClick={prevPage}><HiChevronDoubleLeft/>prev</button>
    <div className="btn-container">{pages.map((pageNumber)=>{
        return (
            <button type='button' key={pageNumber} onClick={()=>changePage(pageNumber)} className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}>{pageNumber}</button>
        )
    })}</div>
    <button className="next-btn" onClick={nextPage}>next <HiChevronDoubleRight/></button>
   </Wrapper>
  )
}

export default PageButtonContainer
