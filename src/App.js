import { React, useState, useEffect, Component } from 'react';
import { Container, Form, Row, Label, InputGroup, Col, FormControl, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

function App() {


  const [user, setUser] = useState("");
  const [record, setRecord] = useState("");
  const [repos, setRepos] = useState("");




  const getData = async (e) => {
    e.preventDefault();
    // alert(user);


    /////////////////////

    await axios.get(`https://api.github.com/users/${user}`)
      .then(
        (res) => {
          console.log(res);
          setRecord(res.data);
        }
      )
      .catch((error) => {
        if (error.response.status === 404) {
          alert('User not found.');
        }
      });

    ///////////////////

    await axios.get(`https://api.github.com/users/${user}/repos`, {
      params: {
        per_page: 4,
        sort: 'updated'
      }
    })
      .then(
        (res) => {
          setRepos(res.data);
        }
      )

  }




  return (
    <div className="App">




      {/* <button onClick={getData}>Button</button> */}



      {/* {record.login} */}

      <Container>
        <Row className="justify-content-md-center">


          <Row className="align-items-center">


            <Col md="4">

              <form className='post__commentBox'>
                <input className='post__input' type="text"
                  placeholder="Username"
                  onChange={(e) => setUser(e.target.value)}
                />

                <button className="post__button"
                  // disabled={!comment}
                  // type="submit"
                  onClick={getData}
                >
                  Search
                </button>

              </form>


              {!record.login ? (<h1></h1>) : (

              <div className="users">

                <div>
                  <img className="users__image" src={record.avatar_url} />
                </div>

                Username - {record.login}
                <br />
                Followers - {record.followers}
                <br />
                Repositories Count - {record.public_repos}


              </div>

  )
  }

              {repos &&
                repos.map((item) => {
                  return (

                    <div key={item.id} className="repos">

                     

                      Repository - {item.name}
                      <br />
                      Stars - {item.stargazers_count}
                      <br />
                      Forks - {item.forks}


                    </div>

                  );
                })}


              

            </Col>

          </Row>







        </Row>

      </Container>





    </div>
  );
}

export default App;
