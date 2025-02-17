import {Company} from "../../store";

interface CompanyItemProps {
    company: Company;
}

export function CompanyItem({company}: CompanyItemProps) {
    const {name, description, logo} = company;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm border-0 rounded">
                <div className="d-flex justify-content-center mt-3">
                    <img src={logo} alt={name} className="img-fluid rounded-circle"
                         style={{width: '80px', height: '80px', objectFit: 'cover'}}/>
                </div>

                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{name}</h5>
                    <p className="card-text text-muted">{description}</p>
                    <a href="#" className="btn btn-primary btn-sm">View Details</a>
                </div>
            </div>
        </div>
    );
}
