import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Newcontainer from "./components/Newcontainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Newcontainer
          key="general"
          country={"us"}
          category={"general"}
          pageSize={6}
        />
        
      </>
    ),
  },
  {
    path: "/Sports",
    element: (
      <>
        <Navbar />
        {/* <LoadingBar color="red" progress={100} /> */}
        <Newcontainer
          key="sports"
          country={"us"}
          category={"sports"}
          pageSize={6}
        />
      </>
    ),
  },
  {
    path: "/Health",
    element: (
      <>
        <Navbar />

        <Newcontainer
          key="health"
          country={"us"}
          category={"health"}
          pageSize={6}
        />
      </>
    ),
  },
  {
    path: "/Science",
    element: (
      <>
        <Navbar />

        <Newcontainer
          key="science"
          country={"us"}
          category={"science"}
          pageSize={6}
        />
      </>
    ),
  },
  {
    path: "/Technology",
    element: (
      <>
        <Navbar />

        <Newcontainer
          key="technology"
          country={"us"}
          category={"technology"}
          pageSize={6}
        />
      </>
    ),
  },
  {
    path: "/Entertainment",
    element: (
      <>
        <Navbar />

        <Newcontainer
          key="entertainment"
          country={"us"}
          category={"entertainment"}
          pageSize={6}
        />
      </>
    ),
  },
  {
    path: "/Business",
    element: (
      <>
        <Navbar />

        <Newcontainer
          key="business"
          country={"us"}
          category={"business"}
          pageSize={6}
        />
      </>
    ),
  },
]);

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <RouterProvider router={router} />
          {/* <Navbar />
          <Newcontainer /> */}
        </div>
      </>
    );
  }
}
