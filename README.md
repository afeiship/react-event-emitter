# react-event-emitter
> Custom event utilities with lifecycle maintenance for react.


## properties:
```javascript
// add a lifecycle for event emiter:
componentAttachEvents(){
  //attach your events when ready...
}
```

## usage:
```jsx
import ReactEventEmitter from './main';

class MyEventComp extends ReactEventEmitter{

  state = {};


  componentWillMount(){
    this.myAjax();
  }

  componentAttachEvents(){
    this.whenAjaxReady();
  }

  myAjax(){
    setTimeout(()=>{
      console.log('my aajx..');
      this.fire('ajaxReady',{
        data:{
          rows:[1,2,3,4,5,6],
          total:6
        }
      });
    },2000)
  }


  whenAjaxReady(){
    this.on('ajaxReady',(data)=>{
      this.setState({data});
      console.log('my aajax data is :',data);
    })
  }

  render(){
    return <div className="test">
      <p>My Event comp...</p>
      <p>Data from remote server:->{JSON.stringify(this.state.data)}</p>
    </div>
  }
}


/*===example start===*/
class App extends React.Component{
  render(){
    return (
      <div className="hello-react-event-emitter">
        <MyEventComp />
    </div>
    );
  }
}
/*===example end===*/
```



## resource:
+ http://www.cnblogs.com/Kummy/p/4966937.html
+ https://github.com/steven5538/vue-button
+ https://yarnpkg.com/en/docs/install

