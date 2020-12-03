import React from 'react';
import { Link } from 'react-router-dom';

export default function Card (props) {
  const { homework } = props;
  // console.log(homework);

  const routeEditForm = () => {
    return (
      <div>
        <Link to = {{
          pathname: '/edit',
          aboutProps: {
            _id: homework._id
          }
        }}>
        </Link>
      </div>
    );
  }

  return (
    <div className="card mb-4 box-shadow">
      <img
        className="card-img-top"
        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
        alt={ homework.school.name }
        style={{height: 225, width: '100%', display: 'block'}}
        src={ homework.school.logo }
        data-holder-rendered="true"/>
      <div className="card-body">
        <p className="card-text">{ homework.school.address }
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" className="btn btn-sm btn-outline-secondary"><Link to = {{
              pathname: '/edit',
              aboutProps: {
                _id: homework._id
              }
            }}>
              Edit</Link></button>
            <button type="button" className="btn btn-sm btn-outline-secondary"><Link to = {{
              pathname: '/delete',
              aboutProps: {
                _id: homework._id
              }
            }}>
              Delete</Link></button>
          </div>
          <small className="text-muted">{homework.title}</small>
        </div>
      </div>
    </div>
  )
}