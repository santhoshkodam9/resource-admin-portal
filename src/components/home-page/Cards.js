export const Cards = (props) => {

    return (
        <div className="card" key={props.res.id}>
          <div className="card-top">
            <div className="card-image-container">
              <img src={props.res.icon_url} className="card-img" alt="" />
            </div>
            <div className="card-top-contents">
              <h5 className="cards-title">{props.res.title}</h5>
              <p className="card-text">{props.res.category}</p>
            </div>
          </div>
          <div className="card-body">
            <a href={props.res.link} className="card-link">{props.res.link}</a>
            <p className="card-description">{props.res.description}</p>
          </div>
        </div>
 )}