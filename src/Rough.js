import { React, useState, useEffect, Component, createContext } from 'react';
import { Container, Form, Row, Label, InputGroup, Col, FormControl, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import Switch from '@mui/material/Switch';

export const ThemeContext = createContext(null);

function Rough() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {

    // alert(theme);

    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  

  useEffect(() => {
    const data = window.localStorage.getItem("myColor");
    // console.log('data', data)
    if (data !== null ) setTheme(data);
  }, []);



  useEffect(() => {
    window.localStorage.setItem("myColor", theme);
  }, [theme]);



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

    <ThemeContext.Provider value={{ theme, toggleTheme }}>


    <div className="App" id={theme}>

      {/* <button onClick={getData}>Button</button> */}

      {/* {record.login} */}


      <Switch onChange={toggleTheme}  color="secondary" />

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


              {record.login && (

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

    </ThemeContext.Provider>
  );
}

export default Rough;
