import { IoIosSearch , IoIosArrowDown } from "react-icons/io";
import { useRef , useEffect , useContext } from "react";
import { context } from "./context"

function OrdersManagement() {
    // const [isStatusOpen , setIsStatusOpen] = useState(false)
    // const [status , setStatus] = useState("All Status")
    // const [date , setDate] = useState("")
    // const [search , setSearch] = useState("")
    // const dropDownRef = useRef(null)
    const {setStatus , isStatusOpen , setIsStatusOpen , date , setDate ,search ,setSearch} = useContext(context)
    const dropDownRef = useRef()
    const statuses = [
        {id: 1, title: "Pending"},
        {id: 2, title: "Processing"},
        {id: 3, title: "Shipped"},
        {id: 4, title: "Delivered"},
        {id: 5, title: "All Status"}
    ];

    useEffect(()=> {
        const handleOutside = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsStatusOpen(false)
            }
        }
        document.addEventListener("click" , handleOutside)
        return ()=> {
            document.removeEventListener("click" , handleOutside)
        }
    },[isStatusOpen])

    return (
        <>
            <div className="orders-management">
                <div className="Status">
                    <div className="head-status" ref={dropDownRef} onClick={()=> setIsStatusOpen(!isStatusOpen)}>
                        <p id="heading">All Status</p>
                        <span><IoIosArrowDown /></span>
                    </div>
                    <div className={`status ${isStatusOpen? "active" : ""}`}>
                        {statuses.map((state)=> {
                            return <li key={state.id} onClick={()=> {
                                document.getElementById("heading").innerHTML = state.title
                                setIsStatusOpen(false)
                                setStatus(state.title)
                            }}>{state.title}</li>
                        })}
                    </div>
                </div>
                <div className="Date">
                    <input type="date" className="border" value={date} onChange={(e)=> setDate(e.target.value)} />
                </div>
                <div className="orders-details">
                    <form className="search-form">
                        <input type="text" 
                        className="search" 
                        placeholder="Search By ID or Name...."
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                        <button className="search-btn bg-blue-600 text-white"><IoIosSearch /></button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OrdersManagement;