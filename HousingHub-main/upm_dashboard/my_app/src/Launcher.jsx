import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Adminhome from './Pages/Admin/Adminhome';
import Addowner from './Pages/Admin/Addowner';
import Ownerlist from './Pages/Admin/Ownerlist';
import Login from './Pages/Login/Login';
import Buildinglist from './Pages/Admin/Buildinglist';
import Builderhome from './Pages/Builder/Builderhome';
import AddAdmin from './Pages/Builder/Addadmin';
import AddBuilding from './Pages/Builder/Addbuilding';
import Adminlist from './Pages/Builder/Adminlist';
import BuildersBuildingList from './Pages/Builder/BuilddersBuildinglist';
import AddFlat from './Pages/Builder/Add flat';
import Ownerhome from './Pages/Owner/Ownerhome';
import AddTenant from './Pages/Owner/Addtenant';
import GetFlatListOfOwner from './Pages/Owner/Getflatlistofowner';
import ViewProfileall from './Components/Viewprofileall';
import AssignBuildingToAdmin from './Pages/Builder/AssignAdminToBuilding';
import GetFlatList from './Pages/Admin/GetFlatList';
import SuperAdmin from './Pages/SuperAdmin/SuperAdminHome';
import AddBuilder from './Pages/SuperAdmin/AddBuilder';
import UpdateProfile from './Components/Updateprofile';
import ViewTenantProfile from './Pages/Owner/ViewTenantProfileFromFlat';
import AssignUtilityToTenant from './Pages/Owner/AssignUtilityToTenant';
import GetUtilityList from './Pages/Owner/GetUtilityList';
import TenantHome from './Pages/Tenant/Tenanthome';
import GetUtilityListOfTenant from './Pages/Tenant/GetUtilityOfTenant';
import RentPayment from './Pages/Tenant/RentPayment';
import { ToastContainer } from 'react-toastify';

function Launcher() {
    return (<>
        <Router>
            <Routes>
                <Route exact path='/' Component={Homepage} />
                <Route exact path='/ADMIN' Component={Adminhome} />
                <Route exact path='/ADMIN/addowner' Component={Addowner} />
                <Route exact path='/ADMIN/ownerlist' Component={Ownerlist} />
                <Route exact path='/ADMIN/buildinglist' Component={Buildinglist} />

                <Route exact path='/login' Component={Login} />
                <Route exact path='/viewprofileall' Component={ViewProfileall} />
                <Route exact path='/updateprofile' Component={UpdateProfile} />


                <Route exact path='/BUILDER' Component={Builderhome} />
                <Route exact path='/BUILDER/addadmin' Component={AddAdmin} />
                <Route exact path='/BUILDER/addbuilding' Component={AddBuilding} />
                <Route exact path='/BUILDER/Adminlist' Component={Adminlist} />
                <Route exact path='/BUILDER/buildinglist' Component={BuildersBuildingList} />
                <Route exact path='/BUILDER/addflat' Component={AddFlat} />
                <Route exact path="/getflatlist/:id" Component={GetFlatList} />
                <Route exact path='/assign_building/:id' Component={AssignBuildingToAdmin} />

                <Route exact path='/OWNER' Component={Ownerhome} />
                <Route exact path='/OWNER/addtenant' Component={AddTenant} />
                <Route exact path='/OWNER/flatlist' Component={GetFlatListOfOwner} />
                <Route exact path='/viewtenantprofile/:id' Component={ViewTenantProfile} />
                <Route exact path='/assignUtility' Component={AssignUtilityToTenant} />
                <Route exact path='/getUtilityList/:id' Component={GetUtilityList} />

                <Route exact path='/TENANT' Component={TenantHome} />
                <Route exact path='/getUtilityListOfTenant' Component={GetUtilityListOfTenant} />
                <Route exact path='/payRent/:id' Component={RentPayment} />


                <Route exact path='/SUPERADMIN' Component={SuperAdmin} />
                <Route exact path='/SUPERADMIN/addbuilder' Component={AddBuilder} />



            </Routes>
        </Router>
        <ToastContainer />
        </>);
}
export default Launcher;