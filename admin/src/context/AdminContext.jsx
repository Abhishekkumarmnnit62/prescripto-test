import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors,setDoctors]= useState([]);

    const [dashData,setDashData] = useState(false)
     const [appointments, setAppointments] = useState([])


    const getAllDoctors = async () =>{
        
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/all-doctors',{headers: {aToken}})
            // console.log(data)
            if(data.success){
                
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch{
            toast.error(error.message)
        }

    }


    //Function to change doctor availability using API

    const changeAvailability = async (docId) => {
        try{
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{ docId }, {headers: {aToken}})
            console.log(data)
            console.log(aToken)
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    //getting Admin Dashboard data from Database using API

    const getDashData = async () => {
        try{
            const {data} = await axios.get(backendUrl+ '/api/admin/dashboard',{ headers: { aToken } })
            console.log(data)
            if(data.success){
                setDashData(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch{
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getDashData()
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }
    

    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }



    const value = {
        aToken,setAToken,
        backendUrl,
        doctors,getAllDoctors,
        changeAvailability,
        dashData,getDashData,
        cancelAppointment,
        appointments,getAllAppointments,
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider