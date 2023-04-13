import React from "react";
import QuestionPopUp from "./components/questionPopUp";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      score: 0,
      isOpenPopUp: false,
      display: "block",
      ques: [
        ["#fff", "#000", false],
        ["#fff", "#000", false],
        ["#fff", "#000", false],
        ["#fff", "#000", false],
        ["#fff", "#000", false],
        ["#fff", "#000", false],
      ],
      totalAnswered: 0,
      totalTrueAnswer: 0,
      totalTime: 0,
    }
  }

  openPopUp = (option) => {
    this.setState({
      option: option,
      isOpenPopUp: true,
      display: "none",
    })
  }

  closePopUp() {
    let tempTotalAnswer = this.state.totalAnswered + 1
    this.setState({
      isOpenPopUp: false,
      display: "block",
      totalAnswered: tempTotalAnswer,
    })
  }

  setStatus = (status, time) => {
    let tempArray = [];
    let currentTrue = this.state.totalTrueAnswer;
    let countedTime = this.state.totalTime + time;

    if (status === true) {
      currentTrue += 1;
    }

    for (let index = 0; index < this.state.ques.length; index++) {
      if (index === this.state.option && status === true) {
        tempArray.push(["rgb(0, 202, 24)", "#fff", true]);
      }
      else if (index === this.state.option && status === false) {
        tempArray.push(["red", "#fff", true]);
      }
      else {
        tempArray.push(this.state.ques[index]);
      }
    }

    this.setState({
      ques: tempArray,
      totalTrueAnswer: currentTrue,
      totalTime: countedTime,
      status: status
    })
  }

  componentDidUpdate() {
    let audioTrue = document.getElementById("Player-True");
    let audioFail = document.getElementById("Player-Fail");
    if (
      this.state.totalAnswered !== 0 &&
      this.state.totalAnswered <= 5 &&
      this.state.status === true) {
        audioTrue.play();
    } else if (
      this.state.totalAnswered !== 0 &&
      this.state.totalAnswered <= 5 &&
      this.state.status === false) {
        audioFail.play();
    }
  }



  render() {
    return (
      <>
        <div id="wrap-page">

          <img id="background" src="./assets/images/interface/background_dever.png" loading="lazy" alt="background" />

          <div id="navigation">
            <div id="wrap-logo-dever">
              <a href="https://www.facebook.com/FPTUDever">
                <img id="logo_dever" src="./assets/images/interface/logo_dever_light.png" loading="lazy" alt="logo dever" />
              </a>
            </div>
            <img id="logo_fpt" src="./assets/images/interface/logo_fpt.png" loading="lazy" alt="logo fpt university" />
          </div>

          <p id="score">Score: {this.state.score}</p>

          {
            // check if done ques or not
            (this.state.totalAnswered < 6) &&
            <div id='wrap-select-level' style={{ display: `${this.state.display}` }}>

              {
                (this.state.totalAnswered !== 0 && this.state.status === true) &&
                <audio id="Player-True">
                  <source src={"./assets/audios/wow.wav"} type="audio/mp3"></source>
                </audio>
              }
              {
                (this.state.totalAnswered !== 0 && this.state.status === false) &&
                <audio id="Player-Fail">
                  <source src={"./assets/audios/fail.wav"} type="audio/mp3"></source>
                </audio>
              }

              <h3>Select level</h3>
              <div id="levels">
                <div className="level" style={{ backgroundColor: this.state.ques[0][0], color: this.state.ques[0][1] }}>
                  <div onClick={() => this.openPopUp(0)} className="decor-level" >
                    Level 1
                  </div>
                  {
                    this.state.ques[0][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>

                <div className="level" style={{ backgroundColor: this.state.ques[1][0], color: this.state.ques[1][1] }}>
                  <div onClick={() => this.openPopUp(1)} className="decor-level" >
                    Level 2
                  </div>
                  {
                    this.state.ques[1][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>

                <div className="level" style={{ backgroundColor: this.state.ques[2][0], color: this.state.ques[2][1] }}>
                  <div onClick={() => this.openPopUp(2)} className="decor-level" >
                    Level 3
                  </div>
                  {
                    this.state.ques[2][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>

                <div className="level" style={{ backgroundColor: this.state.ques[3][0], color: this.state.ques[3][1] }}>
                  <div onClick={() => this.openPopUp(3)} className="decor-level" >
                    Level 4
                  </div>
                  {
                    this.state.ques[3][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>

                <div className="level" style={{ backgroundColor: this.state.ques[4][0], color: this.state.ques[4][1] }}>
                  <div onClick={() => this.openPopUp(4)} className="decor-level" >
                    Level 5
                  </div>
                  {
                    this.state.ques[4][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>

                <div className="level" style={{ backgroundColor: this.state.ques[5][0], color: this.state.ques[5][1] }}>
                  <div onClick={() => this.openPopUp(5)} className="decor-level" >
                    Level 6
                  </div>
                  {
                    this.state.ques[5][2] &&
                    <div className="disable-btn"></div>
                  }
                </div>
              </div>
            </div>
          }

          {
            // open pop up
            (this.state.isOpenPopUp) &&
            <QuestionPopUp setResult={(status, time) => this.setStatus(status, time)} level={this.state.option} setQues={Math.floor(Math.random() * 4)} closeFunc={() => this.closePopUp()} />
          }

          {
            // all questions done, display result
            (this.state.totalAnswered === 6) &&
            <div id="done-popUp">
              <h1>Congratulation!</h1>
              <p>Result: {this.state.totalTrueAnswer}/6</p>
              <p>Time taken: {this.state.totalTime} seconds</p>
            </div>
          }

        </div>
      </>
    )
  }
}