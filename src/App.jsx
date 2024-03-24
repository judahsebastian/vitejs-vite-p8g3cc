import React, { useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import ReactStopwatch from 'react-stopwatch';
import toast, { Toaster } from 'react-hot-toast';
const data = {
  across: {
    5: {
      answer: 'LOZT',
      clue: 'Acclaimed 2004 drama involving survivors of Oceanic Flight 815',
      row: 4,
      col: 0,
    },
    3: {
      answer: 'GRIFF',
      clue: 'Half lion, half eagle, all plumber',
      row: 2,
      col: 3,
    },
    7: {
      answer: 'TPEB',
      row: 6,
      col: 5,
      clue: 'Cousin of renowned bass drumming battery merchant',
    },
    9: {
      clue: 'Synonym for expert, skilled.',
      answer: 'ADEPT',
      row: 7,
      col: 1,
    },
    8: {
      clue: "It's not my turn its _____",
      answer: 'YORGO',
      row: 9,
      col: 0,
    },
  },
  down: {
    1: {
      clue: 'Legendary swordsman with a tendency to go berserk.',
      answer: 'ZODD',
      row: 4,
      col: 2,
    },
    2: {
      clue: 'Weapon of choice on halloween night',
      answer: 'EGG',
      row: 0,
      col: 3,
    },
    4: { clue: 'Short for large matthias', answer: 'BIGMATT', col: 5, row: 1 },
    6: { clue: 'Nautical technican', answer: 'CTEC', col: 7, row: 4 },
    10: {
      clue: 'Recovering honey addict turned horror movie star',
      answer: 'POOH',
      row: 7,
      col: 4,
    },
  },
};
const notify = () => toast('Copied to your clipboard.');

let now = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const Stopwatch = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => console.log('Finish')}
    render={({ formatted, hours, minutes, seconds }) => {
      return <div id="time">{formatted}</div>;
    }}
  />
);
function App() {
  const [isWin, setIsWin] = React.useState(false);
  return (
    <>
      <div className="container">
        <Toaster />

        <div style={{ marginTop: '40px', display: 'flex' }}>
          <h1 className="bevan-regular">The Mini Crossword</h1>
          <p
            className="libre-franklin"
            style={{ marginTop: '7px', fontSize: '25px', paddingLeft: '10px' }}
          >
            {now}
          </p>
        </div>
        <p style={{ marginTop: '-20px' }} className="libre-franklin">
          by studyofwumbo
        </p>
        <div
          className="d-flex justify-content-center border-top border-bottom"
          style={{ marginBottom: '10px' }}
        >
          <div id="stopwatch">
            <Stopwatch />
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <Toaster position="top-center" reverseOrder={false} />
          {isWin ? (
            <div className="card justify-content-center">
              <div className="card-header">Congrats!</div>
              <div className="card-body">
                <h5 className="card-title">
                  You finished the crossword in{' '}
                  {document.getElementById('time').innerHTML}
                </h5>
                <p className="card-text">Click share to copy to clipboard</p>
                <a
                  className="btn btn-success"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `I completed the RVA Melee crossword in ${
                        document.getElementById('time').innerHTML
                      }.`
                    );
                    notify();
                  }}
                >
                  Share
                </a>
                &nbsp;
                <a
                  href="https://imgur.com/a/wSk8cdY"
                  className="btn btn-primary"
                >
                  See full graphic
                </a>
              </div>
            </div>
          ) : (
            <Crossword
              data={data}
              onCrosswordComplete={() => {
                setIsWin(true);
                document.getElementById('stopwatch').style.visibility =
                  'hidden';
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
