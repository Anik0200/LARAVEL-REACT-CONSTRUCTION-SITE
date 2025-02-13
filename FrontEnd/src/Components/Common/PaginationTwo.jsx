import React from "react";
import './Pagination.css'


const PaginationTwo = ({ data, setPage }) => {

    const handlePageClick = (link) => {
        if (!link.url) return;
        const url = new URL(link.url);
        setPage(Number(url.searchParams.get("page")));
    };

    return (
        <ul className="pagination">
            {data.links.map((link, index) => (
                <li key={index} className="page-item">
                    <a style={{ cursor: "pointer" }}
                        className={`page-link ${link.active ? 'active' : ''}`}
                        onClick={() => handlePageClick(link)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></a>
                </li>
            ))}
        </ul>
    );
}

export default PaginationTwo
