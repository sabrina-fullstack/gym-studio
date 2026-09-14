export default function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p className="page-subtitle">The project and the developer</p>

      <div className="about-section">
        <h2>The system</h2>
        <p>
          This application manages studio classes for a gym chain spread across
          several cities. It is built on a PostgreSQL database hosted on Neon, a
          REST API written with Node.js and Express in TypeScript, and a React
          interface, also in TypeScript.
        </p>
      </div>

      <div className="about-section">
        <h2>The developer</h2>
        <p>
          Project built by Sabrina as part of a full-stack development course.
          It covers the design of a relational database, the development of a
          RESTful service and the creation of a user interface with React.
        </p>
      </div>
    </div>
  );
}
