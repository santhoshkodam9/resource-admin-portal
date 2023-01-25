import {useState } from "react";
import { NavBar } from "./HomePage";
import ReactPaginate from "react-paginate";
import { Cards } from "./Cards";
const Resources = (props) => {

  const [page, setPage] = useState(0);
  const resourcesPerPage = 6;
  const numberOfResourcesVistited = page * resourcesPerPage;
  const totalPages = Math.ceil(props.dataRecords.length / resourcesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card-deck">
          {
            props.dataRecords.slice(numberOfResourcesVistited,numberOfResourcesVistited + resourcesPerPage)
            .map((r) => <Cards res ={r} key={r.id}/>)
          }
        </div>
      </div>
        {
          !props.dataRecords.length && (
            <div className="alert alert-danger"style= { { width: 1000, textAlign: "center", margin:"auto"}} ><strong>No records Found</strong></div>
          )
        }
        {
          !props.dataRecords.length || (
            <ReactPaginate previousLabel={"Prev"} nextLabel={"Next"} pageCount={totalPages} onPageChange={changePage} containerClassName={"navigationButtons"}
            previousLinkClassName={"previousButton"} nextLinkClassName={"nextButton"} disabledClassName={"navigationDisabled"}activeClassName={"navigationActive"}/>
          )
        }
    </div>
  );
};

export { Resources }