import {Link} from 'react-router-dom';
import {ReactNode} from 'react';

export interface Card {
    title: ReactNode;
    link: string;
    linkText: string;
}

interface DashboardProps {
    cards: Card[];
}

export function Dashboard({cards}: DashboardProps) {
    const renderedCards = cards.map(({title, link, linkText}, index) => {
        return (
            <div className="col-12 col-sm-8 col-md-6 col-lg-3 mb-3" key={index}>
                <div className="card card-border text-center">
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                    </div>
                    <div className="list-group list-group-flush">
                        <Link to={link} className="list-group-item list-group-item-primary">{linkText}</Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="row justify-content-center justify-content-md-start mt-3">
            {renderedCards}
        </div>
    );
}
