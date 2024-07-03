import {Link} from "./Link";

interface DashboardProps {
    cards: {
        title: string;
        size: number;
        link: string;
    }[];
}

export function Dashboard({cards}: DashboardProps) {
    const renderedCards = cards.map(({title, size, link}) => {
        return (
            <div className="col-lg-3 col-md-3" key={title}>
                <div className="card card-border">
                    <div className="card-body">
                        <h4 className="card-title">{size} <small className="text-muted">{title}</small></h4>
                    </div>
                    <div className="list-group list-group-flush">
                        <Link to={link} className="list-group-item list-group-item-primary">View All</Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="row mt-3">
            {renderedCards}
        </div>
    );
}
