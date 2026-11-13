import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { context } from "./context"
function OrdersTable() {
    const {status , date , search } = useContext(context)
    const orders = [
        {
            id: 1,
            name: "Habiba",
            date: "2025-01-05",
            status: "Pending",
            action: "View"
        },
        {
            id: 2,
            name: "Abdelrahman",
            date: "2025-01-10",
            status: "Processing",
            action: "View"
        },
        {
            id: 3,
            name: "Aya",
            date: "2025-01-15",
            status: "Shipped",
            action: "View"
        },
        {
            id: 4,
            name: "Heba",
            date: "2025-01-20",
            status: "Delivered",
            action: "View"
        },
        {
            id: 5,
            name: "Sally",
            date: "2025-01-25",
            status: "Cancelled",
            action: "View"
        },
        {
            id: 6,
            name: "Zaineb",
            date: "2025-01-30",
            status: "Delivered",
            action: "View"
        },
        {
            id: 7,
            name: "Haitham",
            date: "2025-02-05",
            status: "Processing",
            action: "View"
        },
        {
            id: 8,
            name: "Eslam",
            date: "2025-02-10",
            status: "Pending",
            action: "View"
        },
    ];


    return (
        <>
            <div className="orders-table">
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="heading">
                            <TableRow>
                                <TableCell className="tableCell">Tracking ID</TableCell>
                                <TableCell className="tableCell">Customer</TableCell>
                                <TableCell className="tableCell">Date</TableCell>
                                <TableCell className="tableCell">Status</TableCell>
                                <TableCell className="tableCell">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.filter(r => ((status == "All Status" || r.status == status) && 
                            (date == "" || r.date == date)) && 
                            (r.name.toLowerCase() == search || r.id == search || search == "")).map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="tableCell">{order.id}</TableCell>
                                    <TableCell className="tableCell">{order.name}</TableCell>
                                    <TableCell className="tableCell">{order.date}</TableCell>
                                    <TableCell className="tableCell">
                                        <span className={`status ${order.status}`}>{order.status}</span>
                                    </TableCell>
                                    <TableCell className="tableCell cursor-pointer">
                                        <span className={`actions ${order.action}`}>{order.action}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default OrdersTable;