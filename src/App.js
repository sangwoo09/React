//import logo from './logo.svg';
//import './App.css';
import { Component } from 'react';
import ReadContents from './components/ReadContents';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContents from './components/CreateContents';
import UpdateContents from './components/UpdateContents';

class App extends Component {
  constructor(props){
      super(props);
      this.max_contents_id=3;
      this.state = {
        mode:'welcome',
        selected_contents_id:2,
        subject:{title:'위버스 게시판', sub:'게시판'},
        welcome:{title:'welcome', desc:'Hello React!!'},
        contents:[
          {id:1, title:'HTML', desc:'HTML is for information'},
          {id:2, title:'CSS', desc:'CSS is for design'},
          {id:3, title:'JavaScritpt', desc:'JavaScript is for interactive'}
        ]
      }
  }
  getReadContents(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id == this.state.selected_contents_id){
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContents(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContents title={_title} desc={_desc}></ReadContents>
    }else if(this.state.mode === 'read'){
      var _contents = this.getReadContents();
      _article = <ReadContents title={_contents.title} desc={_contents.desc}></ReadContents>
    }else if(this.state.mode === 'create'){
      _article = <CreateContents onSubmit={function(_title, _desc){
          this.max_contents_id = this.max_contents_id + 1;
          var _contents = Array.from(this.state.contents);
          _contents.push(
             {id:this.max_contents_id, title:_title, desc:_desc}
             )
              this.setState({
               contents:_contents,
               mode:'read',
               selected_contents_id:this.max_contents_id
             });
      }.bind(this)}></CreateContents>
    }else if(this.state.mode === 'update'){
      _contents = this.getReadContents();
      _article = <UpdateContents data={_contents} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
      }.bind(this)}></UpdateContents>
    }
    return _article;
  }
  //state 처리는 render 밖
  //이벤트 처리는 render 안
  render(){
    console.log('App render');
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC 
         onChangePage = {function(id){
            this.setState({
              mode:'read',
              selected_contents_id:Number(id)
            });
         }.bind(this)}
          data = {this.state.contents}
        ></TOC>
        <Control onChangeMode = {function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really??')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_contents_id){
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!!');
            }
          }else{
            this.setState({
              mode:_mode
            })
          }
        }.bind(this)}></Control>
        {this.getContents()}
      </div>
    );
  }
}

export default App;
