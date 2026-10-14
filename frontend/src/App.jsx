import './styles/App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Products from "./pages/Products/Products.jsx";
import Product from "./pages/Product/Product.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Login from "./pages/Login/Login.jsx";
import Admin from "./pages/Admin/Admin/Admin.jsx";
import AddProduct from "./pages/Admin/AddProduct/AddProduct.jsx";
import ManageProducts from "./pages/Admin/ManageProducts/ManageProducts.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ContactUs from "./pages/FooterLinks/Help/ContactUs/ContactUs.jsx";
import StartAReturn from "./pages/FooterLinks/Help/StartAReturn/StartAReturn.jsx";
import TrackYourOrder from "./pages/FooterLinks/Help/TrackYourOrder/TrackYourOrder.jsx";
import SizeGuide from "./pages/FooterLinks/Help/SizeGuide/SizeGuide.jsx";
import FAQ from "./pages/FooterLinks/Help/FAQ/FAQ.jsx";
import FindAStore from "./pages/FooterLinks/Shop/FindAStore/FindAStore.jsx";
import Account from "./pages/Account/Account.jsx";
import AccountRoute from "./components/ProtectedRoutes/AccountRoute.jsx";
import AdminRoute from "./components/ProtectedRoutes/AdminRoute.jsx";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/admin" element={<AdminRoute>
                <Admin/>
            </AdminRoute>}/>
            <Route path="/add-product" element={<AdminRoute>
                <AddProduct/>
            </AdminRoute>}/>
            <Route path="/manage-products" element={<AdminRoute>
                <ManageProducts/>
            </AdminRoute>}/>
            <Route path="/edit-product/:id" element={<AdminRoute>
                <AddProduct key="edit"/>
            </AdminRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/help" element={<ContactUs/>}/>
            <Route path="/returns" element={<StartAReturn/>}/>
            <Route path="/order-status" element={<TrackYourOrder/>}/>
            <Route path="/size-guide" element={<SizeGuide/>}/>
            <Route path="/faqs" element={<FAQ/>}/>
            <Route path="/stores" element={<FindAStore/>}/>
            <Route path="/account" element={<AccountRoute>
                <Account/>
            </AccountRoute>}/>

            <Route path="*" element={<NotFound/>}/>

        </Routes>
    </>)
}

export default App