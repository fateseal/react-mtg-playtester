import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import * as zoneTypes from '../constants/zoneTypes';
import { CARD_MODAL } from '../constants/modalTypes';
import { CARD } from '../constants/itemTypes';
import {
  toggleTap,
  moveCard,
  setCardModalId,
  openModal
} from '../actions/playtesterActions';

import CardShortcuts from './CardShortcuts';

const CardStats = ({ counters, power, toughness }) => (
  <div className="rmp--card-stats">
    <span>{counters > 0 ? <span>{counters}c</span> : null}</span>
    {power > 0 || toughness > 0 ? (
      <span>
        {power}/{toughness}
      </span>
    ) : null}
  </div>
);

class Card extends Component {
  componentDidMount() {
    this.focusableElem = this._card.querySelector('[tabindex]');
  }

  handleClick = e => {
    const { zone, id, toggleTap, moveCard } = this.props;

    if (zone === zoneTypes.BATTLEFIELD) {
      return toggleTap(id);
    }

    if (zone === zoneTypes.LIBRARY) {
      return moveCard({
        id,
        fromZone: zone,
        toZone: zoneTypes.HAND
      });
    }

    if (zone === zoneTypes.HAND) {
      return moveCard({
        id,
        fromZone: zone,
        toZone: zoneTypes.BATTLEFIELD
      });
    }
  };

  handleMouseOut = e => {
    this.focusableElem.blur();
  };

  handleMouseOver = e => {
    this.focusableElem.focus();
  };

  openModal = () => {
    const { id, setCardModalId, openModal } = this.props;
    setCardModalId(id);
    openModal(CARD_MODAL);
  };

  handleContextMenu = e => {
    e.preventDefault();
    this.openModal();
  };

  renderCardImage() {
    const { imageUrl, name, zone, cardBackUrl } = this.props;

    const src = zone === zoneTypes.LIBRARY ? cardBackUrl : imageUrl;

    return <img src={src} alt={name} className="rmp--card-img" />;
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      id,
      isTapped,
      index,
      zone,
      left,
      top,
      power,
      toughness,
      counters,
      offset,
      style
    } = this.props;

    const isBattlefield = zone === zoneTypes.BATTLEFIELD;
    const isHand = zone === zoneTypes.HAND;

    const sourceStyles = {
      ...style,
      marginLeft: isHand && index > 0 ? -offset : undefined,
      display: 'inline-block',
      maxWidth: 112,
      position: isHand ? 'relative' : 'absolute',
      left: isBattlefield ? left : undefined,
      top: isBattlefield ? top : undefined,
      zIndex: isBattlefield || isHand ? index : 1000 - index,
      opacity: isDragging ? 0.5 : 1,
      transform: isBattlefield && isTapped ? 'rotate(90deg)' : 'none',
      transition: 'transform .2s'
    };

    return connectDragSource(
      <li
        ref={c => (this._card = c)}
        onContextMenu={this.handleContextMenu}
        style={sourceStyles}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        className="rmp--card"
      >
        <CardShortcuts id={id} zone={zone}>
          {this.renderCardImage()}
        </CardShortcuts>
        {isBattlefield && (
          <CardStats power={power} toughness={toughness} counters={counters} />
        )}
      </li>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  zone: PropTypes.oneOf(zoneTypes.zoneNames).isRequired
};

const actions = {
  toggleTap,
  moveCard,
  setCardModalId,
  openModal
};

const withConnect = connect(null, actions);

const cardSource = {
  beginDrag(props) {
    const { id, zone, left, top } = props;
    return { id, zone, left, top };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const withDragSource = DragSource(CARD, cardSource, collect);

export default withConnect(withDragSource(Card));
