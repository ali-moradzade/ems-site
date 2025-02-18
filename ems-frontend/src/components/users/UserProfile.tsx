import {useAppSelector} from "../../store";

export function UserProfile() {
    const user = useAppSelector(state => state.auth.user);

    if (!user) {
        return (
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
                    <div className="col-12 col-md-6 col-lg-4 text-center">
                        <h2>User Information Unavailable</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">User Profile</h2>
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                            <tbody>
                                <tr>
                                    <th scope="row">Id</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First Name</th>
                                    <td>{user.firstName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Name</th>
                                    <td>{user.lastName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
