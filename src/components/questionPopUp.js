import React from "react";

const answer = [
    [
        [['A, Int a = 3;', 'B, int = 3;', 'C, int a = 3;', 'D, int a = 3.0;'], "How to declare an integer variable in C++?", 1],
        [['A, Use <!-- -->', 'B, Use /* */', 'C, Use #', 'D, Use **'], "How to comment in C++?", 1],
        [['A, System.out.println("Hello World");', 'B, print("Hello World");', 'C, cout<<"Hello world";', 'D, printf("Hello World");'], "What's correct format to print string to screen?", 2],
        [['A, #include<stream>', 'B, #include<iostream>', 'C, #include<io.h>', 'D, #include<stdlib.h>'], "Which header file lets us work with input and output objects?", 1],
    ],
    [
        [['A, 3', 'B, 2', 'C, 1', 'D, 0'], "What's output of the program?", 3],
        [['A, int sum == 0;', 'B, No error', 'C, endl', 'D, return 0;'], "What's the error of the code above?", 0],
        [['A, 1 2', 'B, 1 1', 'C, 2 2', 'D, 2 1'], "What's value of a, b after code above execute?", 2],
        [['A, Error', 'B, 3', 'C, 2', 'D, 4'], "What's output of the program?", 0],
    ],
    [
        [['A, 0', 'B, 1', 'C, 2', 'D, Error'], "What's output of the program?", 2],
        [['A, number % 2 != 0', 'B, number % 2 == 0', 'C, number % 3 == 0', 'D,number == odd'], "What's condition in if to check odd number", 0],
        [['A, lack of ;', "B, can't assign value with ==", "C, can't print value with cin", 'D, all of other choices'], "What cause error in the code above?", 3],
        [['A, remove line 7', 'B, remove line 8', "C, remove line 8 and 9", 'D, remove only line 8 or 9'], "Remove a line to print out value x = 3", 3],
    ],
    [
        [['A, int a = a == 1;', 'B, int a + b = 1;', 'C, int b = a ** 2;', 'D, int -a = 1;'], "What's the valid code?", 0],
        [['A, int func();', 'B, void func();', 'C, char func();', 'D, float func();'], "What's the function can't return a value?", 1],
        [['A, if (1) { ... }', 'B, else (1 > 0) { ... }', 'C, ifelse (0) { ... }', 'D, elseif (1) { ... }'], "What's the valid code?", 0],
        [['A, break;', 'B, continue;', 'C, exit;', 'D, escape;'], "What's the keyword to exit loop?", 0],
    ],
    [
        [['A, Hello', 'B, Hello Hi', 'C, HelloHi', 'D, Hi'], "What's output of the program?", 0],
        [['A, 5 9', 'B, 9 9', 'C, 5 5', 'D, 9 5'], "What's output of the program?", 0],
        [['A, Condition is true', 'B, Condition is false', 'C, Compiler error', 'D, Runtime error'], "What's the error of the code above?", 1],
        [['A, 2-5-1-3-4', 'B, 1-2-3-5-4', 'C, 2-5-4-3-1', 'D, 5-4-3-2-1'], "What's correct order of program?", 2],
    ],
    [
        [['A, Yêu', 'B, Rất yêu', 'C, Rất rất yêu', 'D, Không hề'], "Bạn có yêu FPT không?", 2],
        [['A, Yêu', 'B, Rất yêu', 'C, Rất rất yêu', 'D, Không hề'], "Bạn có yêu FPT không?", 2],
        [['A, Yêu', 'B, Rất yêu', 'C, Rất rất yêu', 'D, Không hề'], "Bạn có yêu FPT không?", 2],
        [['A, Yêu', 'B, Rất yêu', 'C, Rất rất yêu', 'D, Không hề'], "Bạn có yêu FPT không?", 2],
    ],
]

export default class QuestionPopUp extends React.Component {

    constructor() {
        super();
        this.state = {
            countdown: 30,
            cliked: false,
        }
    }

    componentDidMount() {
        let intvl = setInterval(() => {
            let tempCountdown = this.state.countdown - 1;
            if (tempCountdown === 0) {
                this.props.setResult(false, 30);
                this.props.closeFunc();
                clearInterval(intvl);
            }
            this.setState({
                countdown: tempCountdown,
            })
        }, 1000)
    }

    handClick = (key) => {
        this.setState({
            cliked: true,
        })
        let status;
        if (key === answer[this.props.level][this.props.setQues][2]) {
            status = true;
        }
        else {
            status = false;
        }
        this.props.setResult(status, 30 - this.state.countdown);
        this.props.closeFunc();
    }

    render() {
        let sourse = `./assets/images/error/${[this.props.level]}.${this.props.setQues}.png`;
        return (
            <>
                <div id="wrap-pop-up">
                    {
                        (this.props.level !== 0 && this.props.level !== 3) &&
                        <img className="question" loading="lazy" alt="question" src={sourse} />
                    }
                    <h3 style={{ color: "#fff" }}>{answer[this.props.level][this.props.setQues][1]}</h3>
                    <div id="wrap-answer">
                        {
                            answer[this.props.level][this.props.setQues][0].map((option, key) =>
                                <div onClick={() => this.handClick(key)} className="option" key={key}>{option}</div>)
                        }
                    </div>
                    <h1 id="countdown">{this.state.countdown}</h1>
                </div>
                <audio id="Player" autoPlay={true} loop>
                    <source src={"./assets/audios/countdown_2.wav"} type="audio/mp3"></source>
                </audio>
            </>
        );
    }
}