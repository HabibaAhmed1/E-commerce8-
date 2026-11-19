import { useRef, useState} from "react";
import "./orders.css";
import {context} from './context'
import OrdersManagement from "./ordersManagement";
import OrdersTable from "./ordersTable";
function OrdersList() {
    const [isStatusOpen , setIsStatusOpen] = useState(false)
    const [status , setStatus] = useState("All Status")
    const [date , setDate] = useState("")
    const [search , setSearch] = useState("")
    const dropDownRef = useRef(null)
    
    return (
        <div className="orders">
            <div className="container">
                <context.Provider value={{
                    status , 
                    setStatus , 
                    isStatusOpen , 
                    setIsStatusOpen , 
                    date , 
                    setDate ,
                    search ,
                    setSearch ,
                    dropDownRef 
                    }}>
                    <OrdersManagement />
                    <OrdersTable />
                </context.Provider>
            </div>
        </div>
    )
}

export default OrdersList;