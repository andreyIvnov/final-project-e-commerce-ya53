import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../Styles/AdminModeInfo.css";
import { getAllDocsByCollectionName } from "../Helpers/fdbManager";

function AdminModeInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userR.user);
  const products = useSelector((state) => state.productR.products)

  useEffect(() => {
    const fetchData = async () => {

      const categoriesResponse = await getAllDocsByCollectionName("categories");
      if (categoriesResponse && categoriesResponse.length > 0) {
        dispatch({ type: "SET_CATEGORIES", payload: categoriesResponse });
      }

      const customersResponse = await getAllDocsByCollectionName("users");
      if (customersResponse && customersResponse.length > 0) {
        dispatch({ type: "SET_USERS", payload: customersResponse });
      }

      const cartsResponse = await getAllDocsByCollectionName("carts");
      if (cartsResponse && cartsResponse.length > 0) {

        const cartsDataToSet = cartsResponse.map(cart => {
          if (cart.userId && cart.products) {
            const prods = [];
            cart.products.map(prodId => {
              const existedProdIntoRedox = products.find(prod => prod.id === prodId);
              if (existedProdIntoRedox) {
                const indexofExistedProduct = prods.findIndex(prodFromShowedList => existedProdIntoRedox.id === prodFromShowedList.id)
                if (indexofExistedProduct !== -1) {
                  prods[indexofExistedProduct] = { ...prods[indexofExistedProduct], count: prods[indexofExistedProduct].count + 1 };
                }
                else {
                  prods.push({ ...existedProdIntoRedox, count: 1 })
                }
              }
            })

            return {
              userId: customersResponse.find(user => user.id === cart.userId),
              products: prods,
              createdOn: cart.createdOn
            }
          
          }
        })
        dispatch({ type: "SET_CARTS", payload: cartsDataToSet});
      }

      const productsResponse = await getAllDocsByCollectionName("products");
      if (productsResponse && productsResponse.length > 0) {
        const productsDataToSet = productsResponse.map(prod => {
          if (prod.categoryId) {
            const category = categoriesResponse.find(cat => cat.id === prod.categoryId)
            if (category) {
              return { ...prod, categoryId: category }
            } else {
              return prod;
            }
          } else {
            return prod;
          }
        })

        dispatch({ type: "SET_PRODUCTS", payload: productsDataToSet });
      }
    }

    fetchData();

    navigate("categories");
  }, []);

  const navItems = [
    { label: "Categories", path: "categories" },
    { label: "Products", path: "products" },
    { label: "Customers", path: "customers" },
    { label: "Statistics", path: "statistics" }
  ];

  return (
    <div className="admin-bg">
      <div className="admin-header">Hello, {user.firstName}</div>
      <nav className="admin-navbar">
        {navItems.map(item => (
          <button
            key={item.path}
            className="admin-nav-btn"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <hr className="admin-divider" />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminModeInfo;