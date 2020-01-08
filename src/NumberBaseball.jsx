import React, { Component } from 'react'
import Try from './Try'

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
    array.push(chosen);
  }
  return array;


}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: []
  };

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState({
        result: '홈런!',
        tries: [...tries, { try: value, result: '홈런!' }],
      })
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
    } else { // 답이 틀렸을 경우
      const answerArray = value.split('').map((v) => parseInt(v))
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10회 이상 틀린경우
        this.setState({
          result: `10번의 기회를 모두 소진하였습니다. 정답: ${answer.join(',')}`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...tries, { try: value, result: `${strike} 스트라이크 ${ball} 볼 입니다.` }],
          value: '',
        })
      }

    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
          <div>시도 : {tries.length}</div>
          <ul>
            {tries.map((v, i) => {
              return (
                <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
              )
            })}

          </ul>
      </>
        );
      }
    }
    
export default NumberBaseball;