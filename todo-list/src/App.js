import React, { Component } from 'react';
import './App.css';
import "@fortawesome/fontawesome-free";
import axios from "axios";


class App extends Component {

  id = 0;
  state = {
    newTodo: '',
    todoArray: [{
      id: '',
      textTodo: '',
      done: ''
    }],
    text: {}
  }



  // keydown = x => {
  //   let input = document.getElementById("key");

  //   input.addEventListener("keydown", function (x) {
  //     x.preventDefault();
  //     if (x.keyCode === 13) {
  //       return true;
  //     } else {
  //       return false;
  //     }

  //   });
  // }

  componentDidMount() {
    axios.post('http://localhost:3000/todos')
      .then(res => this.setState({
        todoArray: res.data
      }))
  }

  todoDone = e => {
    this.setState({
      todoArray: this.state.todoArray.map(x => {
        if (e.id === x.id) {
          return ({text:x.text,id:x.id,done:true})
        
        }
        return x
      })
    })
  }

  todounDone = e => {
    this.setState({
      todoArray: this.state.todoArray.map(x => {
        if (e.id === x.id) {
          return ({ text: x.text, id: x.id, done: false })

        }
        return x
      })
    })
  }

  textToList = e => {
    if (e.key === 'Enter') {
      this.setState({
        newTodo: '',
        todoArray: this.state.todoArray.concat({
          text: e.target.value, id: ++this.id,  done: false
        }
        )
      })
    }
  }

  render() {
    return (
      <div className="App">

        <div className="control" action="submit">
          <input id="key" type="text" placeholder="type your todo" onKeyDown={this.textToList}
          />

        </div>

        <div className="all">
          <tr>
            {this.state.todoArray.filter(x => x.done === false)
            .map(x => {
              return (<div className="list">
                <td className="listTD">{x.text}</td>
                <i className="far fa-check-square"></i>
                <input className="listInput" type="checkbox" onClick={() => this.todoDone(x)}/>
              </div>
              )
            }
            )}
            <p>Done</p>
            {this.state.todoArray.filter(x => x.done === true)
              .map(x => {
                return (<div className="list">
                  <td className="listTD1">{x.text}</td>
                  <i className="far fa-check-square"></i>
                  < input className = "listInput1"
                  type = "checkbox"
                  onClick = {
                    () => this.todounDone(x)
                  }
                  />
                </div>
                )
              }
              )}
          </tr>
        </div>


      </div>
    );
  }
}

export default App;
