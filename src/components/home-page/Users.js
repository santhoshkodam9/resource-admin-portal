import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Cards } from "./Cards";
import { NavBar } from "./HomePage";

const Users = (props) => {

  const [page, setPage] = useState(0);
  const filteredRescource =  props.dataRecords.filter((obj) => obj.tag === "user");
  const resourcesPerPage = 6;
  const numberOfResourcesVistited = page * resourcesPerPage;
  const totalPages = Math.ceil(filteredRescource.length / resourcesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card-deck">
          {
            filteredRescource.slice(numberOfResourcesVistited,numberOfResourcesVistited + resourcesPerPage)
                             .map((r)=><Cards res ={r} key={r.id}/>)
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

export { Users }