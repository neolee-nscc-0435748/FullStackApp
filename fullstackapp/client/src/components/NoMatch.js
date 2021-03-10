// import {withRouter} from 'react-router-dom';

const NoMatch = (props) => {
  return (
    <>
      <h1>
        No match for <code>{props.location.pathname}</code>
      </h1>
      <h2>
        { props.foo }
      </h2>
    </>
  );
}

export default NoMatch;
// export default withRouter(NoMatch); // higher order function/component