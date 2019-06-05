import cx from 'classnames';
import React, { Component } from 'react';
import ReactDragList from 'react-drag-list';
import './Todo.css';


export default class TodoList extends Component {

  state = {
      todo: []
  };

    render() {
        let remaining = 0;
        this.state.todo.forEach((t, i) => {
            let unUsed = t.isDone? null:remaining++;
        });


        return (
            <>
                <div className={'container'}>
                <div>
                    <h2>
                        Todo List
                    </h2>
                </div>
                <div>
                <input placeholder="New task" ref={(input) => this.textInput = input}/>
               <button onClick={()=>{this.addTodo()}}>Add</button>
               </div>
                <div>
                    <p className={'task-counter'}>{remaining} remaining out of {this.state.todo.length} tasks</p>
                </div>
                <ReactDragList
                    dataSource={this.state.todo}
                    rowKey="task"
                    row={(t, i) => (
                      <div
                      key={i}
                      className={'card'}
                      onClick={()=> {this.toggle(i);}}
                      >
                        <p
                        style={{padding: '8px'}}
                        className={t.isDone? "is-done": null}> {t.task} </p>
                      </div>
                    )}
                    handles={false}
                    className="simple-drag"
                    rowClassName="simple-drag-row"
                    onUpdate={(evt, newArr) => {this._handleUpdate(newArr)}}
                  />
                  </div>
            </>
        );
    }

    addTodo() {
        if (this.textInput.value.length === 0)
            return;
        let tmp = this.state.todo.slice();
        tmp.push({task: this.textInput.value, isDone: false});
        this.textInput.value = "";
        this.setState({todo: tmp});
    }


    _handleUpdate(newArr) {
      let tmp = newArr.slice();
      console.log(tmp);
      this.setState({todo: tmp});
    }

    toggle(index) {
        let tmp = this.state.todo.slice();
        tmp[index].isDone = !tmp[index].isDone;
        this.setState({todo:tmp});
    }

}
