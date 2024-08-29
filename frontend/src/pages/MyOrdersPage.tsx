import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication/Authcontext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MyOrdersPage() {
  const navigate = useNavigate();
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    if (myOrders.length == 0) {
      getMyOrders();
    }
  }, []);

  return (
    <Container fixed>
      <Typography sx={{ mt: 6 }} variant="h4">
        My Orders
      </Typography>
      <TableContainer sx={{ mt: 6 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No#</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Total Items</TableCell>
              <TableCell align="center">Order Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders.map((order, i) => (
              <TableRow key={order._id}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{order.address}</TableCell>
                <TableCell align="center">{order.orderItems.length}</TableCell>
                <TableCell align="center">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyOrdersPage;
