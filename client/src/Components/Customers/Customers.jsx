
import { useSelector } from "react-redux";
import "../../Styles/Customers.css";
import { useState, useEffect  } from "react";
import GenericTable from "../GenericTable";

function Customers() {
  const users = useSelector((state) => state.userR.users);
  const carts = useSelector((state) => state.cartR.carts);

  const [usersTableData, setUsersTableData] = useState([]);

  const columnsToUsersTable = [
    { label: "Full Name", fieldName: "userFullName" },
    { label: "Joined At", fieldName: "createdOn" },
    { label: "Products Bought", fieldName: "productsBought" },
  ]

  const columnsToCartsTable = [
    { label: "Product", fieldName: "productName" },
    { label: "Qty", fieldName: "quantity" },
    { label: "Date", fieldName: "boughtOn" },
  ]

  useEffect(() => {

    setUsersTableData(users.map(u => {
      const cart = carts.find(cart => u.id === cart.userId.id)
      return {
        id: u.id,
        userFullName: `${u.firstName} ${u.lastName}`,
        createdOn: u.createdOn.toDate().toLocaleDateString(),
        productsBought: cart ?
          <GenericTable
            columns={columnsToCartsTable}
            data={
              cart.products.map(prod => {
                return {
                  id: prod.id,
                  productName: prod.title,
                  quantity: prod.count,
                  boughtOn: cart.createdOn.toDate().toLocaleDateString(),
                }
              })
            }
          /> : null
      };
    }));

  }, [users])


  return (
    <div className="customers-outer">
      <div className="customers-box">
        <div className="customers-title">Customers</div>
        <div>
          <GenericTable columns={columnsToUsersTable} data={usersTableData} />
        </div>
      </div>
    </div>
  );
}

export default Customers