import React from 'react';
import FlipMove from 'react-flip-move';
import './styles.scss';

export interface IKitty {
  id: string;
  imageUrl: string,
  votes: number
}

export interface IProps {
  kittys: IKitty[];
  onKittyClick: (id: string ) => void
}

// as this component does not have state or actions it can be written as a pure function
const CatGrid: React.SFC<IProps> = (props) => {
  const { kittys, onKittyClick } = props;

  if (!kittys.length) {
    return <div>
      Oh noes we have no kittys....wait for a bit.
    </div>;
  }

  const kittyNodes = () => {
    return kittys.map((kitty, index) => {
      return <div
          className={`kitty num${index}`}
          key={kitty.id}
          onClick={() => onKittyClick(kitty.id)}
        >
          <img src={kitty.imageUrl} alt="cat" />
          <h3 className="score">{kitty.votes}</h3>
        </div>
    });
  };

  return (
    <FlipMove
      easing="cubic-bezier(0.25, 0.1, 0.25, 1.0)"
      staggerDelayBy={150}
      staggerDurationBy={25}
      enterAnimation="fade"
      leaveAnimation="fade"
      className="catGrid"
      duration={300}
    >
      {kittyNodes()}
    </FlipMove>
  );
};

export default CatGrid;
