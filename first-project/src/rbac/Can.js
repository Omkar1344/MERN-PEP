import {useSelector} from "react-redux";
import {ROLE_PERMISSIONS} from "./permissions";

function Can({permission, children}){
    const user = useSelector((state)=>state.userDetails);
    const permissions = ROLE_PERMISSIONS[user?.role]||{};
    return permissions[permission] ? children:null;
}
export default Can;