import React from "react";

const Test = () => {
  return (
    <Container>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      <div className="dash-Buttons">
        <Button href="/edit-profile" color="light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Button>
        <Button href="/add-experince" color="light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Button>
        <Button href="/add-education" color="light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Button>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
      <Table hover>
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tech Guy Web Solutions</td>
            <td className="hide-sm">Senior Developer</td>
            <td className="hide-sm">02-03-2009 - 01-02-2014</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>Traversy Media</td>
            <td className="hide-sm">Instructor & Developer</td>
            <td className="hide-sm">02-03-2015 - Now</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <h2 className="my-2">Education Credentials</h2>
      <Table hover>
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Northern Essex</td>
            <td className="hide-sm">Associates</td>
            <td className="hide-sm">02-03-2007 - 01-02-2009</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="my-2">
        <Button color="danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </Button>
      </div>
    </Container>
  );
};

export default Test;
