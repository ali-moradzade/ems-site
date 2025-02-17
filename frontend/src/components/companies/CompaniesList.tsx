import {useGetAllCompaniesQuery} from "../../store";
import {CompanyItem} from "./CompanyItem";

export function CompaniesList() {
    const {data: companies, error, isLoading} = useGetAllCompaniesQuery(undefined);

    if (isLoading) {
        return <div>Loading companies...</div>;
    }

    if (error || !companies) {
        return <div>Error getting companies</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {companies.map(company => (
                    <CompanyItem key={company.id} company={company}/>
                ))}
            </div>
        </div>
    );
}
