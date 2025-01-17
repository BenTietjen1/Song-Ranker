import React from 'react';
import '../index.css'

function Home () {
  return (
    <div
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        flexGrow: 1,
        display: 'flex',
      }}
    >
        <div>
          <h3 className="page-title">
            Welcome to Song Ranker! This is a work in progress...<br />Click on any of the artists up top to get started :D
          </h3>

        </div>
        <footer className="footer">
        </footer>
    </div>
  )
}

export default Home;