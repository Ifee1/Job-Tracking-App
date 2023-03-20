import React, { useEffect, useReducer  } from "react"
import axios from 'axios'
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB_BEGIN, DELETE_JOB_ERROR, EDIT_JOB_BEGIN, EDIT_JOB_ERROR, EDIT_JOB_SUCCESS, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS } from "./Action"
import Reducer from "./Reducer"


// Because of the token that exists in the cookie, we don't need the token in the local storage anymore. Since the browser does the heavy lifting.

// const token = localStorage.getItem('token')
// const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    // (Before the cookie feature. Token is deleted in the cookie setting)
    //user: user ? JSON.parse(user) : null, 
     //token: token,
    //userLocation:userLocation ||  '',    user: null,
    //jobLocation: userLocation || '',
    user: null,
    userLocation: '',
    jobLocation: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page:1, 
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState)

    // axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    // axios Interceptor Request. (Again, this code is removed because of the Cookie setting. The token is in the cookie. we don't need the token again)
    // authFetch.interceptors.request.use((config)=>{
    //     config.headers['Authorization'] = `Bearer ${state.token}`
    //     return config
    // },
    // (error)=>{
    //     return Promise.reject(error)
    // })

    // axios Interceptor Response
    authFetch.interceptors.response.use((response)=>{
        return response
    },
    (error)=>{
       //console.log(error.response);
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(()=>{
            dispatch({type:CLEAR_ALERT})
        }, 3000)
        
    }

    // Cookie setting.
    // const addUserToLocalStorage = ({ user, token, location}) =>{
    //     localStorage.setItem('user', JSON.stringify(user))
    //     localStorage.setItem('token', token)
    //     localStorage.setItem('location', location)
    // }

    // const removeUserFromLocalStorage = () => {
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('user')
    //     localStorage.removeItem('location')
    // }

    const registerUser = async (currentUser) => {
        dispatch({type: REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            const {user, 
                //token,
                 location} = response.data
            dispatch({
            type: REGISTER_USER_SUCCESS,
             payload: {user, 
                //token, 
                location}
            })
            //addUserToLocalStorage({user, token, location})
        } catch (error) {
            //console.log(error);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
        try {
            const {data} = await authFetch.post('/auth/login', currentUser)
            const {user, 
                //token, 
                location} = data
            dispatch({
            type: LOGIN_USER_SUCCESS,
             payload: {user, 
                //token, 
                location}
            })
           // addUserToLocalStorage({user, token, location})
        } catch (error) {
            //console.log(error);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
            
        }
        clearAlert()
    }
    
    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR})
    }

    const logoutUser = async () => {
        await authFetch.get('/auth/logout')
        dispatch({type: LOGOUT_USER})
        //removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('/auth/updateUser',currentUser)
            const {user, 
                location, 
                //token
             } = data
            dispatch({type: UPDATE_USER_SUCCESS, 
                payload:{user, 
                    location, 
                    //token
                }})
            //addUserToLocalStorage({user, location, token})
        } catch (error) {
            if(error.response.status !== 401){
                dispatch({type: UPDATE_USER_ERROR, payload:{msg:error.response.data.msg}})
            }
           
        }
        clearAlert()
    }

    const handleChange = ({name, value}) => {
        dispatch({type: HANDLE_CHANGE,
        payload:{name, value}
       }) 
       //console.log(name, value);
    }

    const clearValues = ()=>{
        dispatch({type: CLEAR_VALUES})
    }

    const createJob = async ()=>{
        dispatch({type: CREATE_JOB_BEGIN})
        try {
            const {position, company, jobLocation, jobType, status} = state
            await authFetch.post('/jobs', {
                position, company, jobLocation, jobType, status 
            })
            dispatch({type: CREATE_JOB_SUCCESS})
            clearValues()
        } catch (error) {
            if(error.response.status === 401)return
            dispatch({type: CREATE_JOB_ERROR, 
                payload:{msg:error.response.data.msg}}) 
        }
        clearAlert()
    }
   
    const getJobs = async ()=>{
        const { page, search, searchStatus, searchType, sort } = state
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search){
            url = url + `&search=${search}`
        }
        dispatch({type: GET_JOBS_BEGIN})
        try {
            const {data} = await authFetch(url)
            const {jobs, totalJobs, numOfPages} = data
            dispatch({type: GET_JOBS_SUCCESS, payload:{jobs, totalJobs, numOfPages},})
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id) =>{
        dispatch({type: SET_EDIT_JOB, payload:{id}})
    }

    const editJob = async () =>{
        dispatch({type: EDIT_JOB_BEGIN})
        try {
            const {position, company, jobLocation, jobType, status} = state
            await authFetch.patch(`/jobs/${state.editJobId}`, {position, company, jobLocation, jobType, status})
            dispatch({type: EDIT_JOB_SUCCESS})
            dispatch({type: CLEAR_VALUES})
        } catch (error) {
           if (error.response.status === 401) return
           dispatch({type: EDIT_JOB_ERROR, payload:{msg: error.response.data.msg}}) 
        }
    }

    const deleteJob = async (jobId) => {
        dispatch({type: DELETE_JOB_BEGIN})
        try {
            await authFetch.delete(`/jobs/${jobId}`)
            getJobs() 
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({type: DELETE_JOB_ERROR, payload:{msg: error.response.data.msg}}) 
         
        }
        clearAlert()
    }

    const showStats = async ()=> {
        dispatch({type: SHOW_STATS_BEGIN})
        try {
            const {data} = await authFetch('/jobs/stats')
            dispatch({type: SHOW_STATS_SUCCESS, payload: {stats: data.defaultStats, monthlyApplications: data.monthlyApplications},}) 
        } catch (error) {
           logoutUser()
        }
        clearAlert()
    }

    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS})
    }

    const changePage = (page) => {
        dispatch({type: CHANGE_PAGE, payload: {page}})
    }

    // This function stands in place of the local storage. You know how local storage stores and supplies the info on the front_end? That's this function. Coupled with the cookies.
    const getCurrentUser = async () => {
        dispatch({type: GET_CURRENT_USER_BEGIN})
        try {
            const {data} = await authFetch('/auth/getCurrentUser')
            const {user, location} = data
            dispatch({type: GET_CURRENT_USER_SUCCESS, payload:{user, location}})
        } catch (error) {
            if (error.response.status === 401) return
            logoutUser()
        }
    }

    useEffect(()=>{
        getCurrentUser()
    }, [])

       return (
        <AppContext.Provider value={{...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob, getJobs, setEditJob, deleteJob, editJob, showStats, clearFilters, changePage}}>
            {children}
        </AppContext.Provider>
    )
    
}

export {AppProvider, AppContext, initialState}