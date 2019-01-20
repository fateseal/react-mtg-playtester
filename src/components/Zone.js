import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classnames from 'classnames';

import { CARD } from '../constants/itemTypes';
import * as zoneTypes from '../constants/zoneTypes';
import { moveCard } from '../actions/playtesterActions';
import { getCardsByZone } from '../reducers/playtester';

import Card from './Card';

const styles = {
  droptarget: {
    border: '1px dashed #666',
    borderRadius: 4,
    height: '100%',
    padding: 4,
    position: 'relative',
    whiteSpace: 'nowrap'
    // overflow: 'auto'
  }
};

class Zone extends Component {
  state = {
    containerWidth: 0
  };

  componentDidMount() {
    const containerWidth = this._dropzone.offsetWidth;

    this.setState({
      containerWidth
    });
  }

  render() {
    const {
      name,
      cards,
      isOver,
      connectDropTarget,
      cardBackUrl,
      cardWidth = 112
    } = this.props;

    const { isCardTextView, containerWidth } = this.state;

    const totalCards = cards.length;

    const totalCardsWidth = (totalCards + 1) * cardWidth;

    const offset =
      totalCardsWidth > containerWidth
        ? Math.floor(totalCardsWidth - containerWidth) / totalCards
        : 0;

    return (
      <section className="rmp--zone">
        <header className="rmp--zone-header">
          <h2 className="rmp--zone-title">
            {name.toLowerCase()} ({cards.length})
          </h2>
        </header>
        {connectDropTarget(
          <ul
            className={classnames('rmp--zone-box', {
              'is-dropping': isOver,
              'rmp--zone-box--text-view': isCardTextView
            })}
            ref={c => (this._dropzone = c)}
          >
            {cards.map((card, i) => (
              <Card
                key={card.id}
                id={card.id}
                left={card.left}
                top={card.top}
                offset={offset}
                index={i}
                toughness={card.toughness}
                power={card.power}
                counters={card.counters}
                zone={name}
                isTapped={card.isTapped}
                imageUrl={card.imageUrl}
                cardBackUrl={cardBackUrl}
                name={card.name}
              />
            ))}
          </ul>
        )}
      </section>
    );
  }
}

Zone.propTypes = {
  name: PropTypes.oneOf(zoneTypes.zoneNames).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      card_id: PropTypes.object,
      zone: PropTypes.oneOf(zoneTypes.zoneNames)
    })
  ).isRequired
};

Zone.defaultProps = {
  cards: []
};

const select = (state, props) => ({
  cards: getCardsByZone(state, props.name),
  ...props
});

const actions = {
  moveCard
};

const withConnect = connect(select, actions);

const zoneTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();

    const clientOffset = monitor.getSourceClientOffset();

    let left = Math.round(clientOffset.x);
    let top = Math.round(clientOffset.y);

    // offsets the top position because getSourceClientOffset is based on cursor to window
    const droptargetTop = component._dropzone.getBoundingClientRect().top;
    top = top - droptargetTop;

    props.moveCard({
      id: item.id,
      fromZone: item.zone,
      toZone: props.name,
      left: left,
      top: top
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
const withDropTarget = DropTarget(CARD, zoneTarget, collect);

export default withConnect(withDropTarget(Zone));
