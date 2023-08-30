import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appContext from '../context/appContext';




export default function Profile() {

  const context = useContext(appContext);
  const { getUserDtl, user } = context;

  const usenavigate = useNavigate()


  useEffect(() => {
    if (!localStorage.getItem("vToken")) {
      alert("user not login. please login to continew")
      usenavigate('/login')
    } else {
      getUserDtl();
    }
    // eslint-disable-next-line
  }, [])

  


  return (
    <div>
      <main>

        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div className='rounded-circle overflow-hidden m-auto' style={{ width: "100px", height: "100px" }} >
                <img width={100} src={user ? `/assets/img/${user.image}` : ""} alt="img" />
              </div>
              <h1 className="fw-light">{user ? user.name : "hvygvj"}</h1>
              <p>
                <Link to="/" className="btn btn-secondary my-2">Record Video</Link>
              </p>
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}
